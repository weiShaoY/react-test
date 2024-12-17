import { Input, Select } from "antd";
import { useState, useEffect } from "react";

import Card from "@/components/card";
import { decode, encode } from "xmorse";
const { TextArea } = Input;

/**
 * 壁纸组件
 */
function Morse() {
	/**
	 *  分类选项
	 */
	const categoryOptions = [
		{ value: 0, label: "编码" },
		{ value: 1, label: "解码" },
	];

	const [category, setCategory] = useState(0);

	const [error, setError] = useState("");

	const [keywordOne, setKeywordOne] = useState("Hello Word! 代码改变世界！");
	const [keywordTwo, setKeywordTwo] = useState("");
	const [keywordThree, setKeywordThree] = useState(
		"...././.-../.-../---/.--/---/.-./-../-.-.--/-..---.---...--/----..........-/--..-.-..---..-/-.-..----.--.../-..---....-.--./---.-.-.-..--../--------.......-",
	);
	const [keywordFour, setKeywordFour] = useState("");

	// 新增的逻辑
	useEffect(() => {
		try {
			setError(""); // 清空错误信息
			if (category === 0) {
				setKeywordTwo(encode(keywordOne));
			} else {
				const decodedText = decode(keywordThree);
				if (keywordThree && !decodedText.trim()) {
					setError("输入的摩尔斯代码无效，请检查后重试！");
				}
				setKeywordFour(decodedText);
			}
		} catch (err) {
			setError("解码失败，请检查输入内容！");
		}
	}, [category, keywordOne, keywordThree]);

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
								placeholder="请输入需要解码的摩尔斯电码"
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
	);
}

export default Morse;
