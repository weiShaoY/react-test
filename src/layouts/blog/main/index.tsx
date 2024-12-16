import { Content } from "antd/es/layout/layout";

import { type CSSProperties, forwardRef } from "react";

import { Outlet } from "react-router";

import { useSettings } from "@/store/settingStore";

import { tailwindClassMerger } from "@/utils";

import dashboardConfig from "../config";

import MultiTabs from "../multi-tabs";

import { MultiTabsProvider } from "../multi-tabs/providers/multi-tabs-provider";

import { useThemeToken } from "@/theme/hooks";

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

	/**
	 * 主内容区域样式
	 * @type {CSSProperties}
	 */
	const mainStyle: CSSProperties = {
		paddingTop: multiTab ? dashboardConfig.MULTI_TABS_HEIGHT : 0,
		background: colorBgElevated,
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		width: "100%",
	};

	return (
		<Content style={mainStyle} className="flex">
			<div className="flex-grow overflow-auto size-full" ref={ref}>
				<div
					className={tailwindClassMerger(
						"m-auto size-full flex-grow sm:p-2",
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
			</div>
		</Content>
	);
});

export default Main;
