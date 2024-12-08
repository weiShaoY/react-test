import BlogApi from "@/api/modules/blog";
import { SvgIcon } from "@/components/icon";
import { useDebounceEffect } from "ahooks";
import { message } from "antd";
import { Button, Select, Spin, Switch, Tooltip } from "antd";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

function Video() {
	const [loading, setLoading] = useState<boolean>(false);
	const [category, setCategory] = useState<number>(0);
	const [isAutoPlayNext, setIsAutoPlayNext] = useState<boolean>(true);
	const [voiceUrl, setVoiceUrl] = useState<string>("");

	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 0, label: "绿茶" },
		{ value: 1, label: "怼人" },
		{ value: 2, label: "御姐撒娇" },
	];

	/**
	 *  分类接口映射
	 */
	const categoryMap: Record<number, () => Promise<string>> = {
		0: BlogApi.getRandomGreenTeaVoice,
		1: BlogApi.getRandomDuiRenVoice,
		2: BlogApi.getRandomYujieVoice,
	};

	const getData = async () => {
		try {
			setLoading(true);
			const getVoice = categoryMap[category];

			if (!getVoice) {
				message.error("无效的分类");
				return;
			}
			const response = (await getVoice()) as any;

			if (response) {
				setVoiceUrl(response.audiopath);
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

				<Tooltip placement="top" title="点击刷新">
					<Button
						loading={loading}
						onClick={getData}
						icon={<SvgIcon icon="refresh" />}
					/>
				</Tooltip>

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
				{voiceUrl && (
					<ReactPlayer
						controls
						playing
						url={voiceUrl}
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
