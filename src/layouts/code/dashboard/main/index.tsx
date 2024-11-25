import { Content } from "antd/es/layout/layout";
import { type CSSProperties, forwardRef } from "react";
import { Outlet } from "react-router-dom";

import { useSettings } from "@/store/settingStore";
import { useResponsive, useThemeToken } from "@/theme/hooks";
import { tailwindClassMerger } from "@/utils";

import dashboardConfig from "../config";
import MultiTabs from "../multi-tabs";
import { MultiTabsProvider } from "../multi-tabs/multi-tabs-provider";

import { ThemeLayout } from "#/enum";

type Props = {
	/**
	 *  是否有顶部偏移，用于调整主内容区域的 paddingTop
	 */
	offsetTop?: boolean;
};

/**
 * Main 组件，负责渲染主要内容区域
 * @param {Props} props - 组件的属性
 * @param {boolean} [props.offsetTop=false] - 是否有顶部偏移
 * @param {React.Ref<HTMLDivElement>} ref - 转发的 ref
 * @returns {JSX.Element} - 渲染主内容区域的 JSX 元素
 */
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
	const { themeStretch, themeLayout, multiTab } = useSettings();
	const { colorBgElevated } = useThemeToken();
	const { screenMap } = useResponsive();

	/**
	 * 主内容区域样式
	 * @type {CSSProperties}
	 */
	const mainStyle: CSSProperties = {
		paddingTop:
			dashboardConfig.HEADER_HEIGHT +
			(multiTab ? dashboardConfig.MULTI_TABS_HEIGHT : 0),
		background: colorBgElevated,
		transition: "padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		width: "100%",
	};

	// 根据不同的布局模式调整样式
	if (themeLayout === ThemeLayout.Horizontal) {
		mainStyle.width = "100vw";
		mainStyle.paddingTop = multiTab ? dashboardConfig.MULTI_TABS_HEIGHT : 0;
	} else if (screenMap.md) {
		mainStyle.width = `calc(100% - ${
			themeLayout === ThemeLayout.Vertical
				? dashboardConfig.NAV_WIDTH
				: dashboardConfig.NAV_COLLAPSED_WIDTH
		})`;
	} else {
		mainStyle.width = "100vw";
	}

	return (
		<Content ref={ref} style={mainStyle} className="flex overflow-auto">
			<div
				className={tailwindClassMerger(
					"m-auto h-full w-full flex-grow sm:p-2",
					themeStretch ? "" : "xl:max-w-screen-xl",
					themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row",
				)}
			>
				{multiTab ? (
					<MultiTabsProvider>
						<MultiTabs offsetTop={offsetTop} />
					</MultiTabsProvider>
				) : (
					<Outlet />
				)}
			</div>
		</Content>
	);
});

export default Main;
