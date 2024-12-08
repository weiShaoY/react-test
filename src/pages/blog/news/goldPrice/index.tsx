import { BlogApi } from "@/api";
import { Table, Tabs, message } from "antd";
import type { TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";

/**
 *  品牌黄金价格每一项
 */
type BrandGoldPriceItemType = {
	/**
	 *  品牌名称
	 */
	brand: string;

	/**
	 *  黄金价格
	 */
	goldPrice: string;

	/**
	 *  铂金价格
	 */
	ptPrice: string;

	/**
	 *  控制显示标志
	 */
	showControl: number;
};

/**
 *  品牌黄金价格表格列
 */
const brandGoldPriceColumns: TableProps<BrandGoldPriceItemType>["columns"] = [
	{
		title: "品牌",
		dataIndex: "brand",
		key: "brand",
		align: "center",
	},
	{
		title: "黄金价格",
		dataIndex: "goldPrice",
		key: "goldPrice",
		align: "center",
		sorter: (a, b) => Number(a.goldPrice) - Number(b.goldPrice),
	},
	{
		title: "铂金价格",
		dataIndex: "ptPrice",
		key: "ptPrice",
		align: "center",
		sorter: (a, b) => Number(a.ptPrice) - Number(b.ptPrice),
	},
];

/**
 *  大盘黄金价格每一项
 */
type MarketGoldPriceItemType = {
	/**
	 *  唯一标识符
	 */
	id: string;

	/**
	 *   商品目录名称
	 */
	dir: string;

	/**
	 *   商品标题
	 */
	title: string;

	/**
	 *   当前价格
	 */
	price: string;

	/**
	 *   价格变动百分比
	 */
	changepercent: string;

	/**
	 *   最高价格
	 */
	maxprice: string;

	/**
	 *   最低价格
	 */
	minprice: string;

	/**
	 *   开盘价格
	 */
	openingprice: string;

	/**
	 *   上一收盘价格
	 */
	lastclosingprice: string;
	/**
	 *   数据日期，格式为 YYYY-MM-DD
	 */
	date: string;
};

/**
 *  大盘黄金价格表格列
 */
const marketGoldPriceColumns: TableProps<MarketGoldPriceItemType>["columns"] = [
	{ title: "ID", dataIndex: "id", key: "id", width: 80, align: "center" },
	{
		title: "商品目录",
		dataIndex: "dir",
		key: "dir",
		width: 120,
		align: "center",
	},
	{ title: "商品名称", dataIndex: "title", key: "title", width: 150 },
	{
		title: "当前价格",
		dataIndex: "price",
		key: "price",
		width: 100,
		align: "right",
		sorter: (a, b) => Number(a.price) - Number(b.price),
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
		// ),
		sorter: (a, b) => Number(a.changepercent) - Number(b.changepercent),
	},
	{
		title: "最高价",
		dataIndex: "maxprice",
		key: "maxprice",
		width: 100,
		align: "right",
		sorter: (a, b) => Number(a.maxprice) - Number(b.maxprice),
	},
	{
		title: "最低价",
		dataIndex: "minprice",
		key: "minprice",
		width: 100,
		align: "right",
		sorter: (a, b) => Number(a.minprice) - Number(b.minprice),
	},
	{
		title: "开盘价",
		dataIndex: "openingprice",
		key: "openingprice",
		width: 100,
		align: "right",
		sorter: (a, b) => Number(a.openingprice) - Number(b.openingprice),
	},
	{
		title: "收盘价",
		dataIndex: "lastclosingprice",
		key: "lastclosingprice",
		width: 100,
		align: "right",
		sorter: (a, b) => Number(a.lastclosingprice) - Number(b.lastclosingprice),
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
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		marketGoldPriceData: [] as MarketGoldPriceItemType[],
		brandGoldPriceData: [] as BrandGoldPriceItemType[],
	});

	/**
	 *  获取数据逻辑
	 */
	const getData = useCallback(async () => {
		try {
			setLoading(true);

			const [marketGoldPrice, brandGoldPrice] = await Promise.all([
				BlogApi.getMarketGoldPrice(),
				BlogApi.getBrandGoldPrice(),
			]);

			// 按 ID 排序
			marketGoldPrice.sort(
				(a: MarketGoldPriceItemType, b: MarketGoldPriceItemType) =>
					Number.parseInt(a.id) - Number.parseInt(b.id),
			);

			setData({
				marketGoldPriceData: marketGoldPrice,
				brandGoldPriceData: brandGoldPrice,
			});
		} catch (error) {
			message.error("获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	// 渲染表格
	const renderTable = <T,>(
		columns: TableProps<T>["columns"],
		data: T[],
		rowKey: string | ((record: T) => string),
	) => (
		<Table<T>
			columns={columns}
			dataSource={data}
			rowKey={rowKey}
			loading={loading}
			pagination={{ pageSize: 50 }}
			scroll={{ y: "calc(100vh - 300px)" }}
		/>
	);

	return (
		<Tabs
			defaultActiveKey="1"
			items={[
				{
					key: "1",
					label: "品牌价格",
					children: renderTable(
						brandGoldPriceColumns,
						data.brandGoldPriceData,
						"brand",
					),
				},
				{
					key: "2",
					label: "大盘价格",
					children: renderTable(
						marketGoldPriceColumns,
						data.marketGoldPriceData,
						(record) => `${record.id}-${record.date}`,
					),
				},
			]}
		/>
	);
}

export default GoldPrice;
