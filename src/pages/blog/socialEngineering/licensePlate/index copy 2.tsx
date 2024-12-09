import { BlogApi } from "@/api";
import { isValidPlateNumber } from "@/utils";
import { useRequest } from "ahooks";
import { Descriptions, Input, Spin } from "antd";
import { useEffect, useState } from "react";

const INITIAL_PLATE_NUMBER = "京A12345";

const typeMap: Record<string, string> = {
	"10": "民用",
	"20": "军用",
	"30": "使馆",
	"40": "民航",
	"50": "武警",
};

/**
 * 表示车牌信息的数据结构
 */
type PlateInfoType = {
	/**
	 * 省份
	 */
	province_name: string;
	/**
	 * 城市
	 */
	city: string;
	/**
	 * 组织
	 */
	organization: string;
	/**
	 * 类型
	 */
	type: string | number;
};

function Hok() {
	const [licensePlateNumber, setLicensePlateNumber] = useState("");

	const [error, setError] = useState<string>("");

	/**
	 *  请求车牌数据的封装
	 */
	const { data, loading, run } = useRequest<PlateInfoType, []>(
		async () => {
			return BlogApi.getLicensePlateNumberInfo(licensePlateNumber);
		},
		{
			manual: true, // 不自动执行，手动触发
			debounceWait: 300,
		},
	);

	const items = [
		{
			label: "省份",
			children: loading ? "加载中..." : data?.province_name || "无",
			span: 3,
		},
		{
			label: "城市",
			children: loading ? "加载中..." : data?.city || "无",
			span: 3,
		},
		{
			label: "机构名称",
			children: loading ? "加载中..." : data?.organization || "无",
			span: 3,
		},
		{
			label: "类型编码",
			children: loading ? (
				"加载中..."
			) : data?.type ? (
				<span>{typeMap[data.type]}</span>
			) : (
				"无"
			),
			span: 3,
		},
	];

	/**
	 * 输入变化的处理
	 */
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLicensePlateNumber(e.target.value);
	}

	/**
	 *  搜索
	 */
	function handleSearch() {
		if (!isValidPlateNumber(licensePlateNumber)) {
			setError("请输入正确的车牌号");
			return;
		}
		if (error) setError(""); // 清除已有错误
		setLicensePlateNumber(licensePlateNumber);
		run();
	}

	/**
	 * 清空输入框
	 */
	function handleClear() {
		setLicensePlateNumber("");
		setError("请输入车牌号");
	}

	/**
	 * 初始查询
	 */
	useEffect(() => {
		setLicensePlateNumber(INITIAL_PLATE_NUMBER);
		run(); // 初始化时使用默认车牌号
	}, [run]);

	return (
		<div className="p-4 h-full flex flex-col relative">
			{/* 数据展示 */}
			<div className="relative">
				<Descriptions
					className="w-full h-full"
					labelStyle={{ width: 160 }}
					bordered
					items={items}
					title={
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入车牌号"
							value={licensePlateNumber}
							onChange={handleInputChange}
							onPressEnter={handleSearch}
							onSearch={handleSearch}
							onClear={handleClear}
							enterButton="搜索"
							status={error ? "error" : ""}
						/>
					}
					extra={error && <div className="text-red mt-1">{error}</div>}
				/>
				{loading && (
					<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
						<Spin size="large" />
					</div>
				)}
			</div>
		</div>
	);
}

export default Hok;
