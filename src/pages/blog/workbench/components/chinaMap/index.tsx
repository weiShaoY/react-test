import Chart from "@/components/chart";
import type { EChartsOption } from "echarts";
import { isMobile } from "@/utils";
import chinaMap from "./china.json";
import { registerMap } from "echarts/core";
import { useSettings } from "@/store/settingStore";

// 注册中国地图
registerMap("china", chinaMap as any);

function ChinaMap() {
	const { themeMode } = useSettings();

	/**
	 *  定义图表配置项
	 */
	const option: EChartsOption = {
		backgroundColor: "transparent", // 背景颜色
		title: {
			text: "风里雨里,长沙等你", // 标题文本
			top: isMobile ? "12%" : "14%", // 标题距离顶部的距离
			left: "center", // 标题水平居中
			textStyle: {
				// color: "#000", // 标题颜色
				color: themeMode === "light" ? "#333639" : "#d1d3d7",
				fontSize: isMobile ? 30 : 45, // 标题字体大小
				fontWeight: 700, // 标题字体粗细
			},
		},
		textStyle: {
			fontFamily: "gaiLiangShouJinTi", // 全局字体
		},
		geo: {
			map: "china", // 使用中国地图
			zoom: isMobile ? 0.4 : 0.8, // 地图缩放级别
			top: "0%", // 地图距顶部的距离
			bottom: "5%", // 地图距底部的距离
			itemStyle: {
				areaColor: "#d1d3d7", // 区域颜色
				borderColor: "#111", // 区域边框颜色
			},
			emphasis: {
				label: {
					show: false, // 悬停时不显示标签
				},
				itemStyle: {
					areaColor: "#323639", // 高亮时的区域颜色
					borderColor: "#fff", // 高亮时的边框颜色
					borderWidth: 1, // 高亮时的边框宽度
					shadowBlur: 2, // 高亮时的阴影模糊大小
				},
			},
		},
		tooltip: {
			backgroundColor: "rgba(0,0,0,0.5)", // 提示框背景色
			borderColor: "rgba(0,0,0,0)", // 提示框边框颜色
			textStyle: {
				color: "#fff", // 提示框文字颜色
				fontSize: 16, // 提示框文字大小
				fontWeight: 700, // 提示框文字粗细
			},
		},
		series: [
			{
				name: "Top 5", // 系列名称
				type: "effectScatter", // 使用涟漪特效的散点图
				coordinateSystem: "geo", // 使用地理坐标系
				data: [
					{
						name: "长沙", // 数据点名称
						value: [113, 28.21, 100], // 数据坐标（[经度, 纬度, 数值]）
					},
				],
				symbolSize: (val: number[]) => val[2] / 8, // 动态设置散点的大小
				showEffectOn: "render", // 渲染时显示特效
				rippleEffect: {
					number: 5, // 波纹的数量
					scale: 20, // 动画中的波纹最大缩放比例
					period: 5, // 波纹动画的周期，单位秒
					brushType: "stroke", // 波纹的绘制方式
				},
				emphasis: {
					scale: true, // 鼠标悬停时放大
				},
				tooltip: {
					formatter() {
						return "惟楚有材，于斯为盛"; // 提示框内容
					},
					textStyle: {
						color: "#E43961", // 提示框文字颜色
						fontSize: 24, // 提示框文字大小
						fontWeight: 700, // 提示框文字粗细
					},
					backgroundColor: "rgba(255,255,255,0.9)", // 提示框背景色
				},
				label: {
					formatter: (params) => `${params.name}`, // 标注的名称（如：长沙）
					position: "top", // 标注位置
					show: true, // 显示标注
					color: "#E43961", // 标注文字颜色
					fontWeight: 700, // 标注文字粗细
					fontSize: 26, // 标注文字大小
				},
				itemStyle: {
					color: "#E43961", // 散点颜色
					shadowBlur: 10, // 阴影模糊程度
					shadowColor: "#333", // 阴影颜色
				},
				zlevel: 1, // 图层级别
			},
		],
	};

	return (
		<div className="w-full h-full">
			<Chart option={option} />
		</div>
	);
}

export default ChinaMap;
