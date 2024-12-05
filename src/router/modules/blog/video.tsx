import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const GirlPage = lazy(() => import("@/pages/blog/video/girl"));

const document: AppRouteObject = {
	order: 4,
	path: "video",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "视频",
		icon: (
			<SvgIcon
				icon="blog-menu-video"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
		key: "/video",
	},
	children: [
		{
			index: true,
			element: <Navigate to="girl" replace />,
		},

		{
			path: "girl",
			element: <GirlPage />,
			meta: {
				label: "美女",
				key: "/video/girl",
				icon: (
					<SvgIcon
						icon="blog-menu-girl"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default document;
