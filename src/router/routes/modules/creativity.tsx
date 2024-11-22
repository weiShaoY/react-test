import { Suspense, lazy } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ClockPage = lazy(() => import("@/pages/code/creativity/clock"));
const MuYuPage = lazy(() => import("@/pages/code/creativity/muYu"));
const CalendarPage = lazy(() => import("@/pages/code/creativity/calendar"));
const ScreensaverPage = lazy(
	() => import("@/pages/code/creativity/screensaver"),
);
const TimePage = lazy(() => import("@/pages/code/creativity/time"));
const RipplePage = lazy(() => import("@/pages/code/creativity/ripple"));
const TextPage = lazy(() => import("@/pages/code/creativity/text"));
const CandlePage = lazy(() => import("@/pages/code/creativity/candle"));
const CodeWallPage = lazy(() => import("@/pages/code/creativity/codeWall"));

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
				icon="code-menu-creativity"
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
						icon="code-menu-clock"
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
						icon="code-menu-muYu"
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
						icon="code-menu-calendar"
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
						icon="code-menu-screensaver"
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
						icon="code-menu-time"
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
						icon="code-menu-ripple"
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
						icon="code-menu-text"
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
						icon="code-menu-candle"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "codeWall",
			element: <CodeWallPage />,
			meta: {
				label: "代码墙",
				key: "/creativity/codeWall",
				icon: (
					<SvgIcon
						icon="code-menu-codeWall"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default Creativity;
