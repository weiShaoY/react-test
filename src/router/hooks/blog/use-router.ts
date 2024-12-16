import { useMemo } from "react";
import { useNavigate } from "react-router";

/**
 * 自定义 Hook：useRouter
 * 提供一系列常用的路由导航方法，封装了 react-router-dom 的 useNavigate
 * @returns 包含路由操作方法的对象
 */
export function useRouter() {
	/**
	 *  使用 useNavigate 获取导航函数
	 */
	const navigate = useNavigate();

	/**
	 * 使用 useMemo 缓存路由操作方法，避免不必要的重新创建
	 */
	const router = useMemo(
		() => ({
			/**
			 *  后退到上一个页面
			 */
			back: () => navigate(-1),

			/**
			 *  前进到下一个页面
			 */
			forward: () => navigate(1),

			/**
			 *  刷新当前页面
			 */
			reload: () => window.location.reload(),

			/**
			 *  推入新路由，类似于 window.location.href = href
			 */
			push: (href: string) => navigate(href),

			/**
			 *  替换当前路由，不会在浏览器历史记录中添加新记录
			 */
			replace: (href: string) => navigate(href, { replace: true }),
		}),
		[navigate], // 依赖于 navigate，当 navigate 改变时重新计算
	);

	// 返回包含路由操作方法的对象
	return router;
}
