import { useMemo } from "react";
import { useParams as _useParams } from "react-router";

/**
 * 自定义 Hook：useParams
 * 主要功能是从 react-router-dom 获取路由参数，并使用 useMemo 缓存参数对象
 * @returns  当前路由的参数对象
 */
export function useParams() {
	// 调用 react-router-dom 的 useParams 获取当前路由的参数
	const params = _useParams();

	/**
	 * 使用 useMemo 缓存 params 对象
	 * 当 params 改变时才会重新计算，避免在组件重新渲染时重复创建相同的对象
	 */
	return useMemo(() => params, [params]);
}
