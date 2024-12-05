import { SvgIcon } from "@/components/icon";

import { NavLink } from "react-router-dom";

import { useSettings } from "@/store/settingStore";

import { tailwindClassMerger } from "@/utils";

import dashboardConfig from "../config";

import { ThemeLayout } from "#/enum";

// import { useThemeToken } from "@/theme/hooks";

type Props = {
	/**
	 * 是否折叠状态
	 */
	collapsed: boolean;

	/**
	 *  切换折叠状态的回调函数
	 */
	onToggle: () => void;
};

/**
 * 导航栏 Logo 组件
 */
export default function NavLogo({ collapsed, onToggle }: Props) {
	// 获取当前的布局模式
	const { themeLayout, darkSidebar } = useSettings();

	// 获取主题相关的颜色;
	// const { colorBgContainer, colorBorderSecondary } = useThemeToken();

	return (
		<div
			style={{
				height: `${dashboardConfig.HEADER_HEIGHT}px`, // 动态设置高度
			}}
			className="relative flex items-center justify-center py-4"
		>
			{/* Logo 区域 */}
			<NavLink to="/" className="flex items-center bg-red">
				<SvgIcon icon="common-logo" size={60} />
				{themeLayout !== ThemeLayout.Mini && (
					<SvgIcon
						icon="common-weiShaoY"
						size="120"
						color={darkSidebar ? "#ffffff" : "#191919"}
					/>
				)}
			</NavLink>

			{/* 折叠/展开按钮 */}
			{/* <div
				onClick={onToggle}
				className={tailwindClassMerger(
					"absolute right-0 top-14 z-50 hidden h-8 w-8 translate-x-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex",
				)}
				style={{
					border: `1px solid ${colorBorderSecondary}`,
					backgroundColor: colorBgContainer,
				}}
			>
				{collapsed ? (
					<SvgIcon icon="arrow-left" size="20" />
				) : (
					<SvgIcon icon="arrow-right" size="20" />
				)}
			</div> */}

			<button
				onClick={onToggle}
				className={tailwindClassMerger(
					"absolute right-0 top-14 z-50 hidden h-8 w-8 translate-x-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex  border border-[#F0F0F0]",
				)}
				type="button"
			>
				{collapsed ? (
					<SvgIcon icon="arrow-left" size="20" />
				) : (
					<SvgIcon icon="arrow-right" size="20" />
				)}{" "}
			</button>
		</div>
	);
}
