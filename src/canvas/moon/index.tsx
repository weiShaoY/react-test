import Globe from "react-globe.gl";

import bumpImage from "./image/bumpImage.jpeg";
/**
 * 月亮组件
 * @param {Object} props - 组件的属性
 * @param {number} props.height - 月亮组件的高度（像素）
 * @param {number} [props.width] - 月亮组件的宽度（像素），如果未提供，则默认与高度相同
 * @returns {JSX.Element} 返回一个月亮的可视化组件
 */
function Moon(props: { height: number; width?: number }) {
	return (
		<Globe
			// 设置月亮高度
			height={props.height}
			// 如果未设置宽度，则默认为高度值
			width={props.width ? props.width : props.height}
			// 背景颜色设置为透明
			backgroundColor="rgba(0, 0, 0, 0)"
			// 不显示地球大气层效果（适用于月亮）
			showAtmosphere={false}
			// 不显示经纬网线
			showGraticules={false}
			// 月亮表面贴图 URL
			globeImageUrl={bumpImage}
			// 月亮的高度图 URL（用于表现月球表面细节）
			bumpImageUrl="//unpkg.com/three-globe/example/img/moon-topology.png"
			// 标签数据
			labelsData={[
				{
					// 纬度
					lat: 0,
					// 经度
					lng: 0,
					// 标签显示的文本
					text: "Apollo 11 Landing Site",
					// 标签颜色
					color: "yellow",
					// 标签文字大小
					size: 20,
				},
			]}
		/>
	);
}

export default Moon;
