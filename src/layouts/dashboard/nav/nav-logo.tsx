import { SvgIcon } from "@/components/icon";

import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";
import { cn } from "@/utils";

import dashboardConfig from "../config";

import { ThemeLayout } from "#/enum";

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
	const { themeLayout } = useSettings();

	// 获取主题相关的颜色
	// const {
	// 	colorPrimary,
	// 	colorTextSecondary,
	// 	colorBgContainer,
	// 	colorBorderSecondary,
	// } = useThemeToken();
	const { colorPrimary, colorBgContainer } = useThemeToken();

	return (
		<div
			style={{
				height: `${dashboardConfig.HEADER_HEIGHT}px`, // 动态设置高度
			}}
			className="relative flex items-center justify-center py-4"
		>
			{/* Logo 区域 */}
			<div className="flex items-center">
				<Logo />

				{/* 当布局模式不是 Mini 时显示项目名称 */}
				{themeLayout !== ThemeLayout.Mini && (
					<span
						className="ml-2 text-xl font-bold"
						style={{ color: colorPrimary }}
					>
						weiShaoY
					</span>
				)}
			</div>

			{/* 折叠/展开按钮 */}
			<div
				onClick={onToggle} // 点击切换折叠状态
				className={cn(
					"absolute right-0 top-14 z-50 hidden h-8 w-8 translate-x-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex",
				)}
				style={{
					fontSize: 28,
					// border: `1px solid ${colorBorderSecondary}`, // 使用主题中的边框颜色
					backgroundColor: colorBgContainer, // 使用主题中的背景颜色
				}}
			>
				{/* 根据折叠状态显示不同的图标 */}
				{collapsed ? (
					// <RightOutlined style={{ fontSize: 12, color: colorTextSecondary }} />
					<SvgIcon icon="ic-nav-collapsed" size="40" />
				) : (
					// <LeftOutlined style={{ fontSize: 12, color: colorTextSecondary }} />
					<SvgIcon icon="ic-nav-expand" size="40" />
				)}
			</div>
		</div>
	);
}
