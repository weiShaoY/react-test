// 用于管理和提供 React Query 的 Client 实例，支持数据缓存和请求状态管理
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 提供 React Query 的开发者工具界面，可以实时查看缓存状态、请求详情
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 用于集成 Vercel Analytics，收集用户访问数据和行为分析
import { Analytics } from "@vercel/analytics/react";

// React 的 Suspense 组件，用于处理异步加载组件的占位和延迟渲染
import { Suspense } from "react";

// 提供 React 18 的新 API，用于渲染 React 组件到 DOM 中
import ReactDOM from "react-dom/client";

// 提供 Helmet 上下文，用于支持动态修改 HTML <head> 中的内容（如标题、meta 信息）
import { HelmetProvider } from "react-helmet-async";

// 引入 SVG 图标的虚拟模块（vite-plugin-svg-icons）
import "virtual:svg-icons-register";

import App from "@/App";

// 引入 Tailwind CSS 样式
import "./theme/index.less";

// 创建一个 QueryClient 实例，用于管理 React Query 的全局配置
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			/**
			 *  查询失败时重试次数
			 */
			retry: 3,

			/**
			 *  垃圾回收时间，缓存有效期为 5 分钟
			 */
			gcTime: 300_000,

			/**
			 *  数据变为 "陈旧" 状态的时间，设置为 10 秒
			 */
			staleTime: 10_1000,

			/**
			 *  禁止在窗口重新聚焦时重新请求数据
			 */
			refetchOnWindowFocus: false,

			/**
			 *  禁止在重新连接网络时重新请求数据
			 */
			refetchOnReconnect: false,

			/**
			 *  禁止组件挂载时重新请求数据
			 */
			refetchOnMount: false,
		},
	},
});

/**
 *  创建 React 应用的根节点
 */
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

// 渲染 React 组件
root.render(
	// HelmetProvider 用于管理 HTML head 标签（如标题、meta 标签）
	<HelmetProvider>
		{/* QueryClientProvider 提供 React Query 的上下文环境 */}
		<QueryClientProvider client={queryClient}>
			{/* ReactQueryDevtools 是 React Query 的开发工具，`initialIsOpen` 控制面板默认关闭 */}
			<ReactQueryDevtools initialIsOpen={false} />

			{/* Suspense 组件，用于处理异步加载（如懒加载组件或数据请求）的等待状态 */}
			<Suspense>
				{/* Vercel 的分析工具，用于统计用户数据 */}
				<Analytics />
				{/* 渲染应用的主组件 */}
				<App />
			</Suspense>
		</QueryClientProvider>
	</HelmetProvider>,
);
