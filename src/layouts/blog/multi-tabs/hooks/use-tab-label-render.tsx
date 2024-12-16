// import { useMemo } from "react"; // 从 React 中导入 useMemo，用于性能优化
// import { USER_LIST } from "@/_mock/assets"; // 导入用户列表，用于查找用户信息
import type { KeepAliveTab } from "../types"; // 导入类型定义，方便后续类型检查

/**
 * 自定义 Hook，用于动态渲染标签文本
 */
export function useTabLabelRender() {
	/**
	 * 特殊标签渲染逻辑映射表
	 *
	 * @description 通过 `useMemo` 缓存特殊渲染逻辑，避免每次渲染时重新生成，提高性能。
	 * 键：标签的唯一标识（`tab.label`）
	 * 值：一个函数，接收 `tab` 对象，返回渲染后的标签内容
	 */
	// const specialTabRenderMap = useMemo<
	// 	Record<string, (tab: KeepAliveTab) => React.ReactNode> // 定义映射表的类型
	// >(
	// 	() => ({
	// 		// 针对特定的标签 "sys.menu.system.user_detail" 定义渲染逻辑
	// 		"sys.menu.system.user_detail": (tab: KeepAliveTab) => {
	// 			const userId = tab.params?.id; // 从 tab 参数中提取用户 ID
	// 			const defaultLabel = t(tab.label); // 获取标签的默认翻译
	// 			if (userId) {
	// 				// 如果有用户 ID，从用户列表中查找对应用户
	// 				const user = USER_LIST.find((item) => item.id === userId);
	// 				// 返回格式化后的标签文本：用户名 + 默认标签
	// 				return `${user?.username}-${defaultLabel}`;
	// 			}
	// 			// 如果没有用户 ID，直接返回默认标签
	// 			return defaultLabel;
	// 		},
	// 	}),
	// 	[], // 依赖项为空，映射表只会初始化一次
	// );

	/**
	 * 渲染标签文本
	 *
	 * @param tab - 当前的标签对象
	 * @returns 渲染后的标签文本
	 */
	const renderTabLabel = (tab: KeepAliveTab) => {
		// 根据 tab.label 获取是否存在特殊渲染逻辑
		// const specialRender = specialTabRenderMap[tab.label];
		// if (specialRender) {
		// 	// 如果有特殊渲染逻辑，则调用该函数
		// 	return specialRender(tab);
		// }
		// 如果没有特殊逻辑，则直接返回标签的 label 属性
		return tab.label;
	};

	// 返回标签渲染函数，供外部组件调用
	return renderTabLabel;
}
