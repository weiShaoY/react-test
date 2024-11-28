import { CircleLoading } from "@/components/loading";
import { Outlet, Navigate } from "react-router-dom";

import type { AppRouteObject } from "#/router";

import { Suspense, lazy } from "react";

import HomeLayout from "@/layouts/home";

const AboutPage = lazy(() => import("@/pages/home/about"));

const ResumePage = lazy(() => import("@/pages/home/resume"));

/**
 *  首页路由
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
