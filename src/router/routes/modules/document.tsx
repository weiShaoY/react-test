import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { AppRouteObject } from "#/router";

const Iframe = lazy(() => import("@/layouts/code/iframe"));
const External = lazy(() => import("@/layouts/code/external"));

/**
 * 包装组件，统一处理 Suspense
 * @param  children 子组件
 */
function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

/**
 * 子路由配置数组
 * @type {Array<{ path: string, src: string, label: string, key: string, icon: string, external?: boolean, hideTab?: boolean }>}
 */
const childRoutes = [
	{
		path: "react",
		src: "https://zh-hans.react.dev/",
		label: "React",
		key: "/document/react",
		icon: "code-menu-react",
	},
	{
		path: "vue",
		src: "https://cn.vuejs.org/",
		label: "Vue",
		key: "/document/vue",
		icon: "code-menu-vue",
		external: true,
		hideTab: true,
	},
	{
		path: "angular",
		src: "https://angular.io/",
		label: "Angular",
		key: "/document/angular",
		icon: "code-menu-angular",
	},
	{
		path: "typeScript",
		src: "https://www.typescriptlang.org/zh/",
		label: "TypeScript",
		key: "/document/typeScript",
		icon: "code-menu-typeScript",
	},
	{
		path: "pinia",
		src: "https://pinia.vuejs.org/zh/",
		label: "Pinia",
		key: "/document/pinia",
		icon: "code-menu-pinia",
	},
	{
		path: "vueuse",
		src: "https://vueuse.pages.dev/",
		label: "VueUse",
		key: "/document/vueuse",
		icon: "code-menu-vueuse",
	},
	{
		path: "unocss",
		src: "https://unocss-cn.pages.dev/",
		label: "Unocss",
		key: "/document/unocss",
		icon: "code-menu-unocss",
	},
	{
		path: "tailwindCss",
		src: "https://tailwindcss.com/docs/installation",
		label: "TailwindCss",
		key: "/document/tailwindCss",
		icon: "code-menu-tailwindCss",
	},
	{
		path: "eslint",
		src: "https://eslint.org/docs/latest/",
		label: "Eslint",
		key: "/document/eslint",
		icon: "code-menu-eslint",
	},
	{
		path: "vite",
		src: "https://cn.vitejs.dev/guide/",
		label: "Vite",
		key: "/document/vite",
		icon: "code-menu-vite",
	},
	{
		path: "biome",
		src: "https://biomejs.dev/zh-cn/guides/getting-started/",
		label: "Biome",
		key: "/document/biome",
		icon: "code-menu-biome",
	},
];

const document: AppRouteObject = {
	order: 2,
	path: "document",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "文档",
		icon: (
			<SvgIcon
				icon="code-menu-document"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
		key: "/document",
	},
	children: [
		{
			index: true,
			element: <Navigate to="react" replace />,
		},
		...childRoutes.map(
			({ path, src, label, key, icon, external, hideTab }) => ({
				path,
				element: (
					<Wrapper>
						{external ? <External src={src} /> : <Iframe src={src} />}
					</Wrapper>
				),
				meta: {
					label,
					key,
					icon: (
						<SvgIcon icon={icon} className="ant-menu-item-icon" size="24" />
					),
					...(hideTab && { hideTab }),
				},
			}),
		),
	],
};

export default document;
