import { useEffect, useMemo, useRef, useState } from "react";

import "./index.less";

type ScreensaverItemProps = {
	/**
	 *  总数
	 */
	total: number;
	/**
	 *  当前
	 */
	current: number;
};

function ScreensaverItem({ total = 9, current = -1 }: ScreensaverItemProps) {
	const [before, setBefore] = useState<number>(total === current ? -1 : total);
	const [isPlay, setIsPlay] = useState<boolean>(false);
	const prevCurrent = useRef<number>(current);

	// 监控 current 的变化，类似于 Vue 的 watch
	useEffect(() => {
		if (current !== prevCurrent.current) {
			setBefore(prevCurrent.current);
			setIsPlay(true);
			prevCurrent.current = current;
		}
	}, [current]);

	/**
	 *  计算总数数组，用于渲染列表
	 */
	const totalArray = useMemo(
		() => Array.from({ length: total + 1 }, (_, i) => i),
		[total],
	);

	return (
		<div className={isPlay ? "play" : ""}>
			<ul className="flip">
				{totalArray.map((key) => (
					<li
						key={key}
						className={`item ${current === key ? "active" : ""} ${key === before ? "before" : ""}`}
					>
						<div className="up">
							<div className="shadow" />
							<div className="inn" style={{ color: "white" }}>
								{key}
							</div>
						</div>
						<div className="down">
							<div className="shadow" />
							<div className="inn" style={{ color: "white" }}>
								{key}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ScreensaverItem;
