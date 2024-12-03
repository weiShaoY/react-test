import BlogApi from "@/api/modules/blog";
import { useEffect, useState } from "react";
import { Table, message } from "antd";
import type { TableProps } from "antd";

type GoldPriceData = {
	id: string; // 唯一标识符
	dir: string; // 商品目录名称
	title: string; // 商品标题
	price: string; // 当前价格
	changepercent: string; // 价格变动百分比
	maxprice: string; // 最高价格
	minprice: string; // 最低价格
	openingprice: string; // 开盘价格
	lastclosingprice: string; // 上一收盘价格
	date: string; // 数据日期，格式为 YYYY-MM-DD
};

/**
 * 定义表格列的配置
 */
const columns: TableProps<GoldPriceData>["columns"] = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		width: 80,
		align: "center",
		// 添加排序功能
	},
	{
		title: "商品目录",
		dataIndex: "dir",
		key: "dir",
		width: 120,
		align: "center",
	},
	{
		title: "商品名称",
		dataIndex: "title",
		key: "title",
		width: 150,
	},
	{
		title: "当前价格",
		dataIndex: "price",
		key: "price",
		width: 100,
		align: "right",
		// render: (value) => `${value} 元`, // 添加单位
	},
	{
		title: "涨跌幅",
		dataIndex: "changepercent",
		key: "changepercent",
		width: 100,
		align: "right",
		// render: (value) => (
		// 	<span style={{ color: Number(value) >= 0 ? "green" : "red" }}>
		// 		{value}%
		// 	</span>
		// ), // 根据正负值设置颜色
	},
	{
		title: "最高价",
		dataIndex: "maxprice",
		key: "maxprice",
		width: 100,
		align: "right",
	},
	{
		title: "最低价",
		dataIndex: "minprice",
		key: "minprice",
		width: 100,
		align: "right",
	},
	{
		title: "开盘价",
		dataIndex: "openingprice",
		key: "openingprice",
		width: 100,
		align: "right",
	},
	{
		title: "收盘价",
		dataIndex: "lastclosingprice",
		key: "lastclosingprice",
		width: 100,
		align: "right",
	},
	{
		title: "日期",
		dataIndex: "date",
		key: "date",
		width: 150,
		align: "center",
	},
];

function GoldPrice() {
	const [data, setData] = useState<GoldPriceData[]>([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const response = await BlogApi.getGoldPrice(); // 假设返回 GoldPriceData[]
				// 根据每一项的id排序 response
				response.sort(
					(a: GoldPriceData, b: GoldPriceData) =>
						Number.parseInt(a.id) - Number.parseInt(b.id),
				);
				setData(response);
			} catch (error) {
				message.error("获取数据失败，请稍后重试");
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<div className="p-2">
			<Table<GoldPriceData>
				columns={columns}
				dataSource={data}
				rowKey="id" // 设置唯一标识字段
				loading={loading}
				pagination={{ pageSize: 50 }}
				scroll={{ y: "calc(100vh - 350px)" }}
			/>
		</div>
	);
}

export default GoldPrice;
