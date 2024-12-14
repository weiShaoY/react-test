import BlogApi from "@/api/modules/blog";
import { SvgIcon } from "@/components/icon";
import { useDebounceEffect } from "ahooks";
import { message, notification } from "antd";
import { Button, Select, Switch, Tooltip } from "antd";
import { useRef, useState } from "react";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

import { copyImageToClipboard } from "@/utils";

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

	const getData = async () => {
		try {
			setLoading(true);

			const fetchData = categoryMap[category];

			const response = await fetchData();

			if (response) {
				setKeyword(response);
			} else {
				message.error("未获取到视频资源");
			}
		} catch (error) {
			message.error("获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	};

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
			copyImageToClipboard(url)
				.then(() => {
					notification.success({
						message: "截图已复制到剪贴板",
					});
				})
				.catch(() => {
					notification.error({
						message: "截图失败",
					});
				});
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

			<div className="flex-1 flex justify-center items-center bg-gray-200 h-[80vh] relative">
				{<div ref={videoRef} />}
			</div>
		</div>
	);
}

export default Video;
