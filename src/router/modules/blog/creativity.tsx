import { Suspense, lazy } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";

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
		icon: (
			<SvgIcon
				icon="blog-menu-creativity"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
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
				icon: (
					<SvgIcon
						icon="blog-menu-clock"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},

		{
			path: "muYu",
			element: <MuYuPage />,
			meta: {
				label: "木鱼",
				key: "/creativity/muYu",
				icon: (
					<SvgIcon
						icon="blog-menu-muYu"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},

		{
			path: "calendar",
			element: <CalendarPage />,
			meta: {
				label: "日历",
				key: "/creativity/calendar",
				icon: (
					<SvgIcon
						icon="blog-menu-calendar"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "screensaver",
			element: <ScreensaverPage />,
			meta: {
				label: "屏保",
				key: "/creativity/screensaver",
				icon: (
					<SvgIcon
						icon="blog-menu-screensaver"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "time",
			element: <TimePage />,
			meta: {
				label: "时间",
				key: "/creativity/time",
				icon: (
					<SvgIcon
						icon="blog-menu-time"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "ripple",
			element: <RipplePage />,
			meta: {
				label: "水波",
				key: "/creativity/ripple",
				icon: (
					<SvgIcon
						icon="blog-menu-ripple"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "text",
			element: <TextPage />,
			meta: {
				label: "文字",
				key: "/creativity/text",
				icon: (
					<SvgIcon
						icon="blog-menu-text"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},

		{
			path: "candle",
			element: <CandlePage />,
			meta: {
				label: "蜡烛",
				key: "/creativity/candle",
				icon: (
					<SvgIcon
						icon="blog-menu-candle"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "codeWall",
			element: <BlogWallPage />,
			meta: {
				label: "代码墙",
				key: "/creativity/codeWall",
				icon: (
					<SvgIcon
						icon="blog-menu-codeWall"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default Creativity;
