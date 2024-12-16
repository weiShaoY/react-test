import { BlogApi } from "@/api";
import Card from "@/components/card";
import { Table, Tabs } from "antd";
import type { TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 *  分类
 */
enum Category {
	/**
	 * 国内十大金店
	 */
	DomesticTopGoldStores = "国内十大金店",

	/**
	 * 国内黄金
	 */
	DomesticGold = "国内黄金",

	/**
	 * 国际黄金
	 */
	InternationalGold = "国际黄金",

	/**
	 * 大盘黄金
	 */
	MarketGold = "大盘黄金",
}

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

type ColumnsObjType = {
	[Category.DomesticTopGoldStores]: TableProps<any>["columns"];

	[Category.DomesticGold]: TableProps<any>["columns"];

	[Category.InternationalGold]: TableProps<any>["columns"];

	[Category.MarketGold]: TableProps<MarketGoldPriceItemType>["columns"];
};

const columnsObj: ColumnsObjType = {
	[Category.DomesticTopGoldStores]: [
		{
			title: "品牌",
			dataIndex: "品牌",
			key: "品牌",
			align: "center",
		},
		{
			title: "黄金价格",
			dataIndex: "黄金价格",
			key: "黄金价格",
			align: "center",
		},
		{
			title: "铂金价格",
			dataIndex: "铂金价格",
			key: "铂金价格",
			align: "center",
		},
		{
			title: "金条价格",
			dataIndex: "金条价格",
			key: "金条价格",
			align: "center",
		},
		{
			title: "单位",
			dataIndex: "单位",
			key: "单位",
			align: "center",
		},
		{
			title: "报价时间",
			dataIndex: "报价时间",
			key: "报价时间",
			align: "center",
		},
	],

	[Category.DomesticGold]: [
		{
			title: "品种",
			dataIndex: "品种",
			key: "品种",
			align: "center",
		},
		{
			title: "最新价",
			dataIndex: "最新价",
			key: "最新价",
			align: "center",
		},
		{
			title: "最低价",
			dataIndex: "最低价",
			key: "最低价",
			align: "center",
		},
		{
			title: "最高价",
			dataIndex: "最高价",
			key: "最高价",
			align: "center",
		},
		{
			title: "涨跌",
			dataIndex: "涨跌",
			key: "涨跌",
			align: "center",
		},
		{
			title: "幅度",
			dataIndex: "幅度",
			key: "幅度",
			align: "center",
		},
		{
			title: "报价时间",
			dataIndex: "报价时间",
			key: "报价时间",
			align: "center",
		},
	],

	[Category.InternationalGold]: [
		{
			title: "品种",
			dataIndex: "品种",
			key: "品种",
			align: "center",
		},
		{
			title: "最新价",
			dataIndex: "最新价",
			key: "最新价",
			align: "center",
		},
		{
			title: "最低价",
			dataIndex: "最低价",
			key: "最低价",
			align: "center",
		},
		{
			title: "最高价",
			dataIndex: "最高价",
			key: "最高价",
			align: "center",
		},
		{
			title: "涨跌",
			dataIndex: "涨跌",
			key: "涨跌",
			align: "center",
		},
		{
			title: "幅度",
			dataIndex: "幅度",
			key: "幅度",
			align: "center",
		},
		{
			title: "报价时间",
			dataIndex: "报价时间",
			key: "报价时间",
			align: "center",
		},
	],

	[Category.MarketGold]: [
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
	],
};

function GoldPrice() {
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		[Category.DomesticTopGoldStores]: [],
		[Category.DomesticGold]: [],
		[Category.InternationalGold]: [],
		[Category.MarketGold]: [],
	});

	/**
	 *  获取数据逻辑
	 */
	const getData = useCallback(async () => {
		try {
			setLoading(true);

			const [realTimeGoldPrice, marketGoldPrice] = await Promise.all([
				BlogApi.getRealTimeGoldPrice(),

				BlogApi.getMarketGoldPrice(),
			]);

			setData({
				[Category.DomesticTopGoldStores]:
					realTimeGoldPrice[Category.DomesticTopGoldStores],

				[Category.DomesticGold]: realTimeGoldPrice[Category.DomesticGold],

				[Category.InternationalGold]:
					realTimeGoldPrice[Category.InternationalGold],

				[Category.MarketGold]: marketGoldPrice,
			});
		} catch (error) {
			toast.error("获取数据失败，请稍后重试");
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
		<Card className="flex flex-col ">
			<Table<T>
				columns={columns}
				dataSource={data}
				rowKey={rowKey}
				loading={loading}
				pagination={false}
				scroll={{ y: "calc(100vh - 295px)" }}
			/>
		</Card>
	);

	return (
		<Tabs
			defaultActiveKey="1"
			items={[
				{
					key: "1",
					label: "国内十大金店",
					children: renderTable(
						columnsObj[Category.DomesticTopGoldStores],
						data[Category.DomesticTopGoldStores],
						"品牌",
					),
				},
				{
					key: "2",
					label: "国内黄金",
					children: renderTable(
						columnsObj[Category.DomesticGold],
						data[Category.DomesticGold],
						"品种",
					),
				},
				{
					key: "3",
					label: "国际黄金",
					children: renderTable(
						columnsObj[Category.InternationalGold],
						data[Category.InternationalGold],
						"品种",
					),
				},
				{
					key: "4",
					label: "大盘黄金",
					children: renderTable(
						columnsObj[Category.MarketGold],
						data[Category.MarketGold],
						"品种",
					),
				},
			]}
		/>
	);
}

export default GoldPrice;
