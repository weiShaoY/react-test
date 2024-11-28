import Card from "@/components/card";
import { useCallback, useEffect, useRef, useState } from "react";
import ScreensaverItem from "./components/item";

/**
 * 获取当前时间数组
 * @param now 当前时间
 * @returns 当前时间的数字数组
 */
function getTimeArr(now: Date) {
	const h = String(now.getHours()).padStart(2, "0").split("").map(Number);
	const m = String(now.getMinutes()).padStart(2, "0").split("").map(Number);
	const s = String(now.getSeconds()).padStart(2, "0").split("").map(Number);
	return [...h, ...m, ...s];
}

function Screensaver() {
	/**
	 * 当前时间数组
	 */
	const [timeArr, setTimeArr] = useState<number[]>(getTimeArr(new Date()));

	const timerRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * 停止定时器
	 */
	const stopTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []); // stopTimer 无需依赖其他状态

	/**
	 * 启动定时器
	 */
	const startTimer = useCallback(() => {
		stopTimer(); // 调用 stopTimer，确保定时器停止
		timerRef.current = setTimeout(() => {
			setTimeArr(getTimeArr(new Date()));
			startTimer(); // 递归调用，保持每秒更新时间
		}, 1000);
	}, [stopTimer]); // 这里只需要依赖 stopTimer

	// 相当于 Vue 的 onMounted 和 onBeforeUnmount
	useEffect(() => {
		startTimer(); // 启动定时器
		return () => stopTimer(); // 组件卸载时停止定时器
	}, [startTimer, stopTimer]); // 依赖项应为 startTimer 和 stopTimer

	return (
		<Card className="h-full w-full flex items-center justify-center !bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]">
			<ScreensaverItem total={2} current={timeArr[0]} />
			<ScreensaverItem total={9} current={timeArr[1]} />

			<div className="h-12 flex flex-col justify-around px-2">
				<span className="h-2.5 w-2.5 rounded-full bg-black" />
				<span className="h-2.5 w-2.5 rounded-full bg-black" />
			</div>

			<ScreensaverItem total={5} current={timeArr[2]} />
			<ScreensaverItem total={9} current={timeArr[3]} />

			<div className="h-12 flex flex-col justify-around px-2">
				<span className="h-2.5 w-2.5 rounded-full bg-black" />
				<span className="h-2.5 w-2.5 rounded-full bg-black" />
			</div>

			<ScreensaverItem total={5} current={timeArr[4]} />
			<ScreensaverItem total={9} current={timeArr[5]} />
		</Card>
	);
}

export default Screensaver;
