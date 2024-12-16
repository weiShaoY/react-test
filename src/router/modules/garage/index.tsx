import { Suspense, lazy } from "react";

import { Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const GaragePage = lazy(() => import("@/pages/garage"));

/**
 *  车库路由
 */
export const GarageRoute: AppRouteObject = {
	element: (
		<Suspense fallback={<CircleLoading />}>
			{" "}
			{/* 懒加载时显示加载动画 */}
			{/* 占位符，用于渲染子路由的组件 */}
			<Outlet />
		</Suspense>
	),
	children: [{ path: "garage", element: <GaragePage /> }],
};
