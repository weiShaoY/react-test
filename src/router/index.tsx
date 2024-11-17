import {
	Navigate,
	type RouteObject,
	RouterProvider,
	createHashRouter,
} from "react-router-dom";

import DashboardLayout from "@/layouts/dashboard";

import { usePermissionRoutes } from "@/router/hooks";

import { ErrorRoutes } from "@/router/routes/error-routes";

import { HomeRoutes } from "@/router/routes/home-routes";

import { NotFoundRoute } from "./routes/not-found-route";

import type { AppRouteObject } from "#/router";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 *  根路由配置
 */
const RootRoute: AppRouteObject = {
	path: "/",
	element: <Navigate to="/home" replace />,
};

/**
 * 主路由组件
 * @returns {JSX.Element} - 路由提供程序
 */
export default function Router(): JSX.Element {
	/**
	 * 动态加载的权限路由
	 * @type {AppRouteObject}
	 */

	const CodeRoutes: AppRouteObject = {
		path: "/",
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Navigate to={HOMEPAGE} replace /> },
			...usePermissionRoutes(),
		],
	};

	/**
	 * 合并后的所有路由
	 */
	const routes = [
		/**
		 *  根路由
		 */
		RootRoute,

		/**
		 *  首页路由
		 */
		HomeRoutes,

		/**
		 * 异步加载的主页路由
		 * 包含权限校验的动态加载页面
		 */
		CodeRoutes,

		/**
		 * 错误页路由
		 * 包含 404、500 等错误页面路径
		 */
		ErrorRoutes,

		/**
		 * 未匹配到的路由
		 * 重定向到 404 页面
		 */
		NotFoundRoute,
	];

	/**
	 * 创建 Hash 路由器
	 */
	const router = createHashRouter(routes as unknown as RouteObject[]);

	return <RouterProvider router={router} />;
}
