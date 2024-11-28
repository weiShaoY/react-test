// 从React库导入Suspense、lazy和useMemo，分别用于延迟加载组件、懒加载和缓存计算结果
import { useMemo } from "react";

import { getBlogModuleRoutes } from "@/router/modules/blog";

/**
 * 获取blog模块的路由配置
 * @returns  路由数组
 */
export function useBlogRoutes() {
	//  静态路由表
	return useMemo(() => {
		return getBlogModuleRoutes();
	}, []);
}
