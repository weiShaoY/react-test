import { Navigate } from "react-router-dom";

import { CodeDashboardLayout } from "@/layouts/code";

import { getCodeModuleRoutes } from "../../utils";

import type { AppRouteObject } from "#/router";

/**
 *  动态获取code菜单模块路由
 */
const codeModuleRoutes = getCodeModuleRoutes();

// /**
//  *  从环境变量中获取首页路径
//  */
const { VITE_APP_CODEPAGE: CODEPAGE } = import.meta.env;

/**
 * CodeRoutes: code模块路由配置
 * 用于配置code模块的路由
 */
export const CodeRoutes: AppRouteObject = {
	path: "/code",
	element: <CodeDashboardLayout />,
	children: [
		// 默认跳转到首页路径，首页路径从环境变量中动态获取
		{ index: true, element: <Navigate to={CODEPAGE} replace /> },
		// 动态加载菜单模块的子路由
		...codeModuleRoutes,
	],
};
