import { useMemo } from "react";
import { useSearchParams as _useSearchParams } from "react-router";

/**
 * 自定义 Hook：useSearchParams
 * 用于返回缓存的 URL 查询参数对象
 * @returns {URLSearchParams} 查询参数对象
 */
export function useSearchParams() {
	// 使用 react-router-dom 提供的 useSearchParams Hook 获取查询参数
	const [searchParams] = _useSearchParams();

	// 使用 useMemo 缓存 searchParams 对象，避免重复计算
	return useMemo(() => searchParams, [searchParams]);
}
