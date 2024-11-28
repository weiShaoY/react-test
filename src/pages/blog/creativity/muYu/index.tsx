import "./index.less";
import Card from "@/components/card";
import { useRef, useState } from "react";
import muYuImage from "./image/muYu.png";
import muYuMusic from "./music/muYu.aac";

function Clock() {
	/**
	 * 功德计数
	 */
	const [meritNumber, setMeritNumber] = useState(0);

	/**
	 * 是否被点击
	 */
	const [isStartClick, setIsStartClick] = useState(false);

	/**
	 * 文字提示
	 */
	const tips = "功德 + 1";

	const audioRef = useRef<HTMLAudioElement | null>(null);

	/**
	 * 按下鼠标事件
	 */
	const handleMouseDown = () => {
		setIsStartClick(true);

		// 初始化音频
		if (!audioRef.current) {
			audioRef.current = new Audio(muYuMusic);
		}

		// 播放音频
		audioRef.current.play();

		// 更新功德计数
		setMeritNumber((prev) => prev + 1);
	};

	/**
	 * 松开鼠标事件
	 */
	const handleMouseUp = () => {
		setIsStartClick(false);
	};

	return (
		<Card className="h-full w-full flex items-center justify-center">
			<div className="relative h-72 w-72 flex items-center justify-between p-6 text-[#C39557]">
				{/* 提示文字 */}
				<div
					className={`absolute font-bold left-[50%] top-[30%] translate-x-[-50%] text-center text-base opacity-0 ${
						isStartClick ? "tips-active" : ""
					}`}
				>
					{tips}
				</div>

				{/* 功德计数 */}
				<div className="text-center text-xl font-bold">功德: {meritNumber}</div>

				{/* 木鱼图片按钮 */}
				<div
					className={`relative h-full w-[60%] cursor-pointer bg-contain bg-center bg-no-repeat ${
						isStartClick ? "img_click" : ""
					}`}
					style={{
						backgroundImage: `url(${muYuImage})`,
					}}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
				/>
			</div>
		</Card>
	);
}

export default Clock;
