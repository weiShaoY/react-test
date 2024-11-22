import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

/**
 * 画布加载指示器组件
 *
 * @component
 * @returns {JSX.Element} 加载进度的显示组件
 */
export function CanvasLoading(): JSX.Element {
	// 获取加载进度的相关信息
	const { loaded, total } = useProgress();

	// 记录加载进度（百分比）
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		if (total > 0) {
			setProgress(loaded / total);
		}
	}, [loaded, total]);

	return (
		<Html center>
			<span className="canvas-load whitespace-nowrap text-[16px]">
				Loading :{" "}
			</span>
			<p
				style={{
					fontSize: 14,
					color: "#f1f1f1",
					fontWeight: 800,
					display: "inline-block",
				}}
			>
				{`${(progress * 100).toFixed(2)}%`}
			</p>
		</Html>
	);
}
