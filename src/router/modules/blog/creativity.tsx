import { Suspense, lazy } from "react";

import { Navigate, Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ClockPage = lazy(() => import("@/pages/blog/creativity/clock"));

const MuYuPage = lazy(() => import("@/pages/blog/creativity/muYu"));

const CalendarPage = lazy(() => import("@/pages/blog/creativity/calendar"));

const ScreensaverPage = lazy(
	() => import("@/pages/blog/creativity/screensaver"),
);
const TimePage = lazy(() => import("@/pages/blog/creativity/time"));

const RipplePage = lazy(() => import("@/pages/blog/creativity/ripple"));

const TextPage = lazy(() => import("@/pages/blog/creativity/text"));

const CandlePage = lazy(() => import("@/pages/blog/creativity/candle"));

const BlogWallPage = lazy(() => import("@/pages/blog/creativity/codeWall"));

const Creativity: AppRouteObject = {
	order: 3,
	path: "creativity",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "创意",
		icon: "blog-menu-creativity",
		key: "/creativity",
	},
	children: [
		{
			index: true,
			element: <Navigate to="clock" replace />,
		},

		{
			path: "clock",
			element: <ClockPage />,
			meta: {
				label: "时钟",
				key: "/creativity/clock",
				icon: "blog-menu-clock",
			},
		},
		{
			path: "muYu",
			element: <MuYuPage />,
			meta: {
				label: "木鱼",
				key: "/creativity/muYu",
				icon: "blog-menu-muYu",
			},
		},
		{
			path: "calendar",
			element: <CalendarPage />,
			meta: {
				label: "日历",
				key: "/creativity/calendar",
				icon: "blog-menu-calendar",
			},
		},
		{
			path: "screensaver",
			element: <ScreensaverPage />,
			meta: {
				label: "屏保",
				key: "/creativity/screensaver",
				icon: "blog-menu-screensaver",
			},
		},
		{
			path: "time",
			element: <TimePage />,
			meta: {
				label: "时间",
				key: "/creativity/time",
				icon: "blog-menu-time",
			},
		},
		{
			path: "ripple",
			element: <RipplePage />,
			meta: {
				label: "水波",
				key: "/creativity/ripple",
				icon: "blog-menu-ripple",
			},
		},
		{
			path: "text",
			element: <TextPage />,
			meta: {
				label: "文字",
				key: "/creativity/text",
				icon: "blog-menu-text",
			},
		},
		{
			path: "candle",
			element: <CandlePage />,
			meta: {
				label: "蜡烛",
				key: "/creativity/candle",
				icon: "blog-menu-candle",
			},
		},
		{
			path: "codeWall",
			element: <BlogWallPage />,
			meta: {
				label: "代码墙",
				key: "/creativity/codeWall",
				icon: "blog-menu-codeWall",
			},
		},
	],
};

export default Creativity;
