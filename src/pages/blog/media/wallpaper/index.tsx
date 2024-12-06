import { BlogApi } from "@/api";
import { message } from "antd";
import { useState } from "react";
import { Image, Select, Button, Spin } from "antd";
import { useDebounceEffect } from "ahooks";

import { SvgIcon } from "@/components/icon";

import { downloadImage } from "@/utils/downloadImage";

/**
 * 壁纸组件
 */
function Wallpaper() {
	const [loading, setLoading] = useState(false);

	const [category, setCategory] = useState("mn");

	const [wallpaper, setWallpaper] = useState({
		img_url: "",
		img_width: 1920,
		img_height: 1080,
	});

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

	/**
	 * 使用 ahooks 的防抖处理输入变化
	 */
	useDebounceEffect(
		() => {
			getData();
		},
		[category],
		{ wait: 500 }, // 防抖时间 500ms
	);
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
					className="h-14 w-14 flex items-center justify-center"
					loading={loading}
					onClick={() => getData()}
				>
					<SvgIcon icon="refresh" />
				</Button>

				<Button
					className="h-14 w-14 flex items-center justify-center"
					onClick={() => downloadImage(wallpaper.img_url)}
				>
					下载
				</Button>
			</div>

			{/* 壁纸展示区域 */}
			<div className="flex-1 flex justify-center items-center bg-gray-200 h-[80vh] relative">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
				)}
				{wallpaper.img_url && (
					<Image
						src={wallpaper.img_url}
						alt="壁纸"
						style={{
							maxWidth: "100%",
							maxHeight: "100%",
							objectFit: "contain",
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default Wallpaper;
