import { IconButton, SvgIcon } from "@/components/icon";
import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";
import { Drawer } from "antd";
import Color from "color";
import { type CSSProperties, useState } from "react";
import { NavLink } from "react-router";

import BreadCrumb from "./bread-crumb";
import SearchBar from "./search-bar";
import Setting from "./setting";

import { tailwindClassMerger } from "@/utils";

import { ThemeLayout } from "#/enum";

import dashboardConfig from "../config";
import NavVertical from "../nav/nav-vertical";

import Github from "@/components/github";
type Props = {
	/**
	 *  自定义类名
	 */
	className?: string;
	/**
	 *  是否有顶部偏移，用于调整头部高度
	 */
	offsetTop?: boolean;
};

/**
 * Header 组件
 * @param  props - 组件的属性
 * @returns  Header 组件
 */
export default function Header({ offsetTop = false }: Props) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	// 获取主题设置和布局配置
	const { themeLayout, breadCrumb } = useSettings();

	const { colorBgElevated, colorBorder } = useThemeToken();

	/**
	 * Header 样式
	 * @type {CSSProperties}
	 */
	const headerStyle: CSSProperties = {
		borderBottom:
			themeLayout === ThemeLayout.Horizontal
				? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
				: "",
		backgroundColor: Color(colorBgElevated).alpha(1).toString(),
		width: "100%",
	};

	return (
		<>
			{/* Header 主体 */}
			<header
				className={tailwindClassMerger(
					themeLayout === ThemeLayout.Horizontal
						? "relative"
						: "sticky top-0 right-0 left-auto",
				)}
				style={headerStyle}
			>
				<div
					className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
					style={{
						height: offsetTop
							? dashboardConfig.OFFSET_HEADER_HEIGHT
							: dashboardConfig.HEADER_HEIGHT,
						transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
					}}
				>
					<div className="flex items-center">
						{themeLayout !== ThemeLayout.Horizontal ? (
							<IconButton
								onClick={() => setDrawerOpen(true)}
								className="h-10 w-10 md:hidden"
							>
								<SvgIcon icon="common-menu" size="24" />
							</IconButton>
						) : (
							<NavLink to="/" className="flex items-center">
								<SvgIcon icon="common-logo" size={60} />
							</NavLink>
						)}

						{/* 面包屑导航 */}
						<div className="ml-4 hidden md:block">
							{breadCrumb ? <BreadCrumb /> : null}
						</div>
					</div>

					{/* 功能按钮区域 */}
					<div className="flex gap-4">
						<SearchBar />

						<Github />

						<Setting />
					</div>
				</div>
			</header>

			{/* 侧边栏 Drawer */}
			<Drawer
				placement="left"
				onClose={() => setDrawerOpen(false)}
				open={drawerOpen}
				closeIcon={false}
				styles={{
					header: {
						display: "none",
					},
					body: {
						padding: 0,
						overflow: "hidden",
					},
				}}
				width="auto"
			>
				<NavVertical closeSideBarDrawer={() => setDrawerOpen(false)} />
			</Drawer>
		</>
	);
}
