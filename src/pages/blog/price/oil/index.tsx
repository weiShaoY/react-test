import { BlogApi } from "@/api";
import Card from "@/components/card";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 *  电影即将上映列表每一项
 */
type ItemType = {
	/**
	 *  省份
	 */
	province: string;

	/**
	 *  价格
	 */
	prices: {
		/**
		 *  92号
		 */
		92: string;

		/**
		 *  95号
		 */
		95: string;

		/**
		 *  98号
		 */
		98: string;

		/**
		 *  0号
		 */
		0: string;
	};
};

/**
 * 已上映电影列表的表格列
 */
const columns: TableProps<ItemType>["columns"] = [
	{
		title: "序号",
		key: "index",
		render: (_: any, __: any, index: number) => index + 1,
	},
	{
		title: "省份",
		dataIndex: "province",
		key: "province",
	},
	{
		title: "92号",
		dataIndex: ["prices", "92"],
		key: "92",
		render: (price: string) => <span>{price}</span>,
		sorter: (a: any, b: any) => a.prices["92"] - b.prices["92"],
	},
	{
		title: "95号",
		dataIndex: ["prices", "95"],
		key: "95",
		render: (price: string) => <span>{price}</span>,
		sorter: (a: any, b: any) => a.prices["95"] - b.prices["95"],
	},
	{
		title: "98号",
		dataIndex: ["prices", "98"],
		key: "98",
		render: (price: string) => <span>{price}</span>,
		sorter: (a: any, b: any) => a.prices["98"] - b.prices["98"],
	},
	{
		title: "0号",
		dataIndex: ["prices", "0"],
		key: "0",
		render: (price: string) => <span>{price}</span>,
		sorter: (a: any, b: any) => a.prices["0"] - b.prices["0"],
	},
];
function Oil() {
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState([]);

	/**
	 *  获取数据逻辑
	 */
	const getData = useCallback(async () => {
		try {
			setLoading(true);

			// 并行获取数据，提高性能
			const response = await BlogApi.getOilPrices();

			// 优先排序省份
			const priorityProvinces = ["湖南", "广东"];
			const sortedData = response.sort((a: ItemType, b: ItemType) => {
				const indexA = priorityProvinces.indexOf(a.province);
				const indexB = priorityProvinces.indexOf(b.province);

				// 逻辑修正
				if (indexA === -1 && indexB === -1) return 0; // 都不在优先级列表
				if (indexA === -1) return 1; // a 不在优先列表，排后
				if (indexB === -1) return -1; // b 不在优先列表，排后
				return indexA - indexB; // 按优先级列表排序
			});

			setData(sortedData);
		} catch (error) {
			toast.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<Card className="flex flex-col gap-5">
			<Table
				columns={columns}
				dataSource={data}
				rowKey="province"
				loading={loading}
				pagination={false}
				scroll={{ y: "calc(100vh - 240px)" }}
			/>
		</Card>
	);
}

export default Oil;
