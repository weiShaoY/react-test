// 从React库导入Suspense、lazy和useMemo，分别用于延迟加载组件、懒加载和缓存计算结果
import { useMemo } from "react";

import { getCodeModuleRoutes } from "@/router/utils";

/**
 * 获取code模块的路由配置
 * @returns  路由数组
 */
export function useCodeRoutes() {
	//  静态路由表
	return useMemo(() => {
		return getCodeModuleRoutes();
	}, []);
}
