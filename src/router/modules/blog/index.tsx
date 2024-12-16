import { Navigate } from "react-router";

import { BlogLayout } from "@/layouts/blog";

import type { AppRouteObject } from "#/router";

import { menuFilter } from "@/router/utils";

const { VITE_APP_BLOGPAGE } = import.meta.env;

import { useMemo } from "react";

/**
 * 博客路由
 */
export const BlogRoutes: AppRouteObject = {
	path: "/blog",
	element: <BlogLayout />,
	children: [
		{
			index: true,
			element: <Navigate to={VITE_APP_BLOGPAGE} replace />,
		},
		// 动态加载菜单模块的子路由
		...getBlogModuleRoutes(),
	],
};

/**
 * 为路由项添加指定的前缀（例如 "/blog"）
 *
 * @param  routes - 路由列表
 * @returns  添加前缀后的路由列表
 */
export function addBlogRoutes(routes: AppRouteObject[]): AppRouteObject[] {
	return routes.map((route) => {
		// 创建路由项的副本以避免修改原对象
		const newRoute = { ...route };

		// 如果路由存在 meta.key 且 key 不是根路径 "/"
		if (newRoute.meta?.key && newRoute.meta.key !== "/") {
			// 检查 key 是否以 "/blog" 开头，如果不是则添加前缀
			if (!newRoute.meta.key.startsWith("/blog")) {
				newRoute.meta.key = newRoute.meta.key.startsWith("/")
					? `/blog${newRoute.meta.key}` // 如果 key 已有 "/"，直接拼接 "/blog"
					: `/blog/${newRoute.meta.key}`; // 如果 key 没有 "/"，插入 "/blog/"
			}
		}

		// 如果当前路由有子路由，递归处理子路由
		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addBlogRoutes(newRoute.children);
		}
		// 返回添加前缀后的路由项
		return newRoute;
	});
}

/**
 * 获取blog模块路由
 * @returns  过滤后的路由列表
 */
export function getBlogModuleRoutes(): AppRouteObject[] {
	/**
	 * 用于存储动态加载的菜单模块路由
	 */
	const menuModules: AppRouteObject[] = [];

	// 使用 Vite 的 import.meta.glob 方法动态导入当前文件夹下的所有 .tsx 文件
	// 排除自身文件（index.tsx）
	const modules = import.meta.glob("./*.tsx", {
		eager: true,
	});

	// 获取当前文件的相对路径名称，例如 "./index.tsx"
	const currentFile = "./index.tsx";

	// 遍历所有动态导入的模块文件
	for (const key in modules) {
		// 跳过自身文件
		if (key === currentFile) continue;

		// 获取模块的默认导出，如果没有默认导出则为空对象
		const mod = (modules as any)[key].default || {};

		// 将模块转换为数组，如果模块是单个对象则转换为单元素数组
		const modList = Array.isArray(mod) ? [...mod] : [mod];

		// 将模块的路由项添加到菜单模块数组中
		menuModules.push(...modList);
	}

	// 添加路由前缀，并返回修改后的路由列表
	const routesWihPrefix = addBlogRoutes(menuModules);

	// 通过菜单过滤规则返回最终的路由配置
	return menuFilter(routesWihPrefix);
}

/**
 * 获取blog模块的路由配置
 * @returns  路由数组
 */
export function useBlogRoutes() {
	//  静态路由表
	return useMemo(() => {
		return getBlogModuleRoutes();
	}, []);
}
