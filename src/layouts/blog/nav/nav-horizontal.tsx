import { Menu, type MenuProps } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router";

import {
	useBlogRoutes,
	useFlattenedRoutes,
	usePathname,
	useRouteToMenuFn,
} from "@/router/hooks/blog";
import { menuFilter } from "@/router/utils";
import { useThemeToken } from "@/theme/hooks";

import dashboardConfig from "../config";

/**
 * 水平导航栏组件
 */
export default function NavHorizontal() {
	/**
	 *  使用 React Router 的导航钩子，用于页面跳转
	 */
	const navigate = useNavigate();

	/**
	 *  获取当前路径名
	 */
	const pathname = usePathname();

	/**
	 *  从主题中获取颜色配置
	 */
	const { colorBgElevated } = useThemeToken();

	/**
	 *  获取将路由转换为菜单项的函数
	 */
	const routeToMenuFn = useRouteToMenuFn();

	/**
	 *  获取具有权限过滤后的路由列表
	 */
	const permissionRoutes = useBlogRoutes();

	/**
	 *  获取扁平化的路由列表
	 */
	const flattenedRoutes = useFlattenedRoutes();

	/**
	 * 使用 useMemo 缓存计算后的菜单列表
	 * - 首先对权限路由列表进行过滤，生成菜单路由
	 * - 然后通过 routeToMenuFn 转换为菜单项
	 */
	const menuList = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		return routeToMenuFn(menuRoutes);
	}, [routeToMenuFn, permissionRoutes]);

	/**
	 * 计算当前选中的菜单项
	 * - 由于水平导航栏只需要根据当前路径选中一个菜单项，所以使用 useMemo 将 pathname 缓存为 selectedKeys 数组
	 */
	const selectedKeys = useMemo(() => [pathname], [pathname]);

	/**
	 * 菜单点击事件处理函数
	 * - 如果点击的菜单项为外部链接，则在新标签页中打开
	 * - 否则，使用 navigate 进行页面内部跳转
	 */
	const onClick: MenuProps["onClick"] = ({ key }) => {
		/**
		 *  获取点击的菜单项
		 */
		const nextLink = flattenedRoutes?.find((el) => el.key === key);

		// 如果菜单项是隐藏的标签页且包含外部链接，则在新窗口打开
		if (nextLink?.hideTab && nextLink?.frameSrc) {
			window.open(nextLink?.frameSrc, "_blank");

			return;
		}
		// 否则使用内部跳转
		navigate(key);
	};

	return (
		<div
			className="w-screen"
			style={{
				height: dashboardConfig.NAV_HORIZONTAL_HEIGHT, // 水平导航栏的高度配置
			}}
		>
			<Menu
				mode="horizontal" // 设置菜单为水平模式
				items={menuList} // 菜单项列表
				defaultOpenKeys={[]} // 默认展开的菜单项（水平菜单无需展开）
				selectedKeys={selectedKeys} // 当前选中的菜单项
				onClick={onClick} // 点击事件处理函数
				className="!z-10 !border-none" // 自定义样式
				style={{
					background: colorBgElevated,
				}} // 背景颜色
			/>
		</div>
	);
}
