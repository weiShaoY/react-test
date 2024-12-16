import { useMemo } from "react";
import { useLocation } from "react-router";

/**
 * 自定义 Hook：usePathname
 * 获取当前路由的 pathname，并使用 useMemo 进行缓存
 * @returns  当前路由的 pathname
 */
export function usePathname() {
	// 使用 useLocation 从 react-router-dom 获取当前路由的位置信息
	const { pathname } = useLocation();

	/**
	 * 使用 useMemo 对 pathname 进行缓存
	 * 仅当 pathname 改变时才会重新计算，避免组件在父组件渲染时重复计算
	 */
	return useMemo(() => pathname, [pathname]);
}
