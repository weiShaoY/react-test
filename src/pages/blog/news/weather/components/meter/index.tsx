import type { WeatherType } from "../../type";
import type { EChartsOption } from "echarts";
import Chart from "@/components/chart";

import { SvgIcon } from "@/components/icon";

function Meter({ data }: { data: WeatherType }) {
	const option: EChartsOption = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%", // 提示框格式化显示内容
		},
		series: [
			{
				name: "温度", // 仪表盘的名称
				type: "gauge", // 图表类型为仪表盘
				max: 50, // 最大刻度值
				startAngle: 220, // 仪表盘开始角度
				endAngle: -40, // 仪表盘结束角度
				detail: {
					formatter: ["{value}℃", `{a|${data.real.station.city}}`].join("\n"), // 显示的数值和自定义文本格式
					fontSize: 20, // 数值字体大小
					width: "100%", // 数值显示的宽度
					height: 10, // 数值显示的高度
					padding: [-100, 0, 0, 0], // 数值显示的内边距
					rich: {
						a: {
							// color: "#666", // 自定义文本颜色
							fontSize: 14, // 自定义文本字体大小
							padding: [10, 0, 10, 0], // 自定义文本内边距
						},
					},
				},
				data: [
					{
						value: data.real.weather.temperature, // 仪表盘显示的当前数值
					},
				],
				axisLine: {
					lineStyle: {
						color: [
							// 仪表盘的颜色范围
							[0.4, "#49afff"], // 前40%的颜色为蓝色
							[0.6, "#68A54A"], // 中间20%的颜色为绿色
							[1, "#f56c6c"], // 后40%的颜色为红色
						],
						width: 12, // 仪表盘的线宽
					},
				},
				splitLine: {
					length: 6, // 分割线的长度
					lineStyle: {
						width: 2, // 分割线的宽度
					},
				},
				axisLabel: {
					distance: -40, // 刻度标签距离仪表盘的距离
					show: true, // 是否显示刻度标签
					formatter: (value: any) => {
						if (value === 0) {
							// 仅显示 0 和 50 的刻度值
							return `日出 ${data.real.sunriseSunset.sunrise.slice(-5)}`;
						}
						if (value === 50) {
							// 仅显示 0 和 50 的刻度值
							return `日落 ${data.real.sunriseSunset.sunset.slice(-5)}`;
						}

						return ""; // 其他刻度不显示
					},
					lineHeight: -60, // 刻度标签的行高
					fontSize: 12, // 刻度标签的字体大小
					fontStyle: "normal",
				},
				pointer: {
					show: false, // 隐藏指针
				},
				axisTick: {
					show: false, // 隐藏刻度
				},
			},
		],
	};

	return (
		<div className="w-full h-[200px]  flex items-center justify-between gap-5">
			{/* 仪表盘图表容器 */}
			<div className="h-[200px] aspect-square">
				<Chart option={option} />
			</div>

			<div className="flex-1 flex items-center justify-between">
				<div className="flex-1 flex  flex-col items-center gap-1">
					<SvgIcon icon="blog-weather-rain" size={50} />
					<div className="">降水量</div>
					<div className="">{data.real.weather.rain} mm</div>
				</div>
				<div className="flex-1 flex  flex-col items-center gap-1">
					<SvgIcon icon="blog-weather-direct" size={50} />
					<div className="">{data.real.wind.direct}</div>
					<div className="">{data.real.wind.power}</div>
				</div>{" "}
				<div className="flex-1 flex  flex-col items-center gap-1">
					<SvgIcon icon="blog-weather-humidity" size={50} />
					<div className="">相对湿度</div>
					<div className="">{data.real.weather.humidity}%</div>
				</div>
				<div className="flex-1 flex  flex-col items-center gap-1">
					<SvgIcon icon="blog-weather-feelst" size={50} />
					<div className="">体感温度</div>
					<div className="">{data.real.weather.feelst}°C</div>
				</div>
				<div className="flex-1 flex  flex-col items-center gap-1">
					<SvgIcon icon="blog-weather-air" size={50} />
					<div className="">空气质量</div>
					<div className="">{data.air.text}</div>
				</div>
			</div>
		</div>
	);
}

export default Meter;
