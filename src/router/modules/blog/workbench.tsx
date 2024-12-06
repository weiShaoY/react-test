import { Suspense, lazy } from "react";

import { SvgIcon } from "@/components/icon";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const WorkbenchPage = lazy(() => import("@/pages/blog/workbench"));

const Workbench: AppRouteObject = {
	order: 1,
	path: "workbench",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<WorkbenchPage />
		</Suspense>
	),
	meta: {
		label: "工作台",
		icon: (
			<SvgIcon
				icon="blog-menu-workbench"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
		key: "/workbench",
	},
};

export default Workbench;
