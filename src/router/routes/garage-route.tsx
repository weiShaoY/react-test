import { Suspense, lazy } from "react";

import { Outlet } from "react-router-dom";

import { CircleLoading } from "@/components/loading";

import SimpleLayout from "@/layouts/simple";

import type { AppRouteObject } from "#/router";

// 使用 React.lazy 动态加载错误页面组件
const GaragePage = lazy(() => import("@/pages/garage"));

/**
 * ErrorRoutes: 错误页面路由配置
 * 包含 403, 404, 500 三个错误页面
 */
export const GarageRoute: AppRouteObject = {
	element: (
		<SimpleLayout>
			{" "}
			{/* 使用简单布局包裹错误页面 */}
			<Suspense fallback={<CircleLoading />}>
				{" "}
				{/* 懒加载时显示加载动画 */}
				{/* 占位符，用于渲染子路由的组件 */}
				<Outlet />
			</Suspense>
		</SimpleLayout>
	),
	children: [
		{ path: "garage", element: <GaragePage /> }, // 403 页面路径和对应组件
	],
};
