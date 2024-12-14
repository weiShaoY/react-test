import BlogApi from "@/api/modules/blog";
import { SvgIcon } from "@/components/icon";
import { useDebounceEffect } from "ahooks";
import { message } from "antd";
import { Button, Select, Spin, Switch, Tooltip } from "antd";
import { useRef, useState } from "react";
import Player from "xgplayer";
import MusicPreset from "xgplayer-music";

import "xgplayer/dist/index.min.css";

import "xgplayer-music/dist/index.min.css";

function Voice() {
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState(0);
	const [isAutoPlay, setIsAutoPlay] = useState(false);

	const [isAutoPlayNext, setIsAutoPlayNext] = useState(false);
	const [keyword, setKeyword] = useState("");

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

			const fetchData = categoryMap[category];

			const response = (await fetchData()) as any;

			if (response) {
				setKeyword(response.audiopath);
			} else {
				message.error("未获取到视频资源");
			}
		} catch (error) {
			message.error("获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	};

	// 使用防抖获取数据
	useDebounceEffect(
		() => {
			getData();
		},
		[category],
		{ wait: 500 },
	);

	const voicePlayer = useRef<HTMLDivElement>(null);

	if (voicePlayer.current && keyword) {
		const player = new Player({
			el: voicePlayer.current,
			mediaType: "audio",
			url: keyword,

			/**
			 *  播放器初始显示语言
			 */
			lang: "zh",

			/**
			 *  自动播放
			 */
			autoplay: isAutoPlay,

			/**
			 *  开启画面和控制栏分离模式
			 */
			marginControls: true,
			/**
			 *  video扩展属性
			 */
			videoAttributes: {
				crossOrigin: "anonymous",
			},

			/**
			 *  播放器区域是否允许右键功能菜单
			 */
			enableContextmenu: true,
			/**
			 *  下载
			 */
			download: true,
			/**
			 *  动态背景高斯模糊渲染插件
			 */
			dynamicBg: {
				disable: false,
			},
			/**
			 *  控制栏播放下一个视频按钮插件
			 */
			playnext: {
				urlList: [keyword],
			},
			/**
			 *  播放器旋转控件
			 */
			rotate: {
				disable: false,
			},
		});

		/**
		 *  视频播放结束
		 */
		player.on(Player.Events.ENDED, () => {
			if (isAutoPlayNext) {
				if (!isAutoPlay) {
					setIsAutoPlay(true);
				}
				getData();
			}
		});
		/**
		 *  点击按钮播放下一个视频源的时候触发
		 */
		player.on(Player.Events.PLAYNEXT, async () => {
			if (!isAutoPlay) {
				setIsAutoPlay(true);
			}
			getData();
		});
	}

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex items-center m-5 gap-5">
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

			<div className="flex-1 flex justify-center items-center bg-gray-200 h-[80vh] relative">
				{<div ref={voicePlayer} className="w-full h-full" />}
			</div>
		</div>
	);
}

export default Voice;
