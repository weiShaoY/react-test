import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const GoldPage = lazy(() => import("@/pages/blog/price/gold"));

const OilPage = lazy(() => import("@/pages/blog/price/oil"));

const CommodityPage = lazy(() => import("@/pages/blog/price/commodity"));

const CigarettePage = lazy(() => import("@/pages/blog/price/cigarette"));

const Price: AppRouteObject = {
	order: 6,
	path: "price",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "价格",
		icon: "blog-menu-price",
		key: "/price",
	},
	children: [
		{
			index: true,
			element: <Navigate to="gold" replace />,
		},
		{
			path: "gold",
			element: <GoldPage />,
			meta: {
				label: "黄金",
				key: "/price/gold",
				icon: "blog-menu-gold",
			},
		},
		{
			path: "oil",
			element: <OilPage />,
			meta: {
				label: "燃油",
				key: "/price/oil",
				icon: "blog-menu-oil",
			},
		},
		{
			path: "cigarette",
			element: <CigarettePage />,
			meta: {
				label: "香烟",
				key: "/price/cigarette",
				icon: "blog-menu-cigarette",
			},
		},
		{
			path: "commodity",
			element: <CommodityPage />,
			meta: {
				label: "电商",
				key: "/price/commodity",
				icon: "blog-menu-commodity",
			},
		},
	],
};

export default Price;
