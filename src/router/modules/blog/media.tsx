import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const VideoPage = lazy(() => import("@/pages/blog/media/video"));

const WallpaperPage = lazy(() => import("@/pages/blog/media/wallpaper"));

const VoicePage = lazy(() => import("@/pages/blog/media/voice"));

const MusicPage = lazy(() => import("@/pages/blog/media/music"));

const Media: AppRouteObject = {
	order: 5,
	path: "media",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "媒体",
		icon: "blog-menu-media",
		key: "/media",
	},
	children: [
		{
			index: true,
			element: <Navigate to="wallpaper" replace />,
		},
		{
			path: "wallpaper",
			element: <WallpaperPage />,
			meta: {
				label: "壁纸",
				key: "/media/wallpaper",
				icon: "blog-menu-wallpaper",
			},
		},

		{
			path: "video",
			element: <VideoPage />,
			meta: {
				label: "视频",
				key: "/media/video",
				icon: "blog-menu-video",
			},
		},

		{
			path: "voice",
			element: <VoicePage />,
			meta: {
				label: "语音",
				key: "/media/voice",
				icon: "blog-menu-voice",
			},
		},
		{
			path: "music",
			element: <MusicPage />,
			meta: {
				label: "音乐",
				key: "/media/music",
				icon: "blog-menu-music",
			},
		},
	],
};

export default Media;
