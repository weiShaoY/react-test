import { BlogApi } from "@/api";
import { message } from "antd";
import { useState } from "react";
import { Image, Select, Button, Spin } from "antd";
import { useDebounceEffect } from "ahooks";

import { SvgIcon } from "@/components/icon";

/**
 * 壁纸组件
 */
function Wallpaper() {
	const [category, setCategory] = useState("mn");

	const [state, setState] = useState({
		img_url: "",
		img_width: 1920,
		img_height: 1080,
	});

	const [imgLoading, setImgLoading] = useState(false); // 图片加载状态

	/**
	 * 获取壁纸数据
	 */
	const getData = async () => {
		try {
			setImgLoading(true);
			const res = await BlogApi.getWallpaper(category);
			setState(res);
		} catch (error: any) {
			message.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setImgLoading(false);
		}
	};

	/**
	 * 使用 ahooks 的防抖处理输入变化
	 * 只有在初始化之后，防抖才会生效
	 */
	useDebounceEffect(
		() => {
			getData();
		},
		[category],
		{ wait: 500 }, // 防抖时间 500ms
	);

	/**
	 * 常量配置
	 */
	const categorySelectOptions = [
		{ value: "fj", label: "风景" },
		{ value: "yx", label: "游戏" },
		{ value: "mn", label: "美女" },
		{ value: "cy", label: "视觉创意" },
		{ value: "mxys", label: "明星影视" },
		{ value: "qc", label: "汽车" },
		{ value: "dw", label: "动物" },
		{ value: "xqs", label: "小清新" },
		{ value: "ty", label: "体育" },
		{ value: "js", label: "军事" },
		{ value: "dm", label: "动漫" },
		{ value: "qg", label: "情感" },
		{ value: "wz", label: "文字" },
	];

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex items-center mb-4 gap-5">
				<Select
					className="w-40"
					showSearch
					allowClear
					placeholder="请选择壁纸类别"
					defaultValue={category}
					onChange={(category) => setCategory(category)}
					options={categorySelectOptions}
				/>

				<Button className="h-14 w-14" onClick={() => getData()}>
					<SvgIcon icon="refresh" size={40} />
				</Button>
			</div>
			<div className="flex-1 relative">
				{/* 图片加载时显示 Spin */}
				{imgLoading && (
					<Spin
						size="large"
						className="absolute w-full h-full flex items-center justify-center"
					/>
				)}

				{state.img_url && (
					<Image
						src={state.img_url}
						className={`flex-1 w-auto object-cover ${imgLoading ? "opacity-0" : "opacity-100"}`}
						onLoad={() => setImgLoading(false)} // 图片加载完成
						placeholder={null} // 移除默认的 placeholder
					/>
				)}
			</div>
		</div>
	);
}

export default Wallpaper;
