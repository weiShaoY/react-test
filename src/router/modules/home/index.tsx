import { CircleLoading } from "@/components/loading";
import { Navigate, Outlet } from "react-router";

import type { AppRouteObject } from "#/router";

import { Suspense, lazy } from "react";

import HomeLayout from "@/layouts/home";

const AboutPage = lazy(() => import("@/pages/home/about"));

const WorkPage = lazy(() => import("@/pages/home/work"));

const ContactPage = lazy(() => import("@/pages/home/contact"));

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
			path: "work",
			element: <WorkPage />,
		},
		{
			path: "contact",
			element: <ContactPage />,
		},
	],
};
