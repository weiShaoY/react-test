import { BlogApi } from "@/api";
import Card from "@/components/card";
import { Image, Spin, Table, Tabs } from "antd";
import type { TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 *  电影即将上映列表每一项
 */
type ComingSoonMovieItemType = {
	/**
	 *  电影唯一标识符
	 */
	id: number;

	/**
	 *  是否有促销标签
	 */
	haspromotionTag: boolean;

	/**
	 *  电影海报图片地址
	 */
	img: string;

	/**
	 *  电影版本描述
	 */
	version: string;

	/**
	 *  电影名称
	 */
	nm: string;

	/**
	 *  是否为点映状态
	 */
	preShow: boolean;

	/**
	 *  电影评分
	 */
	sc: number;

	/**
	 *  是否已在全球范围上映
	 */
	globalReleased: boolean;

	/**
	 *  用户期待值
	 */
	wish: number;

	/**
	 *  主演列表，多个演员名称以逗号分隔
	 */
	star: string;

	/**
	 *  上映日期，格式为 YYYY-MM-DD
	 */
	rt: string;

	/**
	 *  上映信息
	 */
	showInfo: string;

	/**
	 *  上映状态，数值为状态枚举
	 */
	showst: number;

	/**
	 *  期待状态，数值为状态枚举
	 */
	wishst: number;

	/**
	 *  上映标题，如 "12月6日 周五"
	 */
	comingTitle: string;

	/**
	 *  上映状态按钮信息
	 */
	showStateButton: {
		/**
		 *  按钮颜色
		 */
		color: string;

		/**
		 *  按钮内容文字
		 */
		content: string;

		/**
		 *  是否仅点映显示
		 */
		onlyPreShow: boolean;

		/**
		 *  按钮阴影颜色
		 */
		shadowColor: string;
	};
};

/**
 *  即将上映电影表格列
 */
const comingSoonMovieColumns: TableProps<ComingSoonMovieItemType>["columns"] = [
	{ title: "ID", dataIndex: "id", key: "id", width: 80, align: "center" },
	{
		title: "海报", // 列标题
		dataIndex: "img", // 数据字段名
		key: "img", // 唯一标识符
		render: (imgUrl) => (
			<Image
				src={imgUrl}
				alt="电影海报"
				width={80}
				placeholder={
					<Spin
						size="small"
						className="w-full h-full flex items-center justify-center"
					/>
				}
			/>
		),
	},
	{
		title: "电影名称", // 列标题
		dataIndex: "nm", // 数据字段名
		key: "nm", // 唯一标识符
		render: (text) => <strong className="font-bold text-xl">{text}</strong>,
	},
	{
		title: "上映日期",
		dataIndex: "rt",
		key: "rt",
		sorter: (a, b) => new Date(a.rt).getTime() - new Date(b.rt).getTime(), // 按日期排序
	},
	{
		title: "主演",
		dataIndex: "star",
		key: "star",
		render: (text: string | undefined | null) => {
			// 如果 `text` 不存在，返回空字符串
			if (!text) return "";
			// 如果 `text` 存在，则进行分隔符替换
			return text.split(",").join(" / ");
		},
	},
	{
		title: "期待值",
		dataIndex: "wish",
		key: "wish",
		sorter: (a, b) => a.wish - b.wish, // 按期待值排序
	},
	{
		title: "评分",
		dataIndex: "sc",
		key: "sc",
		render: (score) => (score > 0 ? score.toFixed(1) : "暂无评分"), // 显示评分或暂无评分
	},
];

/**
 * 已上映电影列表每一项
 */
type HotTheaterMovieItemType = {
	/**
	 * 电影唯一标识符
	 */
	id: number;

	/**
	 * 是否有促销标签
	 */
	haspromotionTag: boolean;

	/**
	 * 电影海报图片地址
	 */
	img: string;

	/**
	 * 电影版本描述
	 */
	version: string;

	/**
	 * 电影名称
	 */
	nm: string;

	/**
	 * 是否为点映状态
	 */
	preShow: boolean;

	/**
	 * 电影评分
	 */
	sc: number;

	/**
	 * 是否已在全球范围上映
	 */
	globalReleased: boolean;

	/**
	 * 用户期待值
	 */
	wish: number;

	/**
	 * 主演列表，多个演员名称以逗号分隔
	 */
	star: string;

	/**
	 * 上映日期，格式为 YYYY-MM-DD
	 */
	rt: string;

	/**
	 * 今日上映信息
	 */
	showInfo: string;

	/**
	 * 上映状态，数值为状态枚举
	 */
	showst: number;

	/**
	 * 期待状态，数值为状态枚举
	 */
	wishst: number;

	/**
	 * 上映标题，如 "11月30日 周六"
	 */
	comingTitle: string;
};
/**
 * 已上映电影列表的表格列
 */
const hotTheaterMovieColumns: TableProps<HotTheaterMovieItemType>["columns"] = [
	{
		title: "海报", // 列标题
		dataIndex: "img", // 数据字段名
		key: "img", // 唯一标识符
		render: (imgUrl) => {
			// 单独为每张图片的加载状态提供控制

			return (
				<Image
					src={imgUrl}
					alt="电影海报"
					width={80}
					placeholder={
						<Spin
							size="small"
							className="w-full h-full flex items-center justify-center"
						/>
					}
				/>
			);
		},
	},
	{
		title: "电影名称", // 列标题
		dataIndex: "nm", // 数据字段名
		key: "nm", // 唯一标识符
		render: (text) => <strong className="font-bold text-xl">{text}</strong>,
	},
	{
		title: "上映日期",
		dataIndex: "rt",
		key: "rt",
		sorter: (a, b) => new Date(a.rt).getTime() - new Date(b.rt).getTime(), // 按日期排序
	},
	{
		title: "主演",
		dataIndex: "star",
		key: "star",
		render: (text: string | undefined | null) => {
			// 如果 `text` 不存在，返回空字符串
			if (!text) return "";
			// 如果 `text` 存在，则进行分隔符替换
			return text.split(",").join(" / ");
		},
	},
	{
		title: "评分",
		dataIndex: "sc",
		key: "sc",
		render: (score) => (score > 0 ? score.toFixed(1) : "暂无评分"), // 显示评分或暂无评分
	},
	{
		title: "今日放映信息",
		dataIndex: "showInfo",
		key: "showInfo",
	},
	{
		title: "期待值",
		dataIndex: "wish",
		key: "wish",
		sorter: (a, b) => a.wish - b.wish, // 按期待值排序
	},
	{
		title: "操作",
		key: "action",
	},
];

function Movie() {
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		comingSoonMovieData: [] as ComingSoonMovieItemType[],
		hotTheaterMovieData: [] as HotTheaterMovieItemType[],
	});

	/**
	 *  获取数据逻辑
	 */
	const getData = useCallback(async () => {
		try {
			setLoading(true);

			// 并行获取数据，提高性能
			const [comingSoonMovie, response] = await Promise.all([
				BlogApi.getComingSoonMovie(),
				BlogApi.getHotTheaterMovie(),
			]);

			const hotTheaterMovie = response.movieList;

			// 更新状态
			setData({
				comingSoonMovieData: comingSoonMovie,
				hotTheaterMovieData: hotTheaterMovie,
			});
		} catch (error) {
			toast.error(error.message || "获取数据失败，请稍后重试");
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
		rowKey: string,
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
					label: "即将上映",
					children: renderTable(
						comingSoonMovieColumns,
						data.comingSoonMovieData,
						"id",
					),
				},
				{
					key: "2",
					label: "院线热播",
					children: renderTable(
						hotTheaterMovieColumns,
						data.hotTheaterMovieData,
						"id",
					),
				},
			]}
		/>
	);
}

export default Movie;
