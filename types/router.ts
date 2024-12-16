import type { ReactNode } from "react";
import type { Params, RouteObject } from "react-router";

/**
 * 路由元信息
 */
export interface RouteMeta {
	/**
	 * antd 菜单选中项的 key
	 */
	key: string;
	/**
	 * 菜单标签，支持国际化
	 */
	label: string;
	/**
	 * 菜单前缀图标
	 */
	icon?: ReactNode;
	/**
	 * 菜单后缀图标
	 */
	suffix?: ReactNode;
	/**
	 * 是否在菜单中隐藏
	 */
	hideMenu?: boolean;
	/**
	 * 是否在多标签页中隐藏
	 */
	hideTab?: boolean;
	/**
	 * 菜单项是否禁用
	 */
	disabled?: boolean;
	/**
	 * 是否为 React Router 的 Outlet
	 */
	outlet?: any;
	/**
	 * 用于刷新标签的时间戳
	 */
	timeStamp?: string;
	/**
	 * 外部链接或 iframe 的地址
	 */
	frameSrc?: string;
	/**
	 * 动态路由参数
	 *
	 * @example /user/:id
	 */
	params?: Params<string>;
}

/**
 * 应用路由对象
 */
export type AppRouteObject = {
	/**
	 * 路由排序序号
	 */
	order?: number;
	/**
	 * 路由的元信息
	 */
	meta?: RouteMeta;
	/**
	 * 子路由列表
	 */
	children?: AppRouteObject[];
} & Omit<RouteObject, "children">;
