import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const Iframe = lazy(() => import("@/layouts/blog/iframe"));

const GoldPricePage = lazy(() => import("@/pages/blog/news/goldPrice"));

const MoviePage = lazy(() => import("@/pages/blog/news/movie"));

const HokPage = lazy(() => import("@/pages/blog/news/hok"));

const OilPage = lazy(() => import("@/pages/blog/news/oil"));

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const News: AppRouteObject = {
	order: 4,
	path: "news",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "资讯",
		icon: "blog-menu-news",
		key: "/news",
	},
	children: [
		{
			index: true,
			element: <Navigate to="dailyHotTopics" replace />,
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
				icon: "blog-menu-dailyHotTopics",
			},
		},
		{
			path: "goldPrice",
			element: <GoldPricePage />,
			meta: {
				label: "金价",
				key: "/news/goldPrice",
				icon: "blog-menu-goldPrice",
			},
		},
		{
			path: "movie",
			element: <MoviePage />,
			meta: {
				label: "电影",
				key: "/news/movie",
				icon: "blog-menu-movie",
			},
		},
		{
			path: "hok",
			element: <HokPage />,
			meta: {
				label: "王者荣耀",
				key: "/news/hok",
				icon: "blog-menu-hok",
			},
		},
		{
			path: "oil",
			element: <OilPage />,
			meta: {
				label: "油价",
				key: "/news/oil",
				icon: "blog-menu-oil",
			},
		},
	],
};

export default News;
