import { BlogApi } from "@/api";
import Card from "@/components/card";
import { isValidPlateNumber } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin } from "antd";
import { useState } from "react";
import { toast } from "sonner";

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

function LicensePlate() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	//  京A12345
	const [keyword, setKeyword] = useState("京A12345");

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
	async function getData() {
		try {
			if (!keyword) {
				throw new Error("请输入车牌号");
			}

			if (!isValidPlateNumber(keyword)) throw new Error("请输入有效的车牌号");

			setLoading(true);

			const response = await BlogApi.getLicensePlateNumberInfo(keyword);

			setData(response);
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

			setData({
				province_name: "",
				city: "",
				organization: "",
				type: "",
			});
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
					placeholder="请输入车牌号"
					allowClear
					status={error ? "error" : ""}
					enterButton="搜索"
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
