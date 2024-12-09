import { BlogApi } from "@/api";
import { isValidPlateNumber } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const INITIAL_PLATE_NUMBER = "京A12345";

const typeMap: Record<string, string> = {
	"10": "民用",
	"20": "军用",
	"30": "使馆",
	"40": "民航",
	"50": "武警",
};

/**
 *  表示车牌信息的数据结构
 */
type PlateInfoType = {
	/**
	 *  省份
	 */
	province_name: string;
	/**
	 *  城市
	 */
	city: string;

	/**
	 *  组织
	 */
	organization: string;

	/**
	 *  类型
	 */
	type: string | number;
};

function Hok() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	//  京A12345
	const [licensePlateNumber, setLicensePlateNumber] = useState("京A12345");

	const [data, setData] = useState<PlateInfoType>({
		province_name: "",
		city: "",
		organization: "",
		type: "",
	});

	const items = [
		{
			label: "省份",
			children: data.province_name || "无",
			span: 3,
		},
		{
			label: "城市",
			children: data.city || "无",
			span: 3,
		},
		{
			label: "机构名称",
			children: data.organization || "无",
			span: 3,
		},
		{
			label: "类型编码",
			children: data.type ? <span>{typeMap[data.type]}</span> : "无",
			span: 3,
		},
	];

	/**
	 * 检查并获取车牌数据
	 */
	const getData = useCallback(async (plateNumber: string) => {
		try {
			if (!plateNumber.trim()) throw new Error("请输入车牌号");

			if (!isValidPlateNumber(plateNumber))
				throw new Error("请输入有效的车牌号");

			setLoading(true);

			const res = await BlogApi.getLicensePlateNumberInfo(plateNumber);

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

		setData({
			province_name: "",
			city: "",
			organization: "",
			type: "",
		});
	}

	useEffect(() => {
		getData(INITIAL_PLATE_NUMBER);
	}, [getData]);
	return (
		<div className="p-4 h-full flex flex-col relative">
			{/* 数据展示 */}
			{loading ? (
				<Spin
					size="large"
					className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2
				-translate-y-1/2"
				/>
			) : (
				<Descriptions
					className="w-full h-full"
					labelStyle={{
						width: 160,
					}}
					bordered
					items={items}
					title={
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入车牌号"
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
					}
					extra={error && <div className="text-red mt-1">{error}</div>}
				/>
			)}
		</div>
	);
}

export default Hok;
