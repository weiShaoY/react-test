import { CircleLoading } from "@/components/loading";
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";
import type { AppRouteObject } from "#/router";

const Iframe = lazy(() => import("@/layouts/blog/iframe"));
const External = lazy(() => import("@/layouts/blog/external"));

/**
 * 包装组件，统一处理 Suspense
 * @param  children 子组件
 */
function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

/**
 * 子路由配置数组
 */
const childRoutes = [
	{
		path: "typeScript",
		src: "https://www.typescriptlang.org/zh/",
		label: "TypeScript",
		key: "/document/typeScript",
		icon: "blog-menu-typeScript",
	},
	{
		path: "vite",
		src: "https://cn.vitejs.dev/guide/",
		label: "Vite",
		key: "/document/vite",
		icon: "blog-menu-vite",
	},
	{
		path: "react",
		src: "https://zh-hans.react.dev/",
		label: "React",
		key: "/document/react",
		icon: "blog-menu-react",
	},
	{
		path: "vue",
		src: "https://cn.vuejs.org/",
		label: "Vue",
		key: "/document/vue",
		icon: "blog-menu-vue",
		external: true,
		hideTab: true,
	},
	{
		path: "angular",
		src: "https://angular.io/",
		label: "Angular",
		key: "/document/angular",
		icon: "blog-menu-angular",
	},
	{
		path: "pinia",
		src: "https://pinia.vuejs.org/zh/",
		label: "Pinia",
		key: "/document/pinia",
		icon: "blog-menu-pinia",
	},
	{
		path: "vueuse",
		src: "https://vueuse.pages.dev/",
		label: "VueUse",
		key: "/document/vueuse",
		icon: "blog-menu-vueuse",
	},
	{
		path: "unocss",
		src: "https://unocss-cn.pages.dev/",
		label: "Unocss",
		key: "/document/unocss",
		icon: "blog-menu-unocss",
	},
	{
		path: "tailwindCss",
		src: "https://tailwindcss.com/docs/installation",
		label: "TailwindCss",
		key: "/document/tailwindCss",
		icon: "blog-menu-tailwindCss",
	},
	{
		path: "eslint",
		src: "https://eslint.org/docs/latest/",
		label: "Eslint",
		key: "/document/eslint",
		icon: "blog-menu-eslint",
	},

	{
		path: "biomejs",
		src: "https://biomejs.dev/zh-cn/guides/getting-started/",
		label: "Biomejs",
		key: "/document/biomejs",
		icon: "blog-menu-biomejs",
	},
	{
		path: "docker",
		src: "https://docs.docker.com/build-cloud/",
		label: "Docker",
		key: "/document/docker",
		icon: "blog-menu-docker",
		external: true,
		hideTab: true,
	},
	{
		path: "echarts",
		src: "https://echarts.apache.org/zh/index.html",
		label: "Echarts",
		key: "/document/echarts",
		icon: "blog-menu-echarts",
		external: true,
		hideTab: true,
	},
	{
		path: "nginx",
		src: "https://nginx.org/en/docs/",
		label: "Nginx",
		key: "/document/nginx",
		icon: "blog-menu-nginx",
	},
	{
		path: "electron",
		src: "https://www.electronjs.org/zh/docs/latest/",
		label: "Electron",
		key: "/document/electron",
		icon: "blog-menu-electron",
	},
	{
		path: "nextJs",
		src: "https://www.nextjs.cn/",
		label: "NextJs",
		key: "/document/nextJs",
		icon: "blog-menu-nextJs",
		external: true,
		hideTab: true,
	},
];

const Document: AppRouteObject = {
	order: 2,
	path: "document",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "文档",
		icon: "blog-menu-document",
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
					icon,
					...(hideTab && { hideTab }),
				},
			}),
		),
	],
};

export default Document;
