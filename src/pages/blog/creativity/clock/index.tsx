import Card from "@/components/card";
import { useGetTime } from "@/hooks";
import { useMemo } from "react";
import styles from "./index.module.less";

function Clock() {
	const time = useGetTime();

	/**
	 *  计算时针样式
	 */
	const hourHandStyle = useMemo(() => {
		const degrees = (time.hour24 % 12) * 30 + time.minute * 0.5;
		return { transform: `rotate(${degrees}deg)` };
	}, [time.hour24, time.minute]);

	/**
	 *  计算分针样式
	 */
	const minuteHandStyle = useMemo(() => {
		const degrees = time.minute * 6 + time.second * 0.1;
		return { transform: `rotate(${degrees}deg)` };
	}, [time.minute, time.second]);

	/**
	 *  计算秒针样式
	 */
	const secondHandStyle = useMemo(() => {
		const degrees = time.second * 6;
		return { transform: `rotate(${degrees}deg)` };
	}, [time.second]);

	if (!time || !hourHandStyle || !minuteHandStyle || !secondHandStyle) {
		return null;
	}

	return (
		<Card className="h-full w-full">
			<div className="relative aspect-square max-w-full max-h-full h-full w-full flex items-center justify-center bg-[#1e1f26] rounded-xl m-auto">
				<div className={`relative ${styles.clock}`}>
					{/* 渲染表盘数字 */}
					{Array.from({ length: 12 }).map((_, index) => {
						/**
						 *  数字从 1 到 12
						 */
						const num = index + 1;
						return (
							<div
								key={num}
								className="absolute h-[90%] text-[24px] text-[#fff] font-bold"
								style={{ transform: `rotate(${num * 30}deg)` }}
							>
								<div style={{ transform: `rotate(${num * -30}deg)` }}>
									{num}
								</div>
							</div>
						);
					})}

					{/* 时钟指针 */}
					<div
						style={hourHandStyle}
						className="absolute left-1/2 top-[30%] z-0 h-[20%] w-[6px] origin-bottom rounded-full bg-[#fff] ml-[-3px]"
					/>
					<div
						style={minuteHandStyle}
						className="absolute top-1/4 z-1 h-[25%] w-[3px] origin-bottom rounded-full bg-[#FFF]"
					/>
					<div
						style={secondHandStyle}
						className="absolute left-1/2 top-[16.67%] h-[33%] w-[2px] origin-bottom rounded-full bg-[#FF0000] ml-[-1px]"
					/>
				</div>
			</div>
		</Card>
	);
}

export default Clock;
