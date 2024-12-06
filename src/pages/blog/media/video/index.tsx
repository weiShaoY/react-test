import BlogApi from "@/api/modules/blog";
import { useEffect, useState } from "react";
import { message } from "antd";
import ReactPlayer from "react-player/lazy";
import { useDebounceEffect } from "ahooks";
import { SvgIcon } from "@/components/icon";
import { Select, Button, Spin } from "antd";

function Girl() {
	const [loading, setLoading] = useState(false);

	const [category, setCategory] = useState(0);

	const [videoUrl, setVideoUrl] = useState<string>(""); // 状态存储视频URL

	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 0, label: "测试" },
		{ value: 1, label: "随机美少女视频" },
		{
			value: 2,
			label: "随机返回一条小姐姐视频",
		},
	];

	async function getData() {
		try {
			setLoading(true);
			let response = null;

			if (category === 0) {
				response = await BlogApi.getTestVideo(); // 假设返回视频URL
			}

			if (category === 1) {
				console.log("%c Line:30 🍓 category", "color:#ffdd4d", category);
				response = await BlogApi.getRandomGirlVideo(); // 假设返回视频URL
			}

			if (category === 2) {
				response = await BlogApi.getRandomReturnOneGirlVideo(); // 假设返回视频URL
			}

			if (response) {
				setVideoUrl(response); // 更新视频URL
			} else {
				message.info("未获取到视频资源");
			}
		} catch (error) {
			message.error("获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}
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

	function onEnded() {
		console.log("%c Line:42 🍬 onEnded", "color:#33a5ff", "onEnded");
		getData();
	}

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex items-center mb-4 gap-5">
				<Select
					className="w-52"
					showSearch
					allowClear
					placeholder="请选择视频类别"
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
			</div>

			{/* 壁纸展示区域 */}
			<div className="flex-1 flex justify-center items-center bg-gray-200 h-[80vh] relative">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
				)}
				{videoUrl && (
					<ReactPlayer
						controls
						playing
						url={videoUrl}
						onEnded={onEnded}
						height={"100%"}
						width={"100%"}
					/>
				)}
			</div>
		</div>
	);
}

export default Girl;
