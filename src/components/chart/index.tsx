import { useEffect, useRef, memo, useCallback } from "react";
import * as echarts from "echarts";
import { useSettings } from "@/store/settingStore";

import type { EChartsOption } from "echarts";

// 定义 Props 类型
interface ChartProps {
	option: EChartsOption; // ECharts 配置项
	style?: React.CSSProperties; // 图表容器样式
}

function Chart({ option, style }: ChartProps) {
	const chartRef = useRef<HTMLDivElement>(null); // ECharts 容器引用
	const chartInstance = useRef<echarts.ECharts | null>(null); // ECharts 实例引用

	const { themeMode } = useSettings();

	// 使用 useCallback 来 memoize initChart 函数，避免每次渲染时重新定义
	const initChart = useCallback(() => {
		if (chartInstance.current) {
			chartInstance.current.dispose(); // 销毁旧的实例
		}
		if (chartRef.current) {
			chartInstance.current = echarts.init(
				chartRef.current,
				themeMode === "dark" ? "dark" : "light", // 重新传入主题
				{ renderer: "canvas" },
			);
			chartInstance.current.setOption(option); // 设置配置项
		}
	}, [themeMode, option]); // 确保 themeMode 和 option 变化时重新创建图表

	// 监听主题变化和配置项变化
	useEffect(() => {
		initChart(); // 初始化或重新初始化图表
		return () => {
			chartInstance.current?.dispose(); // 卸载时销毁图表实例
		};
	}, [initChart]); // 依赖 initChart，确保函数变化时重新执行

	// 确保图表自适应容器大小
	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			chartInstance.current?.resize();
		});

		if (chartRef.current) {
			resizeObserver.observe(chartRef.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div
			ref={chartRef}
			style={{
				width: "100%",
				height: "100%",
				position: "relative",
				...style,
			}}
		/>
	);
}

export default memo(Chart);
