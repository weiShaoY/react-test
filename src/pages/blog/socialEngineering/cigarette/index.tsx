import { BlogApi } from "@/api";
import { Input, Table, message } from "antd";
import { useState } from "react";

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
		if (!keyword.trim()) {
			setError("请输入香烟名称");
			return;
		}
		try {
			setLoading(true);

			const response = await BlogApi.getCigarettePrice(keyword);

			setData(response as any);
		} catch (error) {
			message.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}

	function handleInputChange(e: any) {
		setKeyword(e.target.value);
		if (error) {
			setError("");
		}
	}

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex  m-5 gap-5  items-center">
				<Input.Search
					className="!w-80"
					placeholder="请输入香烟名称"
					value={keyword}
					onChange={handleInputChange}
					onPressEnter={getData}
					onSearch={getData}
					loading={loading}
					enterButton="搜索"
					disabled={loading}
					status={error ? "error" : ""}
				/>

				{error && <span className="text-red ">{error}</span>}
			</div>

			<Table
				columns={columns}
				dataSource={data}
				rowKey="name"
				loading={loading}
				pagination={false}
				scroll={{ y: "78vh" }}
			/>
		</div>
	);
}

export default Cigarette;
