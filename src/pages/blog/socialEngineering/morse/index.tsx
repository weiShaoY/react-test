import { BlogApi } from "@/api";
import { useDebounceEffect } from "ahooks";
import { Button, Input, Select, Spin, Tooltip } from "antd";
import { useState } from "react";

import { SvgIcon } from "@/components/icon";

import Card from "@/components/card";
import { downloadImage } from "@/utils/downloadImage";
import { toast } from "sonner";
import { decode, encode } from "xmorse";
const { TextArea } = Input;

/**
 * 壁纸组件
 */
function Morse() {
	const [loading, setLoading] = useState(false);

	const [category, setCategory] = useState("mn");

	const [keyword, setKeyword] = useState("");

	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 0, label: "编码" },
		{ value: 1, label: "解码" },
	];

	/**
	 * 获取壁纸数据
	 */
	async function getData() {
		try {
			setLoading(true);

			if (category === "tui") {
				const response = await BlogApi.getTuiImage();

				setKeyword(response.text);
			} else if (category === "sg") {
				const response = await BlogApi.getRandomManImage();
				setKeyword(response.img);
			} else {
				const response = await BlogApi.getWallpaper(category);
				setKeyword(response.img_url);
			}
		} catch (error: any) {
			toast.error(error.message || "获取数据失败，请稍后重试");
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
		[category],
		{ wait: 500 }, // 防抖时间 500ms
	);
	return (
		<Card className="flex flex-col gap-5">
			<div className="flex gap-5 flex-wrap w-full items-center">
				<Select
					className="w-40"
					showSearch
					placeholder="请选择壁纸类别"
					defaultValue={category}
					onChange={(category) => setCategory(category)}
					options={categoryOptions}
				/>

				<Tooltip placement="top" title="点击刷新">
					<Button
						loading={loading}
						onClick={getData}
						icon={<SvgIcon icon="refresh" />}
					/>
				</Tooltip>

				<Tooltip placement="top" title="点击下载">
					<Button
						onClick={() => downloadImage(keyword)}
						icon={<SvgIcon icon="download" />}
					/>
				</Tooltip>
			</div>
			{/* {loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
				)}
				{keyword && (
					<Image src={keyword} alt="壁纸" height="100%" width="auto" />
				)} */}

			{/* 壁纸展示区域 */}
			<div className=" flex flex-col  gap-5 bg-gray-200 h-[calc(100vh-240px)] relative w-full">
				<div className="flex-1">
					<TextArea placeholder="请输入文本" />
				</div>

				<div className=" bg-amber flex-1">
					<TextArea placeholder="编码结果" />
				</div>
			</div>
		</Card>
	);
}

export default Morse;
