import { Html, useProgress } from "@react-three/drei";

/**
 * 画布加载指示器组件
 * @component
 * @returns  加载进度的显示组件
 */
export const CanvasLoading = () => {
	// 获取加载进度的相关信息
	const { progress } = useProgress();

	return (
		<Html as="div" center className="flex items-center justify-center flex-col">
			<span className="text-3 w-[1em] h-[1em] rounded-full relative [-text-indent:9999em] animate-[mulShdSpin_1.1s_infinite_ease] translate-z-0" />
			<p
				className="text-4 text-white font-extrabold"
				style={{
					fontSize: 14,
					color: "#F1F1F1",
					fontWeight: 800,
				}}
			>
				{progress.toFixed(2)}%
			</p>
		</Html>
	);
};
