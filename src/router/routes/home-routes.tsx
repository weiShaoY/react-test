import { CircleLoading } from "@/components/loading";
import { Outlet, Navigate } from "react-router-dom";

import type { AppRouteObject } from "#/router";

import { Suspense, lazy } from "react";

import HomeLayout from "@/layouts/home";

const AboutPage = lazy(() => import("@/pages/home/about"));

const ResumePage = lazy(() => import("@/pages/home/resume"));

/**
 * ErrorRoutes: 错误页面路由配置
 * 包含 403, 404, 500 三个错误页面
 */
export const HomeRoutes: AppRouteObject = {
	path: "home",
	element: (
		<HomeLayout>
			<Suspense fallback={<CircleLoading />}>
				<Outlet />
			</Suspense>
		</HomeLayout>
	),
	children: [
		{
			index: true,
			element: <Navigate to="about" replace />,
		},

		{
			path: "about",
			element: <AboutPage />,
		},
		{
			path: "resume",
			element: <ResumePage />,
		},
	],
};
