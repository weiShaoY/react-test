import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin, message } from "antd";
import { useState } from "react";
const { TextArea } = Input;

function LicensePlate() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	// const [keyword, setKeyword] = useState(
	// 	"https://tools.mgtv100.com/external/v1/weathers/query?city=深圳&extensions=all&output=JSON",
	// );

	const [keyword, setKeyword] = useState(
		"https://api.pearktrue.cn/api/goldprice/",
	);

	const [data, setData] = useState<any>({
		http: {
			code: 0,
			message: "",
		},
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
				<div className="h-[calc(100vh-340px)] ">
					<TextArea
						value={data.data}
						style={{ height: "100%", resize: "none" }}
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
			if (!keyword.trim()) throw new Error("请输入接口地址");

			setLoading(true);

			const response = await fetch(keyword.trim());

			setData((prevData: any) => ({
				...prevData,
				http: {
					code: response.status,
					message: response.statusText,
				},
			}));
			if (!response.ok) {
				throw new Error("网络请求失败");
			}

			const responseText = await response.text();

			setData((prevData: any) => ({
				...prevData,
				data: responseText,
			}));
		} catch (error: any) {
			message.error(error || "获取数据失败，请稍后重试");
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
		setKeyword(e.target.value);
		setError("");
	}

	/**
	 * 清空输入框
	 */
	function handleClear() {
		setKeyword("");

		setError("");
	}

	/**
	 *  搜索
	 */
	function handleInputSearch(info?: { source?: "input" | "clear" }) {
		if (info && info.source === "clear") {
			setData({
				http: {
					code: 0,
					message: "",
				},
				data: "",
			});
			handleClear();
			return;
		}

		throttledGetData();
	}

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex items-center m-5 gap-5 flex-wrap">
				<Input.Search
					className="w-full"
					loading={loading}
					disabled={loading}
					value={keyword.trim()}
					onChange={handleInputChange}
					onSearch={(_, __, info) => handleInputSearch(info)}
					onPressEnter={throttledGetData}
					placeholder="请输入车牌号"
					allowClear
					status={error ? "error" : ""}
					enterButton="测试"
				/>

				<div className="">
					{error && <span className="text-red ">{error}</span>}
				</div>
			</div>

			<div className=" relative">
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
		</div>
	);
}

export default LicensePlate;