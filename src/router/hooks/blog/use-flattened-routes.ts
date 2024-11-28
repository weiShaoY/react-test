import { useCallback, useMemo } from "react";

import { flattenMenuRoutes, menuFilter } from "@/router/utils";
import { useBlogRoutes } from "./use-blog-routes";

/**
 * 自定义 Hook：useFlattenedRoutes
 * 主要用于返回拍平后的菜单路由数组
 * @returns  拍平后的菜单路由数组
 */
export function useFlattenedRoutes() {
	/**
	 *  使用 useCallback 缓存 flattenMenuRoutes 函数，避免每次重新渲染时创建新的函数实例
	 */
	const flattenRoutes = useCallback(flattenMenuRoutes, []);

	/**
	 *  获取权限过滤后的路由数组
	 */
	const permissionRoutes = useBlogRoutes();

	/**
	 *   使用 useMemo 缓存拍平后的路由结果，避免重复计算
	 */
	return useMemo(() => {
		/**
		 *  过滤权限路由，生成菜单路由
		 */
		const menuRoutes = menuFilter(permissionRoutes);

		/**
		 *  使用缓存的 flattenRoutes 对菜单路由进行拍平处理
		 */
		return flattenRoutes(menuRoutes);
	}, [flattenRoutes, permissionRoutes]);
}
