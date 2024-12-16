import { BlogApi } from "@/api";
import Card from "@/components/card";
import { useThrottleFn } from "ahooks";
import { Input, Table } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const columns = [
	{
		title: "香烟",
		dataIndex: "name", // 数据字段名
		key: "name",
	},
	{
		title: "单盒参考价",
		dataIndex: "单盒参考价",
		key: "singleBoxPrice",
	},
	{
		title: "条盒参考价",
		dataIndex: "条盒参考价",
		key: "boxPrice",
	},
	{
		title: "条盒批发价",
		dataIndex: "条盒批发价",
		key: "wholesalePrice",
	},
	{
		title: "香烟类型",
		dataIndex: "香烟类型",
		key: "type",
	},
	{
		title: "焦油量",
		dataIndex: "焦油量",
		key: "tarAmount",
	},
	{
		title: "烟碱量",
		dataIndex: "烟碱量",
		key: "nicotineAmount",
	},
	{
		title: "包装形式",
		dataIndex: "包装形式",
		key: "packaging",
	},
	{
		title: "烟支规格",
		dataIndex: "烟支规格",
		key: "cigaretteSpecs",
	},
];

function Cigarette() {
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState([]);

	const [error, setError] = useState("");

	const [keyword, setKeyword] = useState("白沙");

	/**
	 *  获取数据逻辑
	 */
	async function getData() {
		try {
			if (!keyword) {
				throw new Error("请输入香烟名称");
			}

			setLoading(true);

			const response = await BlogApi.getCigarettePrice(keyword);

			setData(response as any);
		} catch (error) {
			toast.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message || "获取数据失败，请稍后重试");
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

	function handleInputChange(e: any) {
		setKeyword(e.target.value.trim());
		if (error) {
			setError("");
		}
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
					placeholder="请输入香烟名称"
					allowClear
					status={error ? "error" : ""}
					enterButton="搜索"
				/>

				<div className="flex items-center">
					{error && <span className="text-red ">{error}</span>}
				</div>
			</div>

			<Table
				columns={columns}
				dataSource={data}
				rowKey="name"
				loading={loading}
				pagination={false}
				scroll={{ y: "calc(100vh - 300px)" }}
			/>
		</Card>
	);
}

export default Cigarette;
