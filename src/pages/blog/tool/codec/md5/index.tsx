import { Input, Select } from "antd";

import { useState, useEffect } from "react";

import Card from "@/components/card";

const { TextArea } = Input;

import md5 from "md5-ts";
/**
 * 壁纸组件
 */
function Morse() {
	/**
	 *  分类选项
	 */
	const categoryOptions = [{ value: 0, label: "Md5-加密" }];

	const [category, setCategory] = useState(0);

	const [error, setError] = useState("");

	const [keywordOne, setKeywordOne] = useState("Hello Word! 代码改变世界！");

	const [keywordTwo, setKeywordTwo] = useState("");

	// 新增的逻辑
	useEffect(() => {
		try {
			if (keywordOne) {
				setKeywordTwo(md5(keywordOne));
			} else {
				setKeywordTwo("");
			}
			setError(""); // 清空错误信息
		} catch (err) {
			// 捕获异常，设置错误信息
			setError("加密失败，请检查输入内容！");
		}
	}, [keywordOne]);

	return (
		<Card className="flex flex-col gap-5">
			<div className="flex gap-5 flex-wrap w-full items-center">
				<Select
					className="w-40"
					showSearch
					placeholder="请选择操作类型"
					defaultValue={category}
					onChange={(category) => setCategory(category)}
					options={categoryOptions}
				/>

				<div className="flex items-center">
					{error && <span className="text-red ">{error}</span>}
				</div>
			</div>

			<div className="flex flex-col gap-5 h-[calc(100vh-240px)] relative w-full">
				<div className="flex-1">
					<TextArea
						style={{ resize: "none", height: "100%" }}
						placeholder="请输入需要Md5加密的文本"
						allowClear
						value={keywordOne}
						onChange={(e) => setKeywordOne(e.target.value)}
					/>
				</div>

				<div className="flex-1">
					<TextArea
						style={{ resize: "none", height: "100%" }}
						placeholder="编码结果"
						readOnly
						value={keywordTwo}
					/>
				</div>
			</div>
		</Card>
	);
}

export default Morse;
