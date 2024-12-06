import BlogApi from "@/api/modules/blog";
import { useState } from "react";
import { message } from "antd";
import ReactPlayer from "react-player/lazy";
import { useDebounceEffect } from "ahooks";
import { SvgIcon } from "@/components/icon";
import { Select, Button, Spin, Switch } from "antd";

function Video() {
	const [loading, setLoading] = useState<boolean>(false);
	const [category, setCategory] = useState<number>(0);
	const [isAutoPlayNext, setIsAutoPlayNext] = useState<boolean>(true);
	const [videoUrl, setVideoUrl] = useState<string>("");

	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 0, label: "测试" },
		{ value: 1, label: "随机美少女视频" },
		{ value: 2, label: "随机返回一条小姐姐视频" },
	];

	/**
	 *  分类接口映射
	 */
	const categoryMap: Record<number, () => Promise<string>> = {
		0: BlogApi.getTestVideo,
		1: BlogApi.getRandomGirlVideo,
		2: BlogApi.getRandomReturnOneGirlVideo,
	};

	const getData = async () => {
		try {
			setLoading(true);
			const fetchVideo = categoryMap[category];
			if (!fetchVideo) {
				message.error("无效的分类");
				return;
			}
			const response = await fetchVideo();
			if (response) {
				setVideoUrl(response);
			} else {
				message.error("未获取到视频资源");
			}
		} catch (error) {
			message.error("获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	};

	// 自动播放逻辑
	function handleVideoEnd() {
		if (isAutoPlayNext) {
			getData();
		}
	}

	// 使用防抖获取数据
	useDebounceEffect(
		() => {
			getData();
		},
		[category],
		{ wait: 500 },
	);

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex items-center mb-4 gap-5">
				<Select
					className="w-52"
					showSearch
					allowClear
					placeholder="请选择视频类别"
					value={category}
					onChange={(value) => {
						setCategory(value ?? 0);
					}}
					options={categoryOptions}
				/>

				<Button
					className="h-14 w-14 flex items-center justify-center"
					loading={loading}
					onClick={getData}
				>
					<SvgIcon icon="refresh" />
				</Button>

				<Switch
					checkedChildren="自动播放"
					unCheckedChildren="手动播放"
					checked={isAutoPlayNext}
					onChange={setIsAutoPlayNext}
				/>
			</div>

			{/* 视频播放区域 */}
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
						onEnded={handleVideoEnd}
						height="100%"
						width="100%"
					/>
				)}
			</div>
		</div>
	);
}

export default Video;
