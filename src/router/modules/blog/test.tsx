import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ApiPage = lazy(() => import("@/pages/blog/test/api"));

const Test: AppRouteObject = {
	order: 10,
	path: "test",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "测试",
		icon: "blog-menu-test",
		key: "/test",
	},
	children: [
		{
			index: true,
			element: <Navigate to="api" replace />,
		},
		{
			path: "api",
			element: <ApiPage />,
			meta: {
				label: "接口",
				key: "/test/api",
				icon: "blog-menu-api",
			},
		},
	],
};

export default Test;
