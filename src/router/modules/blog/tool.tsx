import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const MorsePage = lazy(() => import("@/pages/blog/tool/codec/morse"));

const Base64Page = lazy(() => import("@/pages/blog/tool/codec/base64"));

const Md5Page = lazy(() => import("@/pages/blog/tool/codec/md5"));

const Tool: AppRouteObject = {
	order: 11,
	path: "tool",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "工具",
		icon: "blog-menu-tool",
		key: "/tool",
	},
	children: [
		{
			index: true,
			element: <Navigate to="codec" replace />,
		},
		{
			path: "codec",
			meta: {
				label: "编码解码",
				key: "/tool/codec",
				icon: "blog-menu-codec",
			},
			children: [
				{
					index: true,
					element: <Navigate to="codec" replace />,
				},
				{
					path: "morse",
					element: <MorsePage />,
					meta: {
						label: "摩斯电码",
						key: "/tool/codec/morse",
						icon: "blog-menu-morse",
					},
				},
				{
					path: "base64",
					element: <Base64Page />,
					meta: {
						label: "Base64",
						key: "/tool/codec/base64",
						icon: "blog-menu-base64",
					},
				},
				{
					path: "md5",
					element: <Md5Page />,
					meta: {
						label: "Md5",
						key: "/tool/codec/md5",
						icon: "blog-menu-md5",
					},
				},
			],
		},
	],
};

export default Tool;
