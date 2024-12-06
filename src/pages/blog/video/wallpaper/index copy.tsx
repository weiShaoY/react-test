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

	const [wallpaper, setWallpaper] = useState({
		img_url: "",
		img_width: 1920,
		img_height: 1080,
	});

	const [loading, setLoading] = useState(false);

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
	 *  分类选项
	 */
	const categoryOptions = [
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

	/**
	 * 获取壁纸数据
	 */
	const getData = async () => {
		try {
			setLoading(true);
			const res = await BlogApi.getWallpaper(category);
			setWallpaper(res);
		} catch (error: any) {
			message.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	};
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
					options={categoryOptions}
				/>

				<Button
					className="h-14 w-14"
					loading={loading}
					onClick={() => getData()}
				>
					<SvgIcon icon="refresh" size={40} />
				</Button>
			</div>

			{/* 壁纸展示区域 */}
			<div className="flex-1 flex justify-center items-center bg-gray-200 h-[80vh]">
				{loading && !wallpaper.img_url ? (
					<Spin size="large" />
				) : (
					<Image
						src={wallpaper.img_url}
						height="100%"
						alt="壁纸"
						style={{ objectFit: "contain", width: "auto", maxHeight: "100%" }}
					/>
				)}
			</div>
		</div>
	);
}

export default Wallpaper;
