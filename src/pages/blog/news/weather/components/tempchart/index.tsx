import Chart from "@/components/chart";
import type { EChartsOption } from "echarts";
import type { WeatherType } from "../../type";
import day_0 from "@/assets/icons/blog/weather/day_0.svg";
import day_1 from "@/assets/icons/blog/weather/day_1.svg";
import day_2 from "@/assets/icons/blog/weather/day_2.svg";
import day_3 from "@/assets/icons/blog/weather/day_3.svg";

import day_7 from "@/assets/icons/blog/weather/day_7.svg";
import day_8 from "@/assets/icons/blog/weather/day_8.svg";
import day_13 from "@/assets/icons/blog/weather/day_13.svg";
import day_14 from "@/assets/icons/blog/weather/day_14.svg";

import night_0 from "@/assets/icons/blog/weather/night_0.svg";
import night_1 from "@/assets/icons/blog/weather/night_1.svg";
import night_2 from "@/assets/icons/blog/weather/night_2.svg";
import night_3 from "@/assets/icons/blog/weather/night_3.svg";
import night_7 from "@/assets/icons/blog/weather/night_7.svg";
import night_8 from "@/assets/icons/blog/weather/night_8.svg";
import night_13 from "@/assets/icons/blog/weather/night_13.svg";
import night_14 from "@/assets/icons/blog/weather/night_14.svg";

function Tempchart({ data }: { data: WeatherType }) {
	const tempchart = data.tempchart;
	console.table(tempchart);

	/**
	 *  时间数据
	 */
	const timeAxis = tempchart.map((item) => {
		const time = item.time || ""; // 如果 time 是 undefined 或 null，设置为空字符串
		if (!time) return ""; // 处理无效时间的情况
		return time;
	});

	const maxTempData = tempchart.map((item) => item.max_temp);

	/**
	 *  最高温度
	 */
	const maxTemp = Math.ceil((Math.max(...maxTempData) + 10) / 10) * 10;

	const minTempData = tempchart.map((item) => item.min_temp);

	/**
	 *  最低温度
	 */
	const minTemp = Math.floor((Math.min(...minTempData) - 10) / 10) * 10;

	const option: EChartsOption = {
		// 提示框配置
		tooltip: {
			trigger: "axis", // 提示框触发方式，'axis' 表示触发坐标轴
			axisPointer: {
				type: "cross", // 坐标轴指示器的类型，'cross' 交叉线
			},

			formatter: (params: any) => {
				// 初始的时间名称
				let relVal = params[0].name;

				// 遍历所有的参数
				for (let i = 0, l = params.length; i < l; i++) {
					const param = params[i];
					const isTemperature =
						param.seriesName === "最高温度" || param.seriesName === "最低温度";
					const isValidValue = param.value !== "9999";

					// 根据不同类型的系列，设置温度单位或其他后缀
					const suffix = isTemperature ? "°C" : "";
					// 如果是有效的温度值，或是有效的其他数据
					if (isTemperature || isValidValue) {
						relVal += `<br/>${param.marker}${param.seriesName}     ${param.value}${suffix}`;
					}
				}

				return relVal;
			},
		},
		// 网格配置
		grid: {
			// right: "20%", // 网格右边的空白区域
		},

		toolbox: {
			feature: {
				saveAsImage: {
					show: true,
					title: "保存为图片",
				},
			},
		},

		xAxis: [
			{
				type: "category",
				data: timeAxis,
				axisLine: {
					show: false, // 显示轴线
				},
				axisTick: {
					show: false, // 显示刻度线
				},

				axisPointer: {
					label: {
						show: false, // 不显示提示框标签
					},
				},

				axisLabel: {
					formatter: (value) => {
						const [year, month, day] = value.split("/"); // 拆分日期字符串为 [年, 月, 日]
						const date = new Date(Number(year), Number(month) - 1, Number(day)); // 创建 Date 对象，注意月份是从 0 开始的

						// 获取当前日期、明天和后天的 Date 对象
						const today = new Date();
						const tomorrow = new Date(today);
						const dayAfterTomorrow = new Date(today);

						tomorrow.setDate(today.getDate() + 1); // 明天
						dayAfterTomorrow.setDate(today.getDate() + 2); // 后天

						// 判断日期是否是今天、明天或后天
						const formattedDate = `${month}/${day}`;
						if (date.toDateString() === today.toDateString()) {
							return `{highlightDate|${formattedDate}}\n{highlightText|今天}`;
						}
						if (date.toDateString() === tomorrow.toDateString()) {
							return `{highlightDate|${formattedDate}}\n{highlightText|明天}`;
						}
						if (date.toDateString() === dayAfterTomorrow.toDateString()) {
							return `{highlightDate|${formattedDate}}\n{highlightText|后天}`;
						}

						// 其他日期显示 星期几
						const dayOfWeek = [
							"周日",
							"周一",
							"周二",
							"周三",
							"周四",
							"周五",
							"周六",
						][date.getDay()]; // 获取中文周几
						return `${formattedDate}\n${dayOfWeek}`; // 格式化返回日期和星期几
					},
					rich: {
						highlightDate: {
							color: "red", // 第一排日期高亮颜色
							fontWeight: "bold",
						},
						highlightText: {
							color: "blue", // 第二排文本（今天/明天/后天）高亮颜色
							fontWeight: "bold",
						},
					},
					interval: 0, // 强制显示所有标签
				},
			},

			{
				type: "category",
				position: "top",
				offset: -50,
				axisTick: {
					show: false, // 不显示刻度
				},
				axisLine: {
					show: false, // 不显示轴线
				},
				axisPointer: {
					show: false, // 禁用 x 轴指示器
				},
				data: tempchart.map((item) => ({
					value: item.day_img, // 只传递值
				})),

				axisLabel: {
					formatter: (value) => {
						if (value === "9999") {
							return "";
						}

						if (value === "0") {
							return "{day_0|}";
						}
						if (value === "1") {
							return "{day_1|}";
						}
						if (value === "2") {
							return "{day_2|}";
						}
						if (value === "3") {
							return "{day_3|}";
						}
						if (value === "7") {
							return "{day_7|}";
						}
						if (value === "8") {
							return "{day_8|}";
						}
						if (value === "13") {
							return "{day_13|}";
						}
						if (value === "14") {
							return "{day_14|}";
						}
						return value;
					},
					rich: {
						day_0: {
							backgroundColor: {
								image: day_0,
							},
							fontSize: 40,
						},
						day_1: {
							backgroundColor: {
								image: day_1,
							},
							fontSize: 40,
						},

						day_2: {
							backgroundColor: {
								image: day_2,
							},
							fontSize: 40,
						},
						day_3: {
							backgroundColor: {
								image: day_3,
							},
							fontSize: 40,
						},
						day_7: {
							backgroundColor: {
								image: day_7,
							},
							fontSize: 40,
						},
						day_8: {
							backgroundColor: {
								image: day_8,
							},
							fontSize: 40,
						},
						day_13: {
							backgroundColor: {
								image: day_13,
							},
							fontSize: 40,
						},
						day_14: {
							backgroundColor: {
								image: day_14,
							},
							fontSize: 40,
						},
					},
				},
			},

			{
				type: "category",
				position: "bottom",
				offset: -50,
				axisTick: {
					show: false, // 不显示刻度
				},
				axisLine: {
					show: false, // 不显示轴线
				},
				axisPointer: {
					show: false, // 禁用 x 轴指示器
				},

				data: tempchart.map((item) => ({
					value: item.night_img, // 只传递值
				})),

				axisLabel: {
					formatter: (value) => {
						if (value === "9999") {
							return "";
						}

						if (value === "0") {
							return "{night_0|}";
						}
						if (value === "1") {
							return "{night_1|}";
						}
						if (value === "2") {
							return "{night_2|}";
						}
						if (value === "3") {
							return "{night_3|}";
						}
						if (value === "7") {
							return "{night_7|}";
						}
						if (value === "8") {
							return "{night_8|}";
						}
						if (value === "13") {
							return "{night_13|}";
						}
						if (value === "14") {
							return "{night_14|}";
						}
						return value;
					},
					rich: {
						night_0: {
							backgroundColor: {
								image: night_0,
							},
							fontSize: 40,
						},
						night_1: {
							backgroundColor: {
								image: night_1,
							},
							fontSize: 40,
						},
						night_2: {
							backgroundColor: {
								image: night_2,
							},
							fontSize: 40,
						},
						night_3: {
							backgroundColor: {
								image: night_3,
							},
							fontSize: 40,
						},
						night_7: {
							backgroundColor: {
								image: night_7,
							},
							fontSize: 40,
						},
						night_8: {
							backgroundColor: {
								image: night_8,
							},
							fontSize: 40,
						},
						night_13: {
							backgroundColor: {
								image: night_13,
							},
							fontSize: 40,
						},
						night_14: {
							backgroundColor: {
								image: night_14,
							},
							fontSize: 40,
						},
					},
				},
			},
		],

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
				min: minTemp,

				max: maxTemp,
			},
		],

		series: [
			{
				yAxisId: "temperature", // 使用第1个 y 轴
				name: "最高温度", // 系列名称
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#EE6666", // 折线图的颜色
				data: maxTempData,
				label: {
					show: true, // 显示每个点的标签
					position: "top", // 标签显示在点的上方
					formatter: "{c}°C", // 格式化标签内容，{c} 表示当前点的数值
					color: "#EE6666",
				},
			},
			{
				yAxisId: "temperature", // 使用第1个 y 轴
				name: "最低温度", // 系列名称
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#5470C6", // 折线图的颜色
				data: minTempData,
				label: {
					show: true, // 显示每个点的标签
					position: "top", // 标签显示在点的上方
					formatter: "{c}°C", // 格式化标签内容，{c} 表示当前点的数值
					color: "#5470C6",
				},
			},
			{
				name: "白天天气", // 系列名称
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#FFA500", // 折线图的颜色
				data: tempchart.map((item) => ({
					value: item.day_text, // 只传递值
				})),
			},
			{
				name: "夜晚天气",
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#8A2BE2", // 折线图的颜色
				data: tempchart.map((item) => ({
					value: item.night_text, // 只传递值
				})),
			},
		],
	};

	return (
		<div className="h-[500px] w-full bg-amber">
			<Chart option={option} />
		</div>
	);
}

export default Tempchart;
