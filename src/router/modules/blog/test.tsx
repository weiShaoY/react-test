import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ApiPage = lazy(() => import("@/pages/blog/test/api"));
const ToastPage = lazy(() => import("@/pages/blog/test/toast"));
const ComponentPage = lazy(() => import("@/pages/blog/test/component"));

const Test: AppRouteObject = {
	order: 100,
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
		{
			path: "toast",
			element: <ToastPage />,
			meta: {
				label: "通知",
				key: "/test/toast",
				icon: "blog-menu-toast",
			},
		},
		{
			path: "component",
			element: <ComponentPage />,
			meta: {
				label: "组件",
				key: "/test/component",
				icon: "blog-menu-component",
			},
		},
	],
};

export default Test;
