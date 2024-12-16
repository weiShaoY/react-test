import {
	Navigate,
	type RouteObject,
	RouterProvider,
	createBrowserRouter,
} from "react-router";

import type { AppRouteObject } from "#/router";

import { ErrorRoutes } from "./modules/error";

import { HomeRoutes } from "./modules/home";

import { FallbackRoute } from "./modules/fallback";

import { GarageRoute } from "./modules/garage";

import { BlogRoutes } from "./modules/blog";

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
		 *  车库路由
		 */
		GarageRoute,

		/**
		 * 异步加载的主页路由
		 */
		BlogRoutes,

		/**
		 * 错误页路由
		 * 包含 404、500 等错误页面路径
		 */
		ErrorRoutes,

		/**
		 * 未匹配到的路由
		 * 重定向到 404 页面
		 */
		FallbackRoute,
	];

	/**
	 * 创建 Hash 路由器
	 */
	// const router = createHashRouter(routes as unknown as RouteObject[]);

	/**
	 *  创建 History 路由器
	 */
	const router = createBrowserRouter(routes as unknown as RouteObject[]);

	return <RouterProvider router={router} />;
}
