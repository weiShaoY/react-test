import { useEffect, useRef } from "react";
import type { VideoJsPlayer, VideoJsPlayerOptions } from "video.js"; // 类型导入
import videojs from "video.js"; // 保留运行时导入
import "video.js/dist/video-js.css";

function VideoJS({
	options,
	onReady,
}: {
	options: VideoJsPlayerOptions;
	onReady?: (player: VideoJsPlayer) => void;
}) {
	const videoRef = useRef<HTMLDivElement | null>(null);
	const playerRef = useRef<VideoJsPlayer | null>(null);

	useEffect(() => {
		if (!playerRef.current) {
			// 创建一个 Video.js 的 DOM 元素
			const videoElement = document.createElement("video-js");
			videoElement.classList.add("vjs-big-play-centered");

			if (videoRef.current) {
				videoRef.current.appendChild(videoElement);
			}

			// 初始化 Video.js 播放器
			const player = videojs(videoElement, options, () => {
				videojs.log("player is ready");
				if (onReady) {
					onReady(player);
				}
			});

			playerRef.current = player;
		} else {
			// 如果播放器已经存在，则更新配置
			const player = playerRef.current;
			player.autoplay(options.autoplay || false);
			player.src(options.sources || []);
		}
	}, [options, onReady]);

	useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, []);

	return (
		<div data-vjs-player>
			<div ref={videoRef} />
		</div>
	);
}

export default VideoJS;
