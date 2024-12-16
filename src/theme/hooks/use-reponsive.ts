import { Grid, theme } from "antd";
import type {
	Breakpoint,
	ScreenMap,
	ScreenSizeMap,
} from "antd/es/_util/responsiveObserver";

const { useBreakpoint } = Grid;

/**
 * 获取当前屏幕尺寸的响应式信息
 */
export function useResponsive() {
	/**
	 *  从 Ant Design 主题中获取屏幕断点的像素值
	 */
	const {
		token: { screenXS, screenSM, screenMD, screenLG, screenXL, screenXXL },
	} = theme.useToken();

	/**
	 *  定义断点名称数组
	 */
	const screenArray: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

	/**
	 *  屏幕尺寸映射表：用于将断点名称映射为具体的像素值
	 */
	const screenEnum: ScreenSizeMap = {
		xs: screenXS, // 超小屏幕 (extra small)
		sm: screenSM, // 小屏幕 (small)
		md: screenMD, // 中屏幕 (medium) //  768
		lg: screenLG, // 大屏幕 (large)
		xl: screenXL, // 超大屏幕 (extra large)
		xxl: screenXXL, // 超超大屏幕 (extra extra large)
	};

	// screenMap: { xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean, xxl: boolean }
	/**
	 *  获取当前屏幕的断点布尔值映射
	 */
	const screenMap: ScreenMap = useBreakpoint();

	/**
	 *  找到当前屏幕满足的最大断点，从后往前查找
	 */
	const currentScrren = [...screenArray].reverse().find((item) => {
		// 检查 screenMap 中对应断点的布尔值是否为 true
		const result = screenMap[item];
		return result === true;
	});

	// 返回屏幕尺寸映射表、断点布尔值映射、当前匹配的断点
	return {
		/**
		 *  屏幕断点对应的像素值映射
		 */
		screenEnum,
		/**
		 *  当前屏幕是否满足某断点的布尔值映射
		 */
		screenMap,
		/**
		 *  当前屏幕匹配的断点
		 */
		currentScrren,
	};
}
