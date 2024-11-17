import { useSettings } from "@/store/settingStore";
import { useResponsive } from "@/theme/hooks";

import NavHorizontal from "./nav-horizontal";
import NavVertical from "./nav-vertical";

import { ThemeLayout } from "#/enum";

/**
 * 导航组件，根据不同布局和屏幕大小渲染对应的导航栏
 */
export default function Nav() {
	// 从全局设置中获取当前主题布局类型
	const { themeLayout } = useSettings();

	// 获取屏幕响应式信息（如是否为中等屏幕）
	const { screenMap } = useResponsive();

	// 如果主题布局为水平布局，渲染水平导航栏
	if (themeLayout === ThemeLayout.Horizontal) {
		return <NavHorizontal />;
	}

	// 如果主题布局为垂直布局且屏幕宽度为中等及以上，渲染垂直导航栏
	if (screenMap.md) {
		return <NavVertical />;
	}

	// 在其他情况下（小屏幕且垂直布局），不渲染任何内容
	return null;
}
