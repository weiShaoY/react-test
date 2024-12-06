import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const Iframe = lazy(() => import("@/layouts/blog/iframe"));

const GoldPricePage = lazy(() => import("@/pages/blog/news/goldPrice"));

const MoviePage = lazy(() => import("@/pages/blog/news/movie"));

const HokPage = lazy(() => import("@/pages/blog/news/hok"));

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const News: AppRouteObject = {
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
			<SvgIcon icon="blog-menu-news" className="ant-menu-item-icon" size="24" />
		),
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
				icon: (
					<SvgIcon
						icon="blog-menu-dailyHotTopics"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "goldPrice",
			element: <GoldPricePage />,
			meta: {
				label: "金价",
				key: "/news/goldPrice",
				icon: (
					<SvgIcon
						icon="blog-menu-goldPrice"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "movie",
			element: <MoviePage />,
			meta: {
				label: "电影",
				key: "/news/movie",
				icon: (
					<SvgIcon
						icon="blog-menu-movie"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "hok",
			element: <HokPage />,
			meta: {
				label: "王者荣耀",
				key: "/news/hok",
				icon: (
					<SvgIcon
						icon="blog-menu-hok"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default News;
