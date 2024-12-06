import BlogApi from "@/api/modules/blog";
import { useEffect, useState } from "react";
import { message } from "antd";
import VideoJS from "./videoJs";

function Girl() {
	const [videoUrl, setVideoUrl] = useState<string>(""); // 状态存储视频URL
	const [loading, setLoading] = useState(false);

	// 视频播放器配置选项
	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: videoUrl, // 绑定到状态
				type: "video/mp4",
			},
		],
	};

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const response = await BlogApi.getRandomGirlVideo(); // 假设返回视频URL
				console.log("%c Line:111 🎂 response", "color:#ed9ec7", response);
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
		fetchData();
	}, []);

	return (
		<div className="p-2">
			{loading ? <p>视频加载中...</p> : <VideoJS options={videoJsOptions} />}
		</div>
	);
}

export default Girl;
