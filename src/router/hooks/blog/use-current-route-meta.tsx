import { isEmpty } from "ramda";
import { useEffect, useState } from "react";
import { type Params, useMatches, useOutlet } from "react-router";

import { useFlattenedRoutes } from "./use-flattened-routes";
import { useRouter } from "./use-router";

import type { RouteMeta } from "#/router";

// 从环境变量中获取应用的首页路径
const { VITE_APP_BLOGPAGE: HOMEPAGE } = import.meta.env;

/**
 * 获取当前路由的 Meta 信息
 * @returns  当前路由的 Meta 对象
 */
export function useCurrentRouteMeta() {
	// 从自定义的 useRouter 中获取 push 方法
	const { push } = useRouter();

	// 获取当前路由对应的子组件
	const children = useOutlet();

	// 获取当前匹配的所有路由信息
	const matchs = useMatches();

	// 获取拍平后的所有路由配置
	const flattenedRoutes = useFlattenedRoutes();

	// 当前路由的 Meta 信息状态
	const [currentRouteMeta, setCurrentRouteMeta] = useState<RouteMeta>();

	// 当 matchs 改变时，更新当前路由的 Meta 信息
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// 获取最后一个匹配的路由（即当前路由）
		const lastRoute = matchs.at(-1);
		if (!lastRoute) return;

		// 从最后一个匹配的路由中解构出 pathname 和 params
		const { pathname, params } = lastRoute;

		// 查找匹配的路由 Meta 信息
		const matchedRouteMeta = flattenedRoutes.find((item) => {
			// 将动态参数替换为实际的参数值
			const replacedKey = replaceDynamicParams(item.key, params);
			// 判断替换后的路径是否与当前路径匹配
			return replacedKey === pathname || `${replacedKey}/` === pathname;
		});

		if (matchedRouteMeta) {
			// 设置当前路由的 outlet（用于渲染子组件）
			matchedRouteMeta.outlet = children;
			// 如果当前路由有参数，则将参数存入 Meta 信息中
			if (!isEmpty(params)) {
				matchedRouteMeta.params = params;
			}
			// 更新当前路由的 Meta 状态
			setCurrentRouteMeta({ ...matchedRouteMeta });
		} else {
			// 如果未匹配到对应的 Meta 信息，则跳转到首页
			push(HOMEPAGE);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchs]);

	// 返回当前路由的 Meta 信息
	return currentRouteMeta;
}

/**
 * 替换动态参数路径为实际参数值
 * 例如，将路径 `user/:id` 替换为 `/user/1234512345`
 * @param {string} menuKey - 路由的 key，可能包含动态参数
 * @param {Params<string>} params - 路由参数对象
 * @returns {string} 替换后的完整路径
 */
export const replaceDynamicParams = (
	menuKey: string,
	params: Params<string>,
) => {
	let replacedPathName = menuKey;

	// 使用正则表达式匹配所有的动态参数（格式为 :paramName）
	const paramNames = menuKey.match(/:\w+/g);

	// 如果存在动态参数
	if (paramNames) {
		for (const paramName of paramNames) {
			// 去掉冒号，获取参数名称
			const paramKey = paramName.slice(1);
			if (!params[paramKey]) continue;

			replacedPathName = replacedPathName.replace(paramName, params[paramKey]);
		}
	}
	// 返回替换后的路径
	return replacedPathName;
};
