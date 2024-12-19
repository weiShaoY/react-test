import Chart from "@/components/chart";
import type { EChartsOption } from "echarts";
import type { WeatherType } from "../../type";

function PassedChart({ data }: { data: WeatherType }) {
	const passedchart = [...data.passedchart].reverse();

	/**
	 *  最新数据
	 */
	const latestData = passedchart[passedchart.length - 1];

	/**
	 *  时间数据
	 */
	const timeAxis = passedchart.map((item) => {
		const time = item.time;
		if (time) {
			return time.split(" ")[1]?.split(":")[0]; // 安全访问，避免 undefined 或 null 引发错误
		}
		return ""; // 如果 time 是 undefined 或 null，返回空字符串
	});

	console.log("%c Line:25 🍰 timeData", "color:#7f2b82", timeAxis);

	/**
	 *  温度数据
	 */
	const temperatureData = passedchart.map((item) => item.temperature);

	/**
	 *  降水量
	 */
	const precipitationData = passedchart.map((item) => item.rain1h);

	/**
	 *  相对湿度
	 */
	const humidityData = passedchart.map((item) => item.humidity);
	/**
	 *  气压
	 */
	const pressureData = passedchart.map((item) => item.pressure);

	const option: EChartsOption = {
		title: {
			text: `最新整点实况 (${latestData.time}) :  气温:${latestData.temperature}°C  降水量:${latestData.rain1h}mm  相对湿度:${latestData.humidity}%  气压:${latestData.pressure}hPa`,
		},
		// 提示框配置
		tooltip: {
			trigger: "axis", // 提示框触发方式，'axis' 表示触发坐标轴
			axisPointer: {
				type: "cross", // 坐标轴指示器的类型，'cross' 交叉线
			},

			formatter: (params: any) => {
				let relVal = params[0].name;
				for (let i = 0, l = params.length; i < l; i++) {
					// 后缀
					const suffix =
						params[i].seriesName === "温度"
							? "°C"
							: params[i].seriesName === "相对湿度"
								? "%"
								: params[i].seriesName === "降水量"
									? "mm"
									: params[i].seriesName === "气压"
										? "hPa"
										: "";

					relVal += `<br/>${params[i].marker}${params[i].seriesName}     ${params[i].value}${suffix}`;
				}
				return relVal;
			},
		},

		// 图例配置
		// legend: {}, // 图例配置，空对象表示使用默认图例样式
		// 网格配置
		grid: {
			right: "20%", // 网格右边的空白区域
		},

		// 工具箱配置，提供了一些常用功能
		toolbox: {
			feature: {
				saveAsImage: {
					show: true,
					title: "保存为图片",
				}, // 保存为图片功能，显示并能保存图表为图片
			},
		},

		// x 轴配置

		xAxis: {
			type: "category",
			axisTick: {
				alignWithLabel: true,
			},
			data: timeAxis,

			axisLabel: {
				formatter: "{value}时",
				interval: 0, // 强制显示所有标签
			},
		},

		// y 轴配置
		yAxis: [
			{
				id: "temperature",
				type: "value", // 数值轴，适用于连续的数据
				position: "left", // y 轴的位置（左侧）
				alignTicks: true, // 是否与坐标轴对齐
				axisLine: {
					show: true, // 显示 y 轴的轴线
					lineStyle: {
						color: "#EE6666", // 轴线的颜色
					},
				},
				axisLabel: {
					formatter: "{value} °C", // 格式化 y 轴的标签，显示摄氏度符号
				},
			},
			{
				id: "precipitation",
				type: "value", // 第二个 y 轴类型为值轴
				name: "降水量", // y 轴名称
				position: "right", // y 轴位置（右侧）
				alignTicks: true, // 是否与坐标轴对齐
				axisLine: {
					show: true, // 显示 y 轴的轴线
					lineStyle: {
						color: "#91CC75", // 轴线的颜色
					},
				},
				axisLabel: {
					formatter: "{value} mm", // y 轴标签的格式化（显示毫米）
				},
			},
			{
				id: "humidity",
				type: "value", // 第四个 y 轴类型为值轴
				name: "相对湿度", // y 轴名称
				position: "right", // y 轴位置（右侧）
				alignTicks: true, // 是否与坐标轴对齐
				offset: 160, // 相对第一个 y 轴的偏移量
				axisLine: {
					show: true, // 显示 y 轴的轴线
					lineStyle: {
						color: "#9E4C47", // 轴线的颜色
					},
				},

				max: 100, // 设置最大刻度值为 100
				min: 0, // 可选：设置最小刻度值为 0
				axisLabel: {
					formatter: "{value} %", // y 轴标签的格式化（显示百分比）
				},
			},
			{
				id: "pressure",
				type: "value", // 第三个 y 轴类型为值轴
				name: "气压", // y 轴名称
				position: "right", // y 轴位置（右侧）
				alignTicks: true, // 是否与坐标轴对齐
				offset: 80, // 相对第一个 y 轴的偏移量
				axisLine: {
					show: true, // 显示 y 轴的轴线
					lineStyle: {
						color: "#595EA5", // 轴线的颜色
					},
				},
				axisLabel: {
					formatter: "{value} hPa", // y 轴标签的格式化（显示毫巴）
				},
			},
		],

		// 数据系列配置
		series: [
			{
				yAxisId: "temperature",
				name: "温度",
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#EE6666",
				data: temperatureData,
				markPoint: {
					data: [
						{ type: "max", name: "Max" },
						{ type: "min", name: "Min" },
					],
				},
			},
			{
				yAxisId: "precipitation",
				name: "降水量",
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#91CC75",
				data: precipitationData,
			},
			{
				yAxisId: "humidity",
				name: "相对湿度",
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#9E4C47",
				data: humidityData,
			},
			{
				yAxisId: "pressure",
				name: "气压",
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#595EA5",
				data: pressureData,
			},
		],
	};

	return (
		<>
			{/* <p className="flex items-center">
				<span>
					<span className="text-red-500">{latestData.time}</span>
					<span>°C</span>
				</span>
				<span>
					<span className="text-red-500">{latestData.temperature}</span>
					<span>°C</span>
				</span>
				<span>
					<span className="text-red-500">{latestData.rain1h}</span>
					<span>%</span>
				</span>
				<span>
					<span className="text-red-500">{latestData.humidity}</span>
					<span>%</span>
				</span>
				<span>
					<span className="text-red-500">{latestData.pressure}</span>
					<span>hPa</span>
				</span>
			</p> */}
			<div className="h-[500px] w-full bg-amber">
				<Chart option={option} />
			</div>
		</>
	);
}

export default PassedChart;
