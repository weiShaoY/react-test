import BlogApi from "@/api/modules/blog";
import { useEffect, useState } from "react";
import { message } from "antd";
import VideoJS from "video.js";

function GoldPrice() {
	const [videoUrl, setVideoUrl] = useState<string>("");

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const response = await BlogApi.getRandomGirlVideo(); // 假设返回 GoldPriceData[]
				console.log("%c Line:111 🎂 response", "color:#ed9ec7", response);
				setVideoUrl(response);
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
			22
			<VideoJS options={videoJsOptions} onReady={playerReady} />
		</div>
	);
}

export default GoldPrice;
