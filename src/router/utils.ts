import { ascend } from "ramda";
import type { AppRouteObject, RouteMeta } from "#/router";

/**
 * 筛选并排序菜单路由
 * @param  items - 路由对象数组
 * @returns  返回经过筛选和排序后的菜单路由数组
 */
export function menuFilter(items: AppRouteObject[]) {
	return (
		items
			.filter((item) => {
				// 根据 meta.key 判断是否显示菜单项
				const show = item.meta?.key;
				// 如果有子路由，递归过滤子路由
				if (show && item.children) {
					item.children = menuFilter(item.children);
				}
				return show;
			})
			// 使用 Ramda 的 ascend 方法根据 order 字段对菜单项进行升序排序
			.sort(ascend((item) => item.order || Number.POSITIVE_INFINITY))
	);
}

/**
 * 获取用于侧边栏菜单的路由
 * @param  appRouteObjects - 路由对象数组
 * @returns  返回经过过滤和排序后的菜单路由
 */
export function getMenuRoutes(appRouteObjects: AppRouteObject[]) {
	// 过滤并返回菜单路由
	return menuFilter(appRouteObjects);
}

/**
 * 扁平化菜单路由，返回包含 meta 信息的数组
 * @param  routes - 路由对象数组
 * @returns  返回扁平化后的路由 meta 信息数组
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
	return routes.reduce<RouteMeta[]>((prev, item) => {
		const { meta, children } = item;
		// 如果路由项有 meta 信息，添加到结果数组中
		if (meta) prev.push(meta);
		// 递归处理子路由，合并子路由的 meta 信息
		if (children) prev.push(...flattenMenuRoutes(children));
		return prev;
	}, []);
}
