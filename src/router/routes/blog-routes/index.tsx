import { Navigate } from "react-router-dom";

import { BlogDashboardLayout } from "@/layouts/blog";

import { getBlogModuleRoutes } from "../../utils";

import type { AppRouteObject } from "#/router";

/**
 *  动态获取blog菜单模块路由
 */
const blogModuleRoutes = getBlogModuleRoutes();

// /**
//  *  从环境变量中获取首页路径
//  */
const { VITE_APP_BLOGPAGE: BLOGPAGE } = import.meta.env;

/**
 * BlogRoutes: blog模块路由配置
 * 用于配置blog模块的路由
 */
export const BlogRoutes: AppRouteObject = {
	path: "/blog",
	element: <BlogDashboardLayout />,
	children: [
		// 默认跳转到首页路径，首页路径从环境变量中动态获取
		{ index: true, element: <Navigate to={BLOGPAGE} replace /> },
		// 动态加载菜单模块的子路由
		...blogModuleRoutes,
	],
};
