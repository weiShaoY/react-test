import type { AppRouteObject } from "#/router";

import { Navigate } from "react-router-dom";

/**
 *  未找到路由配置
 *  重定向到 404 页面
 */
export const NotFoundRoute: AppRouteObject = {
	path: "*",
	element: <Navigate to="/404" replace />,
};
