import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const Iframe = lazy(() => import("@/pages/sys/others/iframe"));

const ExternalLink = lazy(
	() => import("@/pages/sys/others/iframe/external-link"),
);

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const document: AppRouteObject = {
	order: 2,
	path: "document",
	// element: (
	// 	<Suspense fallback={<CircleLoading />}>
	// 		<Outlet />
	// 	</Suspense>
	// ),
	meta: {
		label: "文档",
		icon: (
			<SvgIcon icon="menu-document" className="ant-menu-item-icon" size="24" />
		),
		key: "/document",
	},
	children: [
		{
			path: "react",
			element: (
				<Wrapper>
					<Iframe src="https://zh-hans.react.dev/" />
				</Wrapper>
			),
			meta: {
				label: "React",
				key: "/document/react",
				icon: (
					<SvgIcon icon="menu-react" className="ant-menu-item-icon" size="24" />
				),
			},
		},
		{
			index: true,
			element: <Navigate to="vue" replace />,
		},
		{
			path: "vue",
			element: (
				<Wrapper>
					<ExternalLink src="https://cn.vuejs.org/" />
				</Wrapper>
			),
			meta: {
				label: "Vue",
				key: "/document/vue",
				icon: (
					<SvgIcon icon="menu-vue" className="ant-menu-item-icon" size="24" />
				),
				//  在多标签页中隐藏
				hideTab: true,
			},
		},
		{
			path: "angular",
			element: (
				<Wrapper>
					<Iframe src="https://angular.io/" />
				</Wrapper>
			),
			meta: {
				label: "Angular",
				key: "/document/angular",
				icon: (
					<SvgIcon
						icon="menu-angular"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "typeScript",
			element: (
				<Wrapper>
					<Iframe src="https://www.typescriptlang.org/zh/" />
				</Wrapper>
			),
			meta: {
				label: "TypeScript",
				key: "/document/typeScript",
				icon: (
					<SvgIcon
						icon="menu-typeScript"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "pinia",
			element: (
				<Wrapper>
					<Iframe src="https://pinia.vuejs.org/zh/" />
				</Wrapper>
			),
			meta: {
				label: "Pinia",
				key: "/document/pinia",
				icon: (
					<SvgIcon icon="menu-pinia" className="ant-menu-item-icon" size="24" />
				),
			},
		},
		{
			path: "vueuse",
			element: (
				<Wrapper>
					<Iframe src="https://vueuse.pages.dev/" />
				</Wrapper>
			),
			meta: {
				label: "VueUse",
				key: "/document/vueuse",
				icon: (
					<SvgIcon
						icon="menu-vueuse"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "unocss",
			element: (
				<Wrapper>
					<Iframe src="https://unocss-cn.pages.dev/" />
				</Wrapper>
			),
			meta: {
				label: "Unocss",
				key: "/document/unocss",
				icon: (
					<SvgIcon
						icon="menu-unocss"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
		{
			path: "tailwindCss",
			element: (
				<Wrapper>
					<Iframe src="https://tailwindcss.com/docs/installation" />
				</Wrapper>
			),
			meta: {
				label: "TailwindCss",
				key: "/document/tailwindCss",
				icon: (
					<SvgIcon
						icon="menu-tailwindCss"
						className="ant-menu-item-icon"
						size="24"
					/>
				),
			},
		},
	],
};

export default document;
