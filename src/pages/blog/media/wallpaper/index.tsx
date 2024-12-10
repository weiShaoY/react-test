import { BlogApi } from "@/api";
import { useDebounceEffect } from "ahooks";
import { message } from "antd";
import { Button, Image, Select, Spin, Tooltip } from "antd";
import { useState } from "react";

import { SvgIcon } from "@/components/icon";

import { downloadImage } from "@/utils/downloadImage";

/**
 * 壁纸组件
 */
function Wallpaper() {
	const [loading, setLoading] = useState(false);

	const [category, setCategory] = useState("mn");

	const [url, setUrl] = useState("");

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
		{ value: "sg", label: "帅哥" },
	];

	/**
	 * 获取壁纸数据
	 */
	const getData = async () => {
		try {
			setLoading(true);

			if (category === "sg") {
				const res = await BlogApi.getBoyImage();
				console.log("%c Line:50 🍎 res", "color:#fca650", res);
				const imageUrl = URL.createObjectURL(res.blob);
				console.log("%c Line:52 🍕 imageUrl", "color:#ed9ec7", imageUrl);

				setUrl(imageUrl);
			} else {
				const res = await BlogApi.getWallpaper(category);
				setUrl(res.img_url);
			}
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

				<Tooltip placement="top" title="点击刷新">
					<Button
						loading={loading}
						onClick={getData}
						icon={<SvgIcon icon="refresh" />}
					/>
				</Tooltip>

				<Tooltip placement="top" title="点击下载">
					<Button
						onClick={() => downloadImage(url)}
						icon={<SvgIcon icon="download" />}
					/>
				</Tooltip>
			</div>

			{/* 壁纸展示区域 */}
			<div className="flex-1 flex justify-center items-center bg-gray-200 h-[80vh] relative">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
				)}
				{url && (
					<Image
						src={url}
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
