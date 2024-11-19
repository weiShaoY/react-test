import { useEffect, useState } from "react";
import digitNum from "./data";

/**
 *  定义 DigitNum 类型为 0-9 的数字
 */
export type DigitNumType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Digit 组件的属性类型
 */
type PropsType = {
	/**
	 * 数字
	 */
	number: DigitNumType;

	/**
	 * 颜色
	 */
	color?: string;
};

/**
 * Digit 组件
 */
function Digit({ number, color = "#04A770" }: PropsType) {
	// 当前所有 segment 状态，true 为亮起，false 为熄灭
	const [segmentsOn, setSegmentsOn] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);

	// 根据数字变化更新 segment 状态
	useEffect(() => {
		const newSeg = Array(7).fill(false);
		for (const i of digitNum[number]) {
			newSeg[i] = true;
		}
		setSegmentsOn(newSeg);
	}, [number]);

	return (
		<div className="relative mx-1 h-24 w-14 flex-shrink flex-grow-0 scale-75 transform md:scale-100">
			{segmentsOn.map((segment, index) => {
				/**
				 *  基础样式
				 */
				const baseClass =
					"absolute block rounded opacity-20 transition-opacity";

				/**
				 *  根据 segment 状态决定是否亮起
				 */
				const opacityClass = segment ? "!opacity-100" : "";

				/**
				 *  根据索引确定样式
				 */
				let positionClass = "";

				switch (index) {
					case 0:
						positionClass = "h-1.5 top-1 left-2 right-2";
						break;
					case 1:
						positionClass = "w-1.5 h-10 top-2 right-1";
						break;
					case 2:
						positionClass = "w-1.5 h-10 bottom-2 right-1";
						break;
					case 3:
						positionClass = "h-1.5 bottom-1 left-2 right-2";
						break;
					case 4:
						positionClass = "w-1.5 h-10 bottom-2 left-1";
						break;
					case 5:
						positionClass = "w-1.5 h-10 top-2 left-1";
						break;
					case 6:
						positionClass = "h-1.5 top-1/2 left-2 right-2 -translate-y-1/2";
						break;
				}

				// 为每个元素添加一个唯一的 key，可以使用 segment 的索引和状态
				const uniqueKey = `segment-${index}`;

				return (
					<i
						key={uniqueKey} // 不使用数组索引作为 key
						className={`${baseClass} ${opacityClass} ${positionClass}`}
						style={{
							backgroundColor: color,
						}}
					/>
				);
			})}
		</div>
	);
}

export default Digit;
