import { useState } from "react";
import { message, Descriptions, Skeleton, Input } from "antd";
import { BlogApi } from "@/api";
import { useDebounceEffect } from "ahooks";

const typeMap: Record<string, string> = {
	"10": "民用",
	"20": "军用",
	"30": "使馆",
	"40": "民航",
	"50": "武警",
};
function Hok() {
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState("京A12345");

	const [data, setData] = useState({
		province_name: "",
		city: "",
		organization: "",
		type: "",
	});

	/**
	 * 获取数据
	 */
	const getData = async () => {
		setLoading(true);
		try {
			const res = await BlogApi.getLicensePlateNumberInfo(name);

			setData(res);
		} catch (error) {
			message.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	};

	/**
	 * 使用 ahooks 的防抖处理输入变化
	 */
	useDebounceEffect(
		() => {
			getData();
		},
		[name], // 依赖类型和英雄名称
		{ wait: 1000 }, // 防抖时间 500ms
	);

	const items = [
		{
			label: "省份",
			children: data.province_name,
			span: 3,
		},
		{
			label: "城市",
			children: data.city,
			span: 3,
		},

		{
			label: "机构名称",
			children: data.organization,
			span: 3,
		},
		{
			label: "类型编码",
			children: <span>{typeMap[data.type]}</span>,
			span: 3,
		},
	];

	return (
		<div className="p-4 h-full">
			{/* 顶部筛选栏 */}
			<div className="flex items-center justify-between mb-4">
				<Input
					allowClear
					placeholder="请输入车牌号"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="!w-80"
				/>
			</div>

			{/* 数据展示 */}
			<Descriptions bordered>
				{loading
					? Array(7)
							.fill(null)
							.map((_) => (
								<Descriptions.Item key={_ + new Date().getTime()}>
									<Skeleton active paragraph={{ rows: 1, width: "80%" }} />
								</Descriptions.Item>
							))
					: items.map((item) => (
							<Descriptions.Item
								key={item.label}
								label={item.label}
								span={item.span}
							>
								{item.children}
							</Descriptions.Item>
						))}
			</Descriptions>
		</div>
	);
}

export default Hok;
