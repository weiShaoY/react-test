import Globe from "react-globe.gl";

import earthNight from "./img/earth-night.jpg";
import earthTopology from "./img/earth-topology.png";
import aa from "./img/1.jpeg";

/**
 * 地球组件
 * @param  props - 组件的属性
 * @param  props.height - 地球组件的高度（像素）
 * @param  props.width - 地球组件的宽度（像素），如果未提供，则默认与高度相同
 * @returns  返回一个地球的可视化组件
 */
function Earth(props: { height: number; width?: number }) {
	return (
		<Globe
			// 设置地球高度
			height={props.height}
			// 如果未设置宽度，则默认为高度值
			width={props.width ? props.width : props.height}
			// 背景颜色设置为透明
			backgroundColor="rgba(0, 0, 0, 0)"
			// 是否显示地球大气层效果
			showAtmosphere
			// 是否显示经纬网线
			showGraticules
			// 地球表面贴图 URL
			globeImageUrl={earthNight}
			// 地球的高度图 URL
			bumpImageUrl={earthTopology}
			// 标签数据
			labelsData={[
				{
					// 纬度
					lat: 28.19,
					// 经度
					lng: 112.98,
					// 标签显示的文本
					text: "ChangSha,China",
					// 标签颜色
					color: "white",
					// 标签文字大小
					size: 30,
				},
			]}
		/>
	);
}

export default Earth;
