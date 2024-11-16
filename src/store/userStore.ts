import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import userService, { type SignInReq } from "@/api/services/userService";

import type { UserInfo, UserToken } from "#/entity";
import { StorageEnum } from "#/enum";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
	userInfo: Partial<UserInfo>; // 用户信息（部分字段）
	userToken: UserToken; // 用户令牌，包括 accessToken 和 refreshToken
	actions: {
		setUserInfo: (userInfo: UserInfo) => void; // 设置用户信息
		setUserToken: (token: UserToken) => void; // 设置用户令牌
		clearUserInfoAndToken: () => void; // 清空用户信息和令牌
	};
};

// 创建 zustand store，并使用 persist 中间件持久化存储
const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			userInfo: {}, // 用户信息初始为空对象
			userToken: {}, // 用户令牌初始为空对象
			actions: {
				// 设置用户信息
				setUserInfo: (userInfo) => {
					set({ userInfo });
				},
				// 设置用户令牌
				setUserToken: (userToken) => {
					set({ userToken });
				},
				// 清空用户信息和令牌
				clearUserInfoAndToken() {
					set({ userInfo: {}, userToken: {} });
				},
			},
		}),
		{
			name: "userStore", // 存储名称，必须唯一
			storage: createJSONStorage(() => localStorage), // 使用 localStorage 存储
			partialize: (state) => ({
				[StorageEnum.UserInfo]: state.userInfo,
				[StorageEnum.UserToken]: state.userToken,
			}),
		},
	),
);

// 导出 hooks 供外部组件使用
export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () =>
	useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

/**
 * 自定义登录 hook，处理用户登录逻辑
 */
export const useSignIn = () => {
	const navigate = useNavigate(); // 用于页面跳转
	const { message } = App.useApp(); // Ant Design 的消息提示
	const { setUserToken, setUserInfo } = useUserActions(); // 获取操作函数

	// 使用 react-query 的 useMutation 进行异步请求
	const signInMutation = useMutation({
		mutationFn: userService.signin, // 登录请求的函数
	});

	/**
	 * 登录函数
	 * @param {SignInReq} data - 登录请求参数
	 */
	const signIn = async (data: SignInReq) => {
		try {
			// 调用 mutateAsync 执行登录请求
			const res = await signInMutation.mutateAsync(data);
			const { user, accessToken, refreshToken } = res;
			// 存储用户令牌和信息
			setUserToken({ accessToken, refreshToken });
			setUserInfo(user);
			// 跳转到首页
			navigate(HOMEPAGE, { replace: true });
		} catch (err) {
			// 登录失败时显示警告信息
			message.warning({
				content: err.message,
				duration: 3,
			});
		}
	};

	return signIn;
};

export default useUserStore;
