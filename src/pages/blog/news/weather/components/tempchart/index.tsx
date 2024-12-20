import Chart from "@/components/chart";
import type { EChartsOption } from "echarts";
import type { WeatherType } from "../../type";
import day_0 from "@/assets/icons/blog/weather/day_0.svg";
import day_1 from "@/assets/icons/blog/weather/day_1.svg";
import day_2 from "@/assets/icons/blog/weather/day_2.svg";
import day_7 from "@/assets/icons/blog/weather/day_7.svg";
import day_13 from "@/assets/icons/blog/weather/day_13.svg";
import day_14 from "@/assets/icons/blog/weather/day_14.svg";

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

	/**
	 *  白天图片轴
	 */
	const dayImgAxis = tempchart.map((item) => {
		const dayImg = item.day_img || ""; // 如果 day_img 是 undefined 或 null，设置为空字符串
		if (!dayImg) return ""; // 处理无效图片的情况
		return dayImg;
	});

	/**
	 *  白天天气
	 */
	const dayTextAxis = tempchart.map((item) => {
		const day_text = item.day_text || ""; // 如果 time 是 undefined 或 null，设置为空字符串
		if (day_text) return ""; // 处理无效时间的情况
		return day_text;
	});
	console.log("%c Line:26 🥛 dayImgAxis", "color:#3f7cff", dayImgAxis);
	/**
	 *  提取最高温度数据
	 */
	const maxTempData = tempchart.map((item) => item.max_temp);

	/**
	 *  提取最低温度数据
	 */
	const minTempData = tempchart.map((item) => item.min_temp);

	// 获取当前日期并格式化为 'YYYY/MM/DD' 格式
	const today = new Date();

	const formattedToday = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`; // '2024/12/20' 格式

	// 计算今天的索引
	const todayIndex = timeAxis.indexOf(formattedToday);

	// 获取xAxis的数据
	const option: EChartsOption = {
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
					const suffix = "°C";

					/**
					 *  白天天气
					 */
					const dayText = params[i].data.day_text;

					relVal += `<br/>${params[i].marker}${params[i].seriesName}     ${params[i].value}${suffix}`;

					if (dayText && dayText !== "9999") {
						// 如果有白天天气，则显示对应的图标
						relVal += `<br/>白天天气: ${dayText}`;
					}

					/**
					 *  晚上天气
					 */
					const nightText = params[i].data.night_text;
					if (nightText && nightText !== "9999") {
						// 如果有晚上天气，则显示对应的图标
						relVal += `<br/>晚上天气: ${nightText}`;
					}
				}
				return relVal;
			},
		},
		// 图例配置
		// legend: {}, // 图例配置，空对象表示使用默认图例样式
		// 网格配置
		grid: {
			// right: "20%", // 网格右边的空白区域
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

		xAxis: [
			{
				type: "category",
				data: timeAxis,

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
				data: dayImgAxis,
				axisTick: {
					show: false, // 不显示刻度
				},
				axisLine: {
					show: false, // 不显示轴线
				},
				axisPointer: {},
				offset: -60,
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
						if (value === "7") {
							return "{day_7|}";
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
						day_7: {
							backgroundColor: {
								image: day_7,
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
		],

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
				max: 60, // 设置最大刻度值为 100
			},
		],

		// 数据系列配置
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
				markArea: {
					// itemStyle: {
					// 	color: "rgba(255, 173, 177, 0.4)", // 高亮区域的背景色
					// },
					// data: [
					// 	// 高亮区域：根据 X 轴的索引位置设置
					// 	[
					// 		{
					// 			xAxis: todayIndex, // 对应 '2024/12/18'
					// 		},
					// 		{
					// 			xAxis: maxTempData.length - 1,
					// 		},
					// 	],
					// ],
				},
			},
			// {
			// 	yAxisId: "temperature", // 使用第1个 y 轴
			// 	name: "最低温度", // 系列名称
			// 	type: "line", // 系列图表类型为折线图
			// 	smooth: true, // 平滑曲线
			// 	color: "#5470C6", // 折线图的颜色
			// 	data: minTempData,
			// 	label: {
			// 		show: true, // 显示每个点的标签
			// 		position: "top", // 标签显示在点的上方
			// 		formatter: "{c}°C", // 格式化标签内容，{c} 表示当前点的数值
			// 		color: "#5470C6",
			// 	},
			// },

			{
				yAxisId: "temperature", // 使用第1个 y 轴
				name: "最低温度1", // 系列名称
				type: "line", // 系列图表类型为折线图
				smooth: true, // 平滑曲线
				color: "#5470C6", // 折线图的颜色
				data: tempchart.map((item) => ({
					value: item.min_temp, // 只传递值
					time: item.time,
					day_text: item.day_text,
					night_text: item.night_text,
				})),
				label: {
					show: true, // 显示每个点的标签
					position: "top", // 标签显示在点的上方
					formatter: "{c}°C", // 格式化标签内容，{c} 表示当前点的数值
					color: "#5470C6",
				},
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
