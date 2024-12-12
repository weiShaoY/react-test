import { BlogApi } from "@/api";
import { useThrottleFn } from "ahooks";
import { Input, List, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const INITIALIZATION = "https://item.m.jd.com/product/34538495063.html";

type DataType = {
	title: string;
	content: string;
}[];

function Hok() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	//  京A12345
	const [licensePlateNumber, setLicensePlateNumber] = useState(INITIALIZATION);

	const [data, setData] = useState<DataType>([]);

	/**
	 * 检查并获取车牌数据
	 */
	const getData = useCallback(async (url: string) => {
		try {
			if (!url.trim()) throw new Error("请输入商品链接");

			setLoading(true);

			const res = await BlogApi.getPriceHistory(url);

			setData(res);
		} catch (error: any) {
			message.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

	/**
	 *  使用 ahooks 的节流
	 */
	const { run: throttledGetData } = useThrottleFn(
		() => {
			getData(licensePlateNumber.replace(/\s+/g, ""));
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
		setLicensePlateNumber(e.target.value);
		setError("");
	}

	/**
	 * 清空输入框
	 */
	function handleClear() {
		setLicensePlateNumber("");

		setError("");

		setData([]);
	}

	useEffect(() => {
		getData(INITIALIZATION);
	}, [getData]);
	return (
		<div className="p-4  flex flex-col relative">
			{/* <List
				bordered
				header={
					<div className="w-full items-center justify-between flex">
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入商品链接"
							value={licensePlateNumber}
							onChange={handleInputChange}
							onPressEnter={throttledGetData}
							onSearch={throttledGetData}
							onClear={handleClear}
							loading={loading}
							enterButton="搜索"
							disabled={loading}
							status={error ? "error" : ""}
						/>
						{error && <span className="text-red ">{error}</span>}
					</div>
				}
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
			/> */}

			{/* 数据展示 */}
			{loading && (
				<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
					<Spin size="large" />
				</div>
			)}
		</div>
	);
}

export default Hok;
