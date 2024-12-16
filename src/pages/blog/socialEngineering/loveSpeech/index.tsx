import { BlogApi } from "@/api";
import Card from "@/components/card";
import { useThrottleFn } from "ahooks";
import { Input, List, Spin } from "antd";
import { useState } from "react";
import { toast } from "sonner";

type DataType = {
	title: string;
	content: string;
}[];

function Hok() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [keyword, setKeyword] = useState("在吗");

	const [data, setData] = useState<DataType>([]);

	/**
	 * 检查并获取车牌数据
	 */
	async function getData() {
		try {
			if (!keyword) {
				throw new Error("请输入问题");
			}

			setLoading(true);

			const res = await BlogApi.getLoveSpeech(keyword, 1);

			// 给res数组的每一项都添加一个key
			for (const item of res) {
				item.key = Math.random();
			}

			setData(res);
		} catch (error: any) {
			toast.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	/**
	 *  使用 ahooks 的节流
	 */
	const { run: throttledGetData } = useThrottleFn(
		() => {
			getData();
		},
		{
			wait: 1000,
			leading: false,
		},
	);

	/**
	 * 输入变化的处理
	 */
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setKeyword(e.target.value.trim());
		setError("");
	}

	/**
	 *  搜索
	 */
	function handleInputSearch(info?: { source?: "input" | "clear" }) {
		if (info && info.source === "clear") {
			setKeyword("");

			setError("");

			setData([]);

			return;
		}

		throttledGetData();
	}

	return (
		<Card className="flex flex-col gap-5">
			<div className="flex gap-5 flex-wrap w-full items-center">
				<Input.Search
					className="!w-80"
					loading={loading}
					disabled={loading}
					value={keyword}
					onChange={handleInputChange}
					onSearch={(_, __, info) => handleInputSearch(info)}
					placeholder="请输入问题"
					allowClear
					status={error ? "error" : ""}
					enterButton="搜索"
				/>

				<div className="flex items-center">
					{error && <span className="text-red ">{error}</span>}
				</div>
			</div>

			<div className="relative w-full">
				{/* 数据展示 */}
				{loading && (
					<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
						<Spin size="large" />
					</div>
				)}

				<List
					bordered
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={<span className="font-bold text-lg">{item.title}</span>}
								description={item.content.split("\\r\\n").map((line) => (
									<span key={Math.random()} className="text-lg">
										{line}
										<br />
									</span>
								))}
							/>
						</List.Item>
					)}
					className="h-[calc(100vh-240px)] overflow-y-auto"
				/>
			</div>
		</Card>
	);
}

export default Hok;
