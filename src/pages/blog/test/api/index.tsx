import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin } from "antd";
import { useState } from "react";
const { TextArea } = Input;
import Card from "@/components/card";
import { toast } from "sonner";

function LicensePlate() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	// const [keyword, setKeyword] = useState(
	// 	"https://tools.mgtv100.com/external/v1/weathers/query?city=深圳&extensions=all&output=JSON",
	// );

	const [keyword, setKeyword] = useState(
		"https://api.pearktrue.cn/api/goldprice/",
	);

	const [data, setData] = useState<{
		http: { code: number; message: string };
		data: string;
	}>({
		http: { code: 0, message: "" },
		data: "",
	});

	const items = [
		{
			label: "Http响应码",
			children: (
				<span
					className={`${
						data.http.code === 200
							? "text-green"
							: data.http.code > 0
								? "text-red"
								: ""
					} text-xl font-bold`}
				>
					{data.http.code ? data.http.code : ""}
				</span>
			),
			span: 1,
		},
		{
			label: "Http响应信息",
			children: (
				<span
					className={`${
						data.http.message === "OK"
							? "text-green"
							: data.http.code > 0
								? "text-red"
								: ""
					} text-xl font-bold`}
				>
					{data.http.message}
				</span>
			),
			span: 2,
		},

		{
			label: "接口数据",
			children: (
				<div className="h-[calc(100vh-360px)] ">
					<TextArea
						value={data.data}
						style={{ resize: "none", height: "100%" }}
					/>
				</div>
			),
			span: 3,
		},
	];
	/**
	 * 检查并获取车牌数据
	 */
	async function getData() {
		try {
			if (!keyword) {
				throw new Error("请输入接口地址");
			}

			setLoading(true);

			const response = await fetch(keyword);

			if (!response.ok) {
				throw new Error(
					`网络请求失败: ${response.status} ${response.statusText}`,
				);
			}

			const responseText = await response.text();

			setData({
				http: {
					code: response.status,
					message: response.statusText,
				},
				data: responseText || "无返回数据",
			});
		} catch (error: any) {
			toast.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message || "未知错误");
			setData({
				http: {
					code: 0,
					message: "",
				},
				data: "",
			});
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

			setData({
				http: {
					code: 0,
					message: "",
				},
				data: "",
			});
			return;
		}

		throttledGetData();
	}

	return (
		<Card className="flex flex-col gap-5">
			<div className="flex gap-5 flex-wrap w-full items-center">
				<Input.Search
					className="w-full"
					loading={loading}
					disabled={loading}
					value={keyword}
					onChange={handleInputChange}
					onSearch={(_, __, info) => handleInputSearch(info)}
					placeholder="请输入接口地址"
					allowClear
					status={error ? "error" : ""}
					enterButton="测试"
				/>

				<div className="flex items-center">
					{error && <span className="text-red ">{error}</span>}
				</div>
			</div>

			<div className="relative w-full">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				)}
				<Descriptions
					labelStyle={{
						width: 160,
					}}
					bordered
					items={items}
				/>
			</div>
		</Card>
	);
}

export default LicensePlate;
