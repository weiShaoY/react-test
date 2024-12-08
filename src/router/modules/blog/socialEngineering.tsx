import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const QichachaPage = lazy(
	() => import("@/pages/blog/socialEngineering/qichacha"),
);

const LicensePlatePage = lazy(
	() => import("@/pages/blog/socialEngineering/licensePlate"),
);

const WhoisPage = lazy(
	() => import("@/pages/blog/socialEngineering/whois"),
);

const SocialEngineering: AppRouteObject = {
	order: 6,
	path: "socialEngineering",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "社工",
		icon: "blog-menu-socialEngineering",
		key: "/socialEngineering",
	},
	children: [
		{
			index: true,
			element: <Navigate to="qichacha" replace />,
		},
		{
			path: "qichacha",
			element: <QichachaPage />,
			meta: {
				label: "企查查",
				key: "/socialEngineering/qichacha",
				icon: "blog-menu-qichacha",
			},
		},
		{
			path: "licensePlate",
			element: <LicensePlatePage />,
			meta: {
				label: "车牌查询",
				key: "/socialEngineering/licensePlate",
				icon: "blog-menu-licensePlate",
			},
		},
		{
			path: "whois",
			element: <WhoisPage />,
			meta: {
				label: "域名查询",
				key: "/socialEngineering/whois",
				icon: "blog-menu-whois",
			},
		},
	],
};

export default SocialEngineering;
