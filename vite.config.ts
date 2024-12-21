import path from "node:path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import glsl from "vite-plugin-glsl";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const base = env.VITE_APP_BASE_PATH || "/";
	const isProduction = mode === "production";

	return {
		base,
		alias: {
			"@/": `${path.resolve(__dirname, "src")}/`,
		},
		plugins: [
			glsl({
				// warnDuplicatedImports: false,
			}),
			react(),
			tsconfigPaths(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]",
			}),
			isProduction &&
				visualizer({
					open: true,
					gzipSize: true,
					brotliSize: true,
				}),
		],

		// server: {
		// 	proxy: {
		// 		"/api": {
		// 			changeOrigin: true, //  是否跨域
		// 			secure: false,
		// 		},
		// 	},
		// },
		server: {
			open: true,
			host: true,
			port: 1819,
			proxy: {
				// "/api": {
				// 	// target: "http://localhost:3000",
				// 	changeOrigin: true,
				// 	rewrite: (path) => path.replace(/^\/api/, ""),
				// },
			},
		},

		optimizeDeps: {
			// 指定需要预构建的依赖模块，用于加快开发阶段的冷启动速度
			include: ["react", "react-dom", "react-router", "antd"],
		},
		esbuild: {
			// 配置代码压缩相关选项
			// 如果当前环境是生产模式，则移除 console 和 debugger 语句以优化代码
			drop: isProduction ? ["console", "debugger"] : [],
		},
		build: {
			// // 指定构建目标为 esnext，支持最新的 ECMAScript 特性
			// target: "esnext",
			// // 使用 esbuild 进行代码压缩，速度更快且性能优异
			// minify: "esbuild",
			// // 是否生成 source map 文件，设置为 false 以减少包大小
			// sourcemap: false,
			// // 启用 CSS 代码拆分，将 CSS 提取到独立的文件
			// cssCodeSplit: true,
			// // 设置单个 chunk 的大小警告阈值为 1000 KB，避免不必要的警告信息
			// chunkSizeWarningLimit: 1000,

			// rollupOptions: {
			// 	output: {
			// 		// 手动分包策略，将常用依赖分组，提升加载性能和缓存利用率
			// 		manualChunks: {
			// 			// React 相关的核心库单独打包
			// 			"vendor-react": ["react", "react-dom", "react-router"],
			// 			// Ant Design 相关的 UI 库单独打包
			// 			"vendor-antd": ["antd", "@ant-design/icons", "@ant-design/cssinjs"],
			// 			// 图表相关的库单独打包
			// 			"vendor-charts": ["apexcharts", "react-apexcharts"],
			// 			// 工具函数库单独打包
			// 			"vendor-utils": ["axios", "dayjs", "zustand"],
			// 			// UI 动画和样式相关的库单独打包
			// 			"vendor-ui": [
			// 				"framer-motion",
			// 				"styled-components",
			// 				"@iconify/react",
			// 			],
			// 		},
			// 	},
			// },
		},
	};
});
