import React, { useState } from "react";
import { Input, Button, Typography } from "antd";

// 字符到摩斯电码的字典
const morseCodeMap = {
	A: ".-",
	B: "-...",
	C: "-.-.",
	D: "-..",
	E: ".",
	F: "..-.",
	G: "--.",
	H: "....",
	I: "..",
	J: ".---",
	K: "-.-",
	L: ".-..",
	M: "--",
	N: "-.",
	O: "---",
	P: ".--.",
	Q: "--.-",
	R: ".-.",
	S: "...",
	T: "-",
	U: "..-",
	V: "...-",
	W: ".--",
	X: "-..-",
	Y: "-.--",
	Z: "--..",

	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"0": "-----",

	".": ".-.-.-",
	",": "--..--",
	"?": "..--..",
	"'": ".----.",
	"!": "-.-.--",
	"/": "-..-.",
	"(": "-.--.",
	")": "-.--.-",
	"&": ".-...",
	":": "---...",
	";": "-.-.-.",
	"+": ".-.-.",
	"-": "-....-",
	"=": "-...-",
	" ": "/",
};

// 摩斯电码到字符的反向字典
const reverseMorseCodeMap = Object.fromEntries(
	Object.entries(morseCodeMap).map(([key, value]) => [value, key]),
);

// 文字转换成摩斯电码
const textToMorse = (text) => {
	return text
		.toUpperCase() // 转为大写字母
		.split("") // 按字符拆分
		.map((char) => morseCodeMap[char] || "") // 查找对应的摩斯电码
		.join(" "); // 用空格连接每个字母的摩斯电码
};

// 摩斯电码转换成文字
const morseToText = (morse) => {
	return morse
		.split(" ") // 按空格拆分
		.map((code) => reverseMorseCodeMap[code] || "") // 查找对应的字符
		.join(""); // 拼接成文字
};

const MorseCodeConverter = () => {
	const [text, setText] = useState("");
	const [morse, setMorse] = useState("");
	const [convertedText, setConvertedText] = useState("");
	const [convertedMorse, setConvertedMorse] = useState("");

	// 处理文字到摩斯电码转换
	const handleTextToMorse = () => {
		const morseCode = textToMorse(text);
		setConvertedMorse(morseCode);
	};

	// 处理摩斯电码到文字转换
	const handleMorseToText = () => {
		const textResult = morseToText(morse);
		setConvertedText(textResult);
	};

	return (
		<div style={{ padding: "20px" }}>
			{/* 文字转摩斯电码部分 */}
			<div style={{ marginBottom: "20px" }}>
				<Typography.Text strong>文字转摩斯电码</Typography.Text>
				<Input.TextArea
					rows={4}
					placeholder="请输入文字"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Button
					type="primary"
					style={{ marginTop: "10px" }}
					onClick={handleTextToMorse}
				>
					转换为摩斯电码
				</Button>
				<Typography.Paragraph style={{ marginTop: "10px" }}>
					<strong>转换结果：</strong>
					{convertedMorse}
				</Typography.Paragraph>
			</div>

			{/* 摩斯电码转文字部分 */}
			<div>
				<Typography.Text strong>摩斯电码转文字</Typography.Text>
				<Input.TextArea
					rows={4}
					placeholder="请输入摩斯电码"
					value={morse}
					onChange={(e) => setMorse(e.target.value)}
				/>
				<Button
					type="primary"
					style={{ marginTop: "10px" }}
					onClick={handleMorseToText}
				>
					转换为文字
				</Button>
				<Typography.Paragraph style={{ marginTop: "10px" }}>
					<strong>转换结果：</strong>
					{convertedText}
				</Typography.Paragraph>
			</div>
		</div>
	);
};

export default MorseCodeConverter;
