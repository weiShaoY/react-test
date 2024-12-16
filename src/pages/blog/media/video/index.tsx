import BlogApi from "@/api/modules/blog";
import { SvgIcon } from "@/components/icon";
import { useDebounceEffect } from "ahooks";
import { Button, Select, Switch, Tooltip } from "antd";
import { useRef, useState } from "react";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

import Card from "@/components/card";
import { copyImageToClipboard } from "@/utils";
import { toast } from "sonner";

function Video() {
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState(1);
	const [isAutoPlay, setIsAutoPlay] = useState(false);
	const [isAutoPlayNext, setIsAutoPlayNext] = useState(false);
	const [keyword, setKeyword] = useState("");

	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 1, label: "随机美少女视频" },
		{ value: 2, label: "随机返回一条小姐姐视频" },
	];

	/**
	 *  分类接口映射
	 */
	const categoryMap: Record<number, () => Promise<string>> = {
		1: BlogApi.getRandomGirlVideo,
		2: BlogApi.getRandomReturnOneGirlVideo,
	};

	async function getData() {
		try {
			setLoading(true);

			const fetchData = categoryMap[category];

			const response = await fetchData();

			if (response) {
				setKeyword(response);
			} else {
				throw new Error("未获取到视频资源");
			}
		} catch (error) {
			toast.error("获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}

	/**
	 *  获取数据
	 */
	function handleRefresh() {
		if (!isAutoPlay) {
			setIsAutoPlay(true);
		}
		getData();
	}

	// 使用防抖获取数据
	useDebounceEffect(
		() => {
			getData();
		},
		[category],
		{ wait: 500 },
	);

	/**
	 *  用来引用 video 容器
	 */
	const videoRef = useRef<HTMLDivElement>(null);

	if (videoRef.current && keyword) {
		const player = new Player({
			el: videoRef.current, // 使用 videoRef 作为元素

			url: keyword,

			height: "100%",

			width: "100%",
			/**
			 *  播放器初始显示语言
			 */
			lang: "zh",

			/**
			 *  自动播放
			 */
			autoplay: isAutoPlay,

			/**
			 *  自动静音自动播放
			 */
			autoplayMuted: true,

			/**
			 *  开启画面和控制栏分离模式
			 */
			marginControls: true,
			/**
			 *  截图配置
			 */
			screenShot: {
				saveImg: false, // 禁止截图后下载图片
				quality: 0.92,
			},
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
		 *  视频截图结束
		 */
		player.on(Player.Events.SCREEN_SHOT, (url) => {
			copyImageToClipboard(url);
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
		<Card className="flex flex-col gap-5">
			<div className="flex gap-5 flex-wrap w-full items-center">
				<Select
					className="w-52"
					showSearch
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
						onClick={handleRefresh}
						icon={<SvgIcon icon="refresh" />}
					/>
				</Tooltip>

				<Switch
					checkedChildren="自动播放下一个"
					unCheckedChildren="手动播放下一个"
					checked={isAutoPlayNext}
					onChange={setIsAutoPlayNext}
				/>
			</div>

			<div className="flex justify-center items-center  h-[calc(100vh-240px)] relative w-full">
				<div ref={videoRef} />
			</div>
		</Card>
	);
}

export default Video;
