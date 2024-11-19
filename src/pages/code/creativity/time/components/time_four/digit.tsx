import { useEffect, useState, useCallback } from "react";

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
	const [matrix, setMatrix] = useState<boolean[]>(digitNum[0]);

	/**
	 *  渲染数字矩阵函数
	 */
	const renderDigit = useCallback((num: DigitNumType) => {
		setMatrix(digitNum[num]);
	}, []); // 使用 useCallback 确保 renderDigit 只在初次渲染时创建

	useEffect(() => {
		renderDigit(number);
	}, [number, renderDigit]); // 添加 renderDigit 作为依赖项

	return (
		<div className="grid grid-cols-4 scale-75 transform gap-1.5 md:scale-100">
			{matrix.map((value) => (
				<i
					key={`${number}-${value}`}
					className="h-2.5 w-2.5 rounded-sm transition-all"
					style={{
						opacity: value ? 1 : 0.2,
						backgroundColor: color,
					}}
				/>
			))}
		</div>
	);
}

export default Digit;
