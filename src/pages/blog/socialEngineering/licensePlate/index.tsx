import { BlogApi } from "@/api";
import { isValidPlateNumber } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const INITIALIZATION = "京A12345";

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
	const [licensePlateNumber, setLicensePlateNumber] = useState(INITIALIZATION);

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
		getData(INITIALIZATION);
	}, [getData]);

	return (
		<div className="p-4  flex flex-col relative">
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
				extra={error && <span className="text-red ">{error}</span>}
			/>

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
