// import { memo } from "react";
// import ApexChart from "react-apexcharts";

// import { useSettings } from "@/store/settingStore";
// import { useThemeToken } from "@/theme/hooks";

// import { StyledApexChart } from "./styles";

// import type { Props as ApexChartProps } from "react-apexcharts";

// function Chart(props: ApexChartProps) {
// 	const { themeMode } = useSettings();
// 	const theme = useThemeToken();
// 	return (
// 		<StyledApexChart $thememode={themeMode} $theme={theme}>
// 			<ApexChart {...props} />
// 		</StyledApexChart>
// 	);
// }

// export default memo(Chart);

import * as echarts from "echarts";
import { useEffect, useRef } from "react";
const EchartsPage = () => {
	const chartRef = useRef<any>(null);
	const optionData = {
		title: {
			text: "ECharts 入门示例",
		},
		tooltip: {},
		xAxis: {
			data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
		},
		yAxis: {},
		series: [
			{
				name: "销量",
				type: "bar",
				data: [5, 20, 36, 10, 10, 20],
			},
		],
	};

	useEffect(() => {
		// 挂载阶段
		const chart = echarts.init(chartRef.current);
		chart.setOption(optionData);

		// 销毁
		return () => {
			chart.dispose();
		};
	}, []);
	return (
		<>
			<div ref={chartRef} style={{ width: "500px", height: "350px" }} />
		</>
	);
};

export default EchartsPage;
