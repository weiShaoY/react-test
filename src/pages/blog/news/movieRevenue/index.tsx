import BlogApi from "@/api/modules/blog";
import { useEffect, useState } from "react";
import { Table, message } from "antd";
import type { TableProps } from "antd";


function GoldPrice() {
	const [data, setData] = useState<GoldPriceData[]>([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const response = await BlogApi.getMovieRevenue(); // 假设返回 GoldPriceData[]
				console.log("%c Line:17 🥛 response", "color:#3f7cff", response);

				setData(response);
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

			1
		</div>
	);
}

export default GoldPrice;
