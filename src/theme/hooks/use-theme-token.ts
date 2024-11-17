import { theme } from "antd";
import { useMemo } from "react";

/**
 * 获取 Ant Design 的主题 token，并使用 useMemo 进行缓存
 */
export function useThemeToken() {
	// 使用 Ant Design 提供的 useToken Hook 获取主题 token
	const { token } = theme.useToken();

	// 使用 useMemo 缓存 token，只有当 token 发生变化时才会重新计算
	return useMemo(() => token, [token]);
}
