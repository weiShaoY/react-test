import type { AppRouteObject } from "#/router";

import { Navigate } from "react-router";

/**
 * 未找到路由
 * @description  重定向到 404 页面
 */
export const FallbackRoute: AppRouteObject = {
	path: "*",
	element: <Navigate to="/404" replace />,
};
