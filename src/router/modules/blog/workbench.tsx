import { Suspense, lazy } from "react";

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
		icon: "blog-menu-workbench",
		key: "/workbench",
	},
};

export default Workbench;
