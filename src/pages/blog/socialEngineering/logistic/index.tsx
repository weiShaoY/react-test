import { BlogApi } from "@/api";
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

	//  京A12345
	const [keyword, setKeyword] = useState("吃饭了吗");

	const [data, setData] = useState<DataType>([]);

	/**
	 * 检查并获取车牌数据
	 */
	async function getData() {
		try {
			if (!keyword.trim()) throw new Error("请输入问题");

			setLoading(true);

			const res = await BlogApi.getLoveSpeech(keyword, 1);

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
	 * 清空输入框
	 */
	function handleClear() {
		setKeyword("");

		setError("");

		setData([]);
	}

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex  m-5 gap-5  items-center">
				<Input.Search
					className="!w-80"
					allowClear
					placeholder="请输入问题"
					value={keyword}
					onChange={handleInputChange}
					onSearch={throttledGetData}
					onClear={handleClear}
					loading={loading}
					enterButton="搜索"
					disabled={loading}
					status={error ? "error" : ""}
				/>

				<div className="flex items-center">
					{error && <span className="text-red ">{error}</span>}
				</div>
			</div>

			<div className="relative">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				)}

				<List
					bordered
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={<span className="font-bold text-lg">{item.title}</span>}
								description={item.content.split("\\r\\n").map((line) => (
									<span key={line} className="text-lg">
										{line}
										<br />
									</span>
								))}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
}

export default Hok;
