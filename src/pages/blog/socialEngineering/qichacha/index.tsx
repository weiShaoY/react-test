import { BlogApi } from "@/api";
import { Input } from "antd";
import { useState } from "react";
console.log("%c Line:12 🌶 BlogApi", "color:#ffdd4d", BlogApi);
import { useDebounceEffect } from "ahooks";

function Hok() {
	const [loading, setLoading] = useState(false);
	console.log("%c Line:16 🍰 loading", "color:#93c0a4", loading);

	const [name, setName] = useState("");

	/**
	 * 获取数据
	 */
	async function getData() {
		setLoading(true);
		try {
			// const res = await BlogApi.getQiChaCha(name);
			// console.log("%c Line:29 🥟 res", "color:#3f7cff", res);
		} catch (error) {
			// message.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}

	/**
	 * 使用 ahooks 的防抖处理输入变化
	 */
	useDebounceEffect(
		() => {
			getData();
		},
		[name], // 依赖类型和英雄名称
		{ wait: 500 }, // 防抖时间 500ms
	);

	const items = [
		{
			label: "头像",
			// children: (
			// 	<div className="w-20 h-20">
			// 		{state.data?.pic && (
			// 			<Image
			// 				src={state.data.pic}
			// 				alt="头像"
			// 				width={80}
			// 				style={{ objectFit: "cover" }}
			// 				placeholder={
			// 					<Spin
			// 						size="small"
			// 						className="w-full h-full flex items-center justify-center"
			// 					/>
			// 				}
			// 			/>
			// 		)}
			// 	</div>
			// ),

			span: 1,
		},
		// {
		// 	label: "英雄",
		// 	children: state.data?.name,
		// 	span: 1,
		// },
	];
	console.log("%c Line:77 🍢 items", "color:#93c0a4", items);
	return (
		<div className="p-4 h-full">
			{/* 顶部筛选栏 */}
			<div className="flex items-center justify-between mb-4">
				<Input
					allowClear
					placeholder="请输入公司名称"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="!w-80"
				/>
			</div>

			{/* 数据展示 */}
			{/* <Descriptions bordered>
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
			</Descriptions> */}
		</div>
	);
}

export default Hok;
