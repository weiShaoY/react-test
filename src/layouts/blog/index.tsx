import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
} from "react";

import { Layout } from "antd";

import { useScroll } from "framer-motion";

import styled from "styled-components";

import { CircleLoading } from "@/components/loading";

import ProgressBar from "@/components/progress-bar";

import { useSettings } from "@/store/settingStore";

import Header from "./header";

import Main from "./main";

import Nav from "./nav";

import { ThemeLayout, ThemeMode } from "#/enum";

import { App as AntdApp } from "antd";

import AntdConfig from "@/theme/antd";

import { useResponsive } from "@/theme/hooks";

import { dashboardConfig } from "./config";

import { tailwindClassMerger } from "@/utils";

/**
 * Blog 模块 DashboardLayout 组件，用于构建包含导航栏、页头和主内容区域的布局
 */
export function BlogLayout() {
	// 从全局设置中获取当前的布局方式和主题模式
	const { themeLayout, themeMode } = useSettings();

	const { screenMap } = useResponsive();

	/**
	 *  mainEl 引用，用于获取主内容区域的 DOM 元素
	 */
	const mainEl = useRef<HTMLDivElement>(null);

	/**
	 *  获取滚动位置
	 */
	const { scrollY } = useScroll({ container: mainEl });

	/**
	 * 记录内容是否被滚动
	 */
	const [offsetTop, setOffsetTop] = useState(false);

	/**
	 * 当滚动位置发生变化时，更新 offsetTop 状态
	 */
	const onOffSetTop = useCallback(() => {
		scrollY.on("change", (scrollHeight) => {
			setOffsetTop(scrollHeight > 0);
		});
	}, [scrollY]);

	// 使用 useEffect 监听滚动事件
	useEffect(() => {
		onOffSetTop();
	}, [onOffSetTop]);

	/**
	 * 使用 useMemo 缓存布局的 className，避免每次渲染时重新计算
	 */
	const layoutClassName = useMemo(() => {
		return tailwindClassMerger(
			"flex h-screen overflow-hidden",
			themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row",
		);
	}, [themeLayout]);

	const secondLayoutStyle: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		paddingLeft: screenMap.md
			? themeLayout === ThemeLayout.Horizontal
				? 0
				: themeLayout === ThemeLayout.Mini
					? dashboardConfig.NAV_COLLAPSED_WIDTH
					: dashboardConfig.NAV_WIDTH
			: 0,
	};

	// 渲染布局组件
	return (
		<AntdConfig>
			<AntdApp>
				<ScrollbarStyleWrapper $themeMode={themeMode}>
					{/* 显示进度条 */}
					<ProgressBar />

					<Layout className={layoutClassName}>
						<Suspense fallback={<CircleLoading />}>
							<Layout style={secondLayoutStyle}>
								{/* 页头组件，offsetTop 用于判断滚动时的样式变化 */}

								<Header
									offsetTop={
										themeLayout !== ThemeLayout.Horizontal && offsetTop
									}
								/>

								{/* 导航栏组件 */}
								<Nav />

								{/* 主内容区域组件，传递 offsetTop 和引用 */}
								<Main ref={mainEl} offsetTop={offsetTop} />
							</Layout>
						</Suspense>
					</Layout>
				</ScrollbarStyleWrapper>
			</AntdApp>
		</AntdConfig>
	);
}

export default BlogLayout;

/**
 * 滚动条样式配置
 */
const scrollbarStyles = {
	/**
	 *  深色主题
	 */
	dark: {
		/**
		 *  滚动条轨道颜色
		 */
		track: "#2c2c2c",
		/**
		 *  滚动条滑块颜色
		 */
		thumb: "#6b6b6b",
		/**
		 *  滑块悬停时的颜色
		 */
		thumbHover: "#939393",
	},
	/**
	 *  浅色主题
	 */
	light: {
		/**
		 *  滚动条轨道颜色
		 */
		track: "#FAFAFA",
		/**
		 *  滚动条滑块颜色
		 */
		thumb: "#C1C1C1",
		/**
		 *  滑块悬停时的颜色
		 */
		thumbHover: "#7D7D7D",
	},
};

/**
 * 使用 styled-components 定义滚动条样式
 */
const ScrollbarStyleWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  ::-webkit-scrollbar {
    width: 8px; // 滚动条宽度
		top: 32px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px; // 滚动条轨道圆角
    background: ${({ $themeMode }) =>
			$themeMode === ThemeMode.Dark
				? scrollbarStyles.dark.track
				: scrollbarStyles.light.track};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px; // 滚动条滑块圆角
    background: ${({ $themeMode }) =>
			$themeMode === ThemeMode.Dark
				? scrollbarStyles.dark.thumb
				: scrollbarStyles.light.thumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ $themeMode }) =>
			$themeMode === ThemeMode.Dark
				? scrollbarStyles.dark.thumbHover
				: scrollbarStyles.light.thumbHover};
  }

  .simplebar-scrollbar::before {
    background: ${({ $themeMode }) =>
			$themeMode === ThemeMode.Dark
				? scrollbarStyles.dark.thumb
				: scrollbarStyles.light.thumb};
  }

  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1; // 当滚动条可见时，设置不透明度
  }
`;
