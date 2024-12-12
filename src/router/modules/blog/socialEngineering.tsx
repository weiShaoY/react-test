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

const DomainPage = lazy(() => import("@/pages/blog/socialEngineering/domain"));

const LoveSpeechPage = lazy(
	() => import("@/pages/blog/socialEngineering/loveSpeech"),
);

const LogisticPage = lazy(
	() => import("@/pages/blog/socialEngineering/logistic"),
);

const CommodityPricePage = lazy(
	() => import("@/pages/blog/socialEngineering/commodityPrice"),
);

const AccountPage = lazy(
	() => import("@/pages/blog/socialEngineering/account"),
);

const CigarettePage = lazy(
	() => import("@/pages/blog/socialEngineering/cigarette"),
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
			path: "domain",
			element: <DomainPage />,
			meta: {
				label: "域名查询",
				key: "/socialEngineering/domain",
				icon: "blog-menu-domain",
			},
		},
		{
			path: "loveSpeech",
			element: <LoveSpeechPage />,
			meta: {
				label: "恋爱话术",
				key: "/socialEngineering/loveSpeech",
				icon: "blog-menu-loveSpeech",
			},
		},
		{
			path: "logistic",
			element: <LogisticPage />,
			meta: {
				label: "物流查询",
				key: "/socialEngineering/logistic",
				icon: "blog-menu-logistic",
			},
		},
		{
			path: "commodityPrice",
			element: <CommodityPricePage />,
			meta: {
				label: "商品价格",
				key: "/socialEngineering/commodityPrice",
				icon: "blog-menu-commodityPrice",
			},
		},
		{
			path: "account",
			element: <AccountPage />,
			meta: {
				label: "账号查询",
				key: "/socialEngineering/account",
				icon: "blog-menu-account",
			},
		},
		{
			path: "cigarette",
			element: <CigarettePage />,
			meta: {
				label: "香烟价格",
				key: "/socialEngineering/cigarette",
				icon: "blog-menu-cigarette",
			},
		},
	],
};

export default SocialEngineering;
