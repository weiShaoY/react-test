import { useEffect, useState, useCallback } from "react";
import { Table, message, Tabs } from "antd";
import type { TableProps } from "antd";
import { BlogApi } from "@/api";

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
	{ title: "品牌", dataIndex: "brand", key: "brand", width: 100 },
	{ title: "黄金价格", dataIndex: "goldPrice", key: "goldPrice", width: 100 },
	{ title: "铂金价格", dataIndex: "ptPrice", key: "ptPrice", width: 100 },
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
	const [state, setState] = useState({
		marketGoldPriceData: [] as MarketGoldPriceItemType[],
		brandGoldPriceData: [] as BrandGoldPriceItemType[],
		loading: false,
	});

	/**
	 *  获取数据逻辑
	 */
	const getData = useCallback(async () => {
		setState((prev) => ({ ...prev, loading: true }));
		try {
			const [marketGoldPrice, brandGoldPrice] = await Promise.all([
				BlogApi.getMarketGoldPrice(),
				BlogApi.getBrandGoldPrice(),
			]);

			// 按 ID 排序
			marketGoldPrice.sort(
				(a: MarketGoldPriceItemType, b: MarketGoldPriceItemType) =>
					Number.parseInt(a.id) - Number.parseInt(b.id),
			);

			setState({
				marketGoldPriceData: marketGoldPrice,
				brandGoldPriceData: brandGoldPrice,
				loading: false,
			});
		} catch (error) {
			message.error("获取数据失败，请稍后重试");
			setState((prev) => ({ ...prev, loading: false }));
		}
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	// 渲染表格
	const renderTable = <T,>(
		columns: TableProps<T>["columns"],
		data: T[],
		rowKey: string,
	) => (
		<Table<T>
			columns={columns}
			dataSource={data}
			rowKey={rowKey}
			loading={state.loading}
			pagination={{ pageSize: 50 }}
			scroll={{ y: "calc(100vh - 350px)" }}
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
						state.brandGoldPriceData,
						"brand",
					),
				},
				{
					key: "2",
					label: "大盘价格",
					children: renderTable(
						marketGoldPriceColumns,
						state.marketGoldPriceData,
						"id",
					),
				},
			]}
		/>
	);
}

export default GoldPrice;
