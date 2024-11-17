import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/home"));

/**
 * ErrorRoutes: 错误页面路由配置
 * 包含 403, 404, 500 三个错误页面
 */
export const HomeRoutes: AppRouteObject = {
	path: "/home",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<HomePage />
		</Suspense>
	),
};
