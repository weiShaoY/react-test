import { Suspense, lazy } from "react";

import { Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import SimpleLayout from "@/layouts/simple";

import type { AppRouteObject } from "#/router";

const Page403 = lazy(() => import("@/pages/error/Page403"));
const Page404 = lazy(() => import("@/pages/error/Page404"));
const Page500 = lazy(() => import("@/pages/error/Page500"));

/**
 * 错误页面路由
 * @description 包含 403, 404, 500 三个错误页面
 */
export const ErrorRoutes: AppRouteObject = {
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
		{ path: "403", element: <Page403 /> }, // 403 页面路径和对应组件
		{ path: "404", element: <Page404 /> }, // 404 页面路径和对应组件
		{ path: "500", element: <Page500 /> }, // 500 页面路径和对应组件
	],
};
