import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const VideoPage = lazy(() => import("@/pages/blog/media/video"));

const WallpaperPage = lazy(() => import("@/pages/blog/media/wallpaper"));

const Media: AppRouteObject = {
	order: 4,
	path: "media",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "媒体",
		icon: (
			<SvgIcon
				icon="blog-menu-media"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
		key: "/media",
	},
	children: [
		{
			index: true,
			element: <Navigate to="girl" replace />,
		},
		{
			path: "wallpaper",
			element: <WallpaperPage />,
			meta: {
				label: "壁纸",
				key: "/media/wallpaper",
				icon: (
					<SvgIcon
						icon="blog-menu-wallpaper"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},

		{
			path: "video",
			element: <VideoPage />,
			meta: {
				label: "视频",
				key: "/media/video",
				icon: (
					<SvgIcon
						icon="blog-menu-video"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default Media;
