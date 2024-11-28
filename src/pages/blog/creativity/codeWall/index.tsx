import { useCallback, useEffect, useRef } from "react";

import Card from "@/components/card";

let canvasWidth = 600;
let canvasHeight = 600;
const text = "abcdefghijklmnopqrstuvwxyz";
const bl = 26;

const BlogWall = () => {
	const boxRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const frameId = useRef<number>(0);
	const startRatesRef = useRef<Record<number, number>>({});
	const ratesRef = useRef<Record<number, number>>({});
	const endRatesRef = useRef<Record<number, number>>({});
	const textObjRef = useRef<Record<string, string>>({});

	/**
	 *  使用 useCallback 包裹 init 函数，确保它不会重新创建
	 */
	const init = useCallback(() => {
		if (boxRef.current && canvasRef.current) {
			resize();
			const ctx = canvasRef.current.getContext(
				"2d",
			) as CanvasRenderingContext2D;
			ctx.font = "14px SourceHanSansCN-Regular";
			ctxRef.current = ctx;
		}
	}, []); // 空依赖数组，确保只在组件挂载时执行一次

	/**
	 *  使用 useCallback 包裹 play 函数，确保它不会重新创建
	 */
	const play = useCallback(() => {
		if (ctxRef.current) {
			ctxRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
			for (let i = 0; i < canvasWidth; i += bl) {
				ctxRef.current.beginPath();
				const gradient = ctxRef.current.createLinearGradient(
					0,
					0,
					0,
					canvasHeight,
				);
				const s1 = 0.2 * Math.random();
				const s2 = 0.8 * Math.random() + 0.2;
				const step = 0.02 * Math.random();
				const startRates = startRatesRef.current;
				const rates = ratesRef.current;
				const endRates = endRatesRef.current;
				const textObj = textObjRef.current;
				rates[i] = rates[i] || -s1;
				endRates[i] = endRates[i] || 0;
				startRates[i] = startRates[i] || -s2;
				gradient.addColorStop(0, "#000000");
				gradient.addColorStop(startRates[i] < 0 ? 0 : startRates[i], "#000000");
				gradient.addColorStop(rates[i] < 0 ? 0 : rates[i], "#0ee30e");
				gradient.addColorStop(endRates[i], "#000000");
				gradient.addColorStop(1, "#000000");
				ctxRef.current.fillStyle = gradient;
				for (let j = 0; j < canvasHeight; j += bl) {
					const key = `${i}-${j}`;
					textObj[key] =
						textObj[key] || text[Math.floor(Math.random() * text.length)];
					ctxRef.current.fillText(textObj[key], i, j);
				}

				rates[i] += step;
				endRates[i] += step;
				startRates[i] += step;
				if (startRates[i] > 1) {
					startRates[i] = -s2;
				}
				if (rates[i] > 1) {
					if (startRates[i] === -s2) {
						rates[i] = -s1;
					} else {
						rates[i] = 1;
					}
				}
				if (endRates[i] > 1) {
					if (rates[i] === -s1 && startRates[i] === -s2) {
						endRates[i] = step;
					} else {
						endRates[i] = 1;
					}
				}
			}

			frameId.current = window.requestAnimationFrame(play);
		}
	}, []); // 空依赖数组，确保只在组件挂载时执行一次

	/**
	 *  使用 useCallback 包裹 resize 函数，确保它不会重新创建
	 */
	const resize = useCallback(() => {
		if (boxRef.current && canvasRef.current) {
			const { offsetWidth, offsetHeight } = boxRef.current;
			canvasWidth = offsetWidth;
			canvasHeight = offsetHeight;
			canvasRef.current.width = canvasWidth;
			canvasRef.current.height = canvasHeight;
		}
	}, []); // 空依赖数组，确保只在组件挂载时执行一次

	// 在组件挂载时初始化
	useEffect(() => {
		init();
		play();

		return () => {
			frameId.current && cancelAnimationFrame(frameId.current);
		};
	}, [init, play]); // 添加依赖数组，确保 `init` 和 `play` 只在第一次渲染时运行

	// 监听窗口大小变化
	useEffect(() => {
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, [resize]); // 添加依赖数组，确保 `resize` 只在第一次渲染时运行

	return (
		<Card className="h-full">
			<div
				style={{
					boxSizing: "border-box",
					width: "100%",
					height: "100%",
					display: "flex",
					backgroundColor: "#000",
				}}
				ref={boxRef}
			>
				<canvas ref={canvasRef}>您的浏览器版本过低，请更新浏览器</canvas>
			</div>
		</Card>
	);
};

export default BlogWall;
