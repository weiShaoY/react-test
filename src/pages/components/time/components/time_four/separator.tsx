import { useEffect, useState } from "react";

type PropsType = {
	/**
	 * 数字
	 */
	number?: number;

	/**
	 * 颜色
	 */
	color?: string;
};

function DotIndicator({ color = "#04A770" }: PropsType) {
	const [refresh, setRefresh] = useState<boolean>(true);

	// 监听 number 变化，切换 refresh 状态
	useEffect(() => {
		setRefresh((prev) => !prev);
	}, []);

	return (
		<div className="h-24 flex flex-col justify-around">
			<i
				className={"block h-1.5 w-1.5 rounded transition-all"}
				style={{
					opacity: refresh ? 1 : 0.2,
					backgroundColor: color,
				}}
			/>
			<i
				className={"block h-1.5 w-1.5 rounded transition-all"}
				style={{
					opacity: refresh ? 1 : 0.2,
					backgroundColor: color,
				}}
			/>
		</div>
	);
}

export default DotIndicator;
