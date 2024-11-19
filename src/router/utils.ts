import { ascend } from "ramda";
import type { AppRouteObject, RouteMeta } from "#/router";

/**
 * 筛选并排序菜单路由
 * @param  items - 路由对象数组
 * @returns  返回经过筛选和排序后的菜单路由数组
 */
export const menuFilter = (items: AppRouteObject[]) => {
	return (
		items
			.filter((item) => {
				// 根据 meta.key 判断是否显示菜单项
				const show = item.meta?.key;
				// 如果有子路由，递归过滤子路由
				if (show && item.children) {
					item.children = menuFilter(item.children);
				}
				return show;
			})
			// 使用 Ramda 的 ascend 方法根据 order 字段对菜单项进行升序排序
			.sort(ascend((item) => item.order || Number.POSITIVE_INFINITY))
	);
};

/**
 * 获取用于侧边栏菜单的路由
 * @param  appRouteObjects - 路由对象数组
 * @returns  返回经过过滤和排序后的菜单路由
 */
export function getMenuRoutes(appRouteObjects: AppRouteObject[]) {
	// 过滤并返回菜单路由
	return menuFilter(appRouteObjects);
}

/**
 * 扁平化菜单路由，返回包含 meta 信息的数组
 * @param  routes - 路由对象数组
 * @returns  返回扁平化后的路由 meta 信息数组
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
	return routes.reduce<RouteMeta[]>((prev, item) => {
		const { meta, children } = item;
		// 如果路由项有 meta 信息，添加到结果数组中
		if (meta) prev.push(meta);
		// 递归处理子路由，合并子路由的 meta 信息
		if (children) prev.push(...flattenMenuRoutes(children));
		return prev;
	}, []);
}

/**
 * 获取code模块路由
 *
 * @returns {AppRouteObject[]} 过滤后的路由列表
 */
export function getCodeModuleRoutes(): AppRouteObject[] {
	/**
	 * 用于存储动态加载的菜单模块路由
	 */
	const menuModules: AppRouteObject[] = [];

	// 使用 Vite 的 import.meta.glob 方法动态导入指定路径下的所有路由模块文件
	// "./routes/modules/**/*.tsx" 匹配 modules 文件夹下所有嵌套的 .tsx 文件
	// { eager: true } 表示立即加载模块（静态导入）
	const modules = import.meta.glob("./routes/modules/**/*.tsx", {
		eager: true,
	});

	// 遍历所有动态导入的模块文件
	for (const key in modules) {
		// 获取模块的默认导出，如果没有默认导出则为空对象
		const mod = (modules as any)[key].default || {};

		// 将模块转换为数组，如果模块是单个对象则转换为单元素数组
		const modList = Array.isArray(mod) ? [...mod] : [mod];

		// 将模块的路由项添加到菜单模块数组中
		menuModules.push(...modList);
	}

	// 添加路由前缀，并返回修改后的路由列表
	const routesWihPrefix = addCodeRoutes(menuModules);

	// 通过菜单过滤规则返回最终的路由配置
	return menuFilter(routesWihPrefix);
}

/**
 * 为路由项添加指定的前缀（例如 "/code"）
 *
 * @param {AppRouteObject[]} routes - 路由列表
 * @returns {AppRouteObject[]} 添加前缀后的路由列表
 */
function addCodeRoutes(routes: AppRouteObject[]): AppRouteObject[] {
	return routes.map((route) => {
		// 创建路由项的副本以避免修改原对象
		const newRoute = { ...route };

		// 如果路由存在 meta.key 且 key 不是根路径 "/"
		if (newRoute.meta?.key && newRoute.meta.key !== "/") {
			// 检查 key 是否以 "/code" 开头，如果不是则添加前缀
			if (!newRoute.meta.key.startsWith("/code")) {
				newRoute.meta.key = newRoute.meta.key.startsWith("/")
					? `/code${newRoute.meta.key}` // 如果 key 已有 "/"，直接拼接 "/code"
					: `/code/${newRoute.meta.key}`; // 如果 key 没有 "/"，插入 "/code/"
			}
		}

		// 如果当前路由有子路由，递归处理子路由
		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addCodeRoutes(newRoute.children);
		}

		return newRoute; // 返回添加前缀后的路由项
	});
}
