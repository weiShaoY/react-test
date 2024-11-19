import { Drawer } from "antd";
import Color from "color";
import { type CSSProperties, useState } from "react";

import { IconButton, Iconify, SvgIcon } from "@/components/icon";
import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { useResponsive, useThemeToken } from "@/theme/hooks";

import BreadCrumb from "../_common/bread-crumb";
import SearchBar from "../_common/search-bar";
import SettingButton from "../_common/setting-button";

import dashboardConfig from "./config";
import NavVertical from "./nav/nav-vertical";

import { ThemeLayout } from "#/enum";

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
export default function Header({ className = "", offsetTop = false }: Props) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	// 获取主题设置和布局配置
	const { themeLayout, breadCrumb } = useSettings();

	const { colorBgElevated, colorBorder } = useThemeToken();

	const { screenMap } = useResponsive();

	/**
	 * Header 样式
	 * @type {CSSProperties}
	 */
	const headerStyle: CSSProperties = {
		position: themeLayout === ThemeLayout.Horizontal ? "relative" : "fixed",
		borderBottom:
			themeLayout === ThemeLayout.Horizontal
				? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
				: "",
		backgroundColor: Color(colorBgElevated).alpha(1).toString(),
	};

	// 设置不同布局下的宽度
	if (themeLayout === ThemeLayout.Horizontal) {
		headerStyle.width = "100vw";
	} else if (screenMap.md) {
		headerStyle.right = "0px";
		headerStyle.left = "auto";
		headerStyle.width = `calc(100% - ${
			themeLayout === ThemeLayout.Vertical
				? dashboardConfig.NAV_WIDTH
				: dashboardConfig.NAV_COLLAPSED_WIDTH
		}px)`;
	} else {
		headerStyle.width = "100vw";
	}

	return (
		<>
			{/* Header 主体 */}
			<header className={`z-20 w-full ${className}`} style={headerStyle}>
				<div
					className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
					style={{
						height: offsetTop
							? dashboardConfig.OFFSET_HEADER_HEIGHT
							: dashboardConfig.HEADER_HEIGHT,
						transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
					}}
				>
					<div className="flex items-baseline">
						{/* Logo 或菜单按钮 */}
						{themeLayout !== ThemeLayout.Horizontal ? (
							<IconButton
								onClick={() => setDrawerOpen(true)}
								className="h-10 w-10 md:hidden"
							>
								<SvgIcon icon="ic-menu" size="24" />
							</IconButton>
						) : (
							<Logo />
						)}
						{/* 面包屑导航 */}
						<div className="ml-4 hidden md:block">
							{breadCrumb ? <BreadCrumb /> : null}
						</div>
					</div>

					{/* 功能按钮区域 */}
					<div className="flex">
						<SearchBar />


						<IconButton
							onClick={() =>
								window.open("https://github.com/d3george/slash-admin")
							}
						>
							<Iconify icon="mdi:github" size={24} />
						</IconButton>

						<IconButton
							onClick={() => window.open("https://discord.gg/fXemAXVNDa")}
						>
							<Iconify icon="carbon:logo-discord" size={24} />
						</IconButton>

						<SettingButton />
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
