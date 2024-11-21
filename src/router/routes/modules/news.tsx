import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const Iframe = lazy(() => import("@/layouts/code/iframe"));

const External = lazy(() => import("@/layouts/code/external"));

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const document: AppRouteObject = {
	order: 2,
	path: "news",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "新闻",
		icon: (
			<SvgIcon icon="code-menu-news" className="ant-menu-item-icon" size="24" />
		),
		key: "/news",
	},
	children: [
		{
			index: true,
			element: <Navigate to="vue" replace />,
		},
		{
			path: "dailyHotTopics",
			element: (
				<Wrapper>
					<Iframe src="https://today.lieme.cn/" />
				</Wrapper>
			),
			meta: {
				label: "每日热点",
				key: "/news/dailyHotTopics",
				icon: (
					<SvgIcon
						icon="code-menu-dailyHotTopics"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default document;
