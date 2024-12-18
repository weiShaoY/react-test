import { Input, Select, Button } from "antd";

import { useState, useEffect } from "react";

import Card from "@/components/card";

import Base64TableModal from "./components/base64TableModal";

const { TextArea } = Input;

/**
 * 壁纸组件
 */
function Morse() {
	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 0, label: "Base64-编码" },
		{ value: 1, label: "Base64-解码" },
	];

	const [category, setCategory] = useState(0);

	const [error, setError] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [keywordOne, setKeywordOne] = useState("Hello Word! 代码改变世界！");

	const [keywordTwo, setKeywordTwo] = useState("");

	const [keywordThree, setKeywordThree] = useState(
		"SGVsbG8gV29yZCEg5Luj56CB5pS55Y+Y5LiW55WM77yB",
	);
	const [keywordFour, setKeywordFour] = useState("");

	// 新增的逻辑
	useEffect(() => {
		try {
			setError(""); // 清空错误信息
			if (category === 0) {
				// 处理包含中文的字符串，进行Base64编码
				setKeywordTwo(
					btoa(
						encodeURIComponent(keywordOne).replace(
							/%([0-9A-F]{2})/g,
							(_, p1) => {
								return String.fromCharCode(Number.parseInt(p1, 16)); // 替换为 Number.parseInt
							},
						),
					),
				);
			} else {
				// 处理包含中文的字符串，进行Base64解码
				const decodedText = decodeURIComponent(
					Array.prototype.map
						.call(atob(keywordThree), (c) => {
							return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
						})
						.join(""),
				);

				// 验证Base64字符串有效性
				if (keywordThree && !decodedText.trim()) {
					setError("输入的Base64无效，请检查后重试!");
				}
				setKeywordFour(decodedText);
			}
		} catch (err) {
			// 捕获异常，设置错误信息
			setError("解码失败，请检查输入内容！");
		}
	}, [category, keywordOne, keywordThree]);

	function showModal() {
		setIsModalOpen(true);
	}
	return (
		<>
			<Base64TableModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>

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

					<Button type="primary" onClick={showModal}>
						Base64编码表
					</Button>

					<div className="flex items-center">
						{error && <span className="text-red ">{error}</span>}
					</div>
				</div>

				<div className="flex flex-col gap-5 h-[calc(100vh-240px)] relative w-full">
					{category === 0 ? (
						<>
							<div className="flex-1">
								<TextArea
									style={{ resize: "none", height: "100%" }}
									placeholder="请输入需要编码的文本"
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
						</>
					) : (
						<>
							<div className="flex-1">
								<TextArea
									style={{ resize: "none", height: "100%" }}
									placeholder="请输入需要解码的Base64文本"
									allowClear
									value={keywordThree}
									onChange={(e) => setKeywordThree(e.target.value)}
								/>
							</div>

							<div className="flex-1">
								<TextArea
									style={{ resize: "none", height: "100%" }}
									placeholder="解码结果"
									readOnly
									value={keywordFour}
								/>
							</div>
						</>
					)}
				</div>
			</Card>
		</>
	);
}

export default Morse;
