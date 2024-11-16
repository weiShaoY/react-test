import { Suspense, lazy } from "react";

import { SvgIcon } from "@/components/icon";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const Workbench = lazy(() => import(`@/pages/workbench`));

const workbench: AppRouteObject = {
	order: 1,
	path: "workbench",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Workbench />
		</Suspense>
	),
	meta: {
		label: "工作台",
		icon: (
			<SvgIcon icon="menu-workbench" className="ant-menu-item-icon" size="24" />
		),
		key: "/workbench",
	},
};

export default workbench;
