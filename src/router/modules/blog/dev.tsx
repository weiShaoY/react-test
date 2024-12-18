import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";
/**
 * 包装组件，统一处理 Suspense
 * @param  children 子组件
 */
function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

const Iframe = lazy(() => import("@/layouts/blog/iframe"));

const External = lazy(() => import("@/layouts/blog/external"));

const Dev: AppRouteObject = {
	order: 2,
	path: "dev",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "开发",
		icon: "blog-menu-dev",
		key: "/dev",
	},
	children: [
		{
			index: true,
			element: <Navigate to="tool" replace />,
		},
		{
			path: "format",
			element: (
				<Wrapper>
					<Iframe src="https://highlightjs.org/demo" />
				</Wrapper>
			),
			meta: {
				label: "代码格式化",
				key: "/dev/format",
				icon: "blog-menu-format",
			},
		},
		{
			path: "image",
			element: (
				<Wrapper>
					<External src="https://carbon.now.sh/" />
				</Wrapper>
			),
			meta: {
				label: "代码转图片",
				key: "/dev/image",
				icon: "blog-menu-image",
			},
		},
		{
			path: "npm",
			element: (
				<Wrapper>
					<Iframe src="https://pkg-graph.info/" />
				</Wrapper>
			),
			meta: {
				label: "Npm可视化",
				key: "/dev/npm",
				icon: "blog-menu-npm",
			},
		},
	],
};

export default Dev;
