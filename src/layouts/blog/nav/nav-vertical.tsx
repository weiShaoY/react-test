import { Layout, Menu, type MenuProps } from "antd";
import Color from "color";
import { useEffect, useMemo, useState } from "react";
import { useMatches, useNavigate } from "react-router";
// import styled from "styled-components";

import Scrollbar from "@/components/scrollbar";
import {
	useBlogRoutes,
	useFlattenedRoutes,
	usePathname,
	useRouteToMenuFn,
} from "@/router/hooks/blog";
import { menuFilter } from "@/router/utils";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";

import dashboardConfig from "../config";

import NavLogo from "./nav-logo";

import { ThemeLayout, ThemeMode } from "#/enum";

const { Sider } = Layout;

type Props = {
	/**
	 *  关闭侧边栏的回调
	 */
	closeSideBarDrawer?: () => void;
};

/**
 * 垂直导航栏组件
 */
export default function NavVertical(props: Props) {
	/**
	 *  用于页面跳转
	 */
	const navigate = useNavigate();

	/**
	 *  获取匹配的路由列表
	 */
	const matches = useMatches();

	/**
	 *  当前路径
	 */
	const pathname = usePathname();

	// 获取主题的颜色配置
	const { colorBorder } = useThemeToken();

	const settings = useSettings();

	const { themeLayout, themeMode, darkSidebar } = settings;

	const { setSettings } = useSettingActions();

	const routeToMenuFn = useRouteToMenuFn();

	const permissionRoutes = useBlogRoutes();

	const flattenedRoutes = useFlattenedRoutes();

	/**
	 *  判断是否折叠
	 */
	const collapsed = useMemo(
		() => themeLayout === ThemeLayout.Mini,
		[themeLayout],
	);

	/**
	 *  生成菜单列表
	 */
	const menuList = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		return routeToMenuFn(menuRoutes);
	}, [routeToMenuFn, permissionRoutes]);

	/**
	 *  当前选中的菜单项
	 */
	const selectedKeys = useMemo(() => [pathname], [pathname]);

	/**
	 *  控制展开的菜单项
	 */
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	// 首次加载时根据匹配的路由设置 openKeys
	useEffect(() => {
		if (!collapsed) {
			const keys = matches
				.filter(
					(match) => match.pathname !== "/" && match.pathname !== pathname,
				)
				.map((match) => match.pathname);
			setOpenKeys(keys);
		}
	}, [collapsed, matches, pathname]);

	/**
	 *  处理折叠和展开的切换
	 */
	const handleToggleCollapsed = () => {
		setSettings({
			...settings,
			themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
		});
	};

	/**
	 * 菜单点击事件处理函数
	 * - 对于外部链接，直接在新窗口打开
	 * - 否则使用 navigate 进行页面内部跳转
	 */
	const onClick: MenuProps["onClick"] = ({ key }) => {
		const nextLink = flattenedRoutes?.find((e) => e.key === key);
		if (nextLink?.hideTab && nextLink?.frameSrc) {
			window.open(nextLink?.frameSrc, "_blank");
			return;
		}

		navigate(key);

		// 关闭侧边栏（移动端使用）
		props?.closeSideBarDrawer?.();
	};

	/**
	 * 处理菜单的展开和关闭事件
	 * - 当菜单处于折叠状态时，不处理打开状态
	 */
	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		// if (collapsed) return;
		setOpenKeys(keys);
	};

	/**
	 *  根据主题模式和侧边栏配置确定侧边栏的主题
	 */
	const sidebarTheme = useMemo(() => {
		if (themeMode === ThemeMode.Dark) {
			return darkSidebar ? "light" : "dark";
		}
		return darkSidebar ? "dark" : "light";
	}, [themeMode, darkSidebar]);

	return (
		<Sider
			trigger={null} // 不显示默认的触发器（折叠图标）
			collapsible // 可折叠
			collapsed={collapsed} // 当前是否折叠状态
			width={dashboardConfig.NAV_WIDTH} // 侧边栏的宽度配置
			theme={sidebarTheme} // 侧边栏主题
			className="!fixed left-0 top-0 h-screen z-50"
			style={{
				borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`, // 使用 Color 库动态计算颜色的透明度
			}}
		>
			{/* 导航栏 Logo 区域 */}
			<NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />

			{/* 滚动条包裹区域，包含菜单 */}
			<Scrollbar>
				<Menu
					mode="inline" // 设置菜单为内联模式
					items={menuList} // 菜单项
					theme={sidebarTheme} // 菜单主题
					selectedKeys={selectedKeys} // 当前选中的菜单项
					{...(!collapsed && { openKeys })} // 非折叠状态下设置 openKeys
					onOpenChange={handleOpenChange} // 处理菜单展开事件
					className="!border-none" // 自定义样式
					onClick={onClick} // 点击事件处理
				/>
			</Scrollbar>
		</Sider>
	);
}
