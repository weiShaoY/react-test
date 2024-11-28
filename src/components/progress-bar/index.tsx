import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useCallback, useEffect } from "react";

import { usePathname } from "@/router/hooks/blog";
import { useThemeToken } from "@/theme/hooks";

// 配置 NProgress
NProgress.configure({
	showSpinner: false,
});

/**
 * ProgressBar 组件
 *
 * 用于在路由变化时显示进度条效果。
 */
export default function ProgressBar() {
	/**
	 * 当前路由路径名
	 */
	const pathname = usePathname();

	/**
	 * 获取主题的主色
	 */
	const { colorPrimary } = useThemeToken();

	/**
	 * @description 更新 NProgress 样式，使其符合主题的主色调
	 * @example  在路由变化时调用 updateProgressBarStyle();
	 */
	const updateProgressBarStyle = useCallback(() => {
		const nprogress = document.getElementById("nprogress");
		if (!nprogress) return;

		const bar = nprogress.querySelector<HTMLElement>(".bar");
		const peg = nprogress.querySelector<HTMLElement>(".peg");

		if (!bar || !peg) return;

		bar.style.background = colorPrimary;
		bar.style.boxShadow = `0 0 2px ${colorPrimary}`;
		peg.style.boxShadow = `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`;
	}, [colorPrimary]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// 开始显示进度条
		NProgress.start();
		// 更新样式
		updateProgressBarStyle();

		/**
		 * @description 模拟路由变化完成的异步效果
		 */
		const timer = setTimeout(() => {
			NProgress.done(); // 完成进度条
		}, 100);

		return () => {
			// 清除定时器并完成进度条
			clearTimeout(timer);
			NProgress.done();
		};
	}, [pathname, updateProgressBarStyle]); // 依赖路由变化和样式更新

	return null; // 无需渲染任何内容
}
