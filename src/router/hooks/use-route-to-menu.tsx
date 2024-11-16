import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Iconify, SvgIcon } from "@/components/icon";
import type { GetProp, MenuProps } from "antd";
import type { AppRouteObject } from "#/router";

type MenuItem = GetProp<MenuProps, "items">[number];

/**
 * 根据 icon 类型渲染对应的图标
 * @param {string | React.ReactNode} icon - 图标名称或 React 组件
 * @returns {React.ReactNode} 图标节点
 */
const renderIcon = (icon: string | React.ReactNode): React.ReactNode => {
	if (typeof icon !== "string") return icon;

	// 如果图标名称以 "ic" 开头，使用 SvgIcon，否则使用 Iconify
	return icon.startsWith("ic") ? (
		<SvgIcon icon={icon} size={24} className="ant-menu-item-icon" />
	) : (
		<Iconify icon={icon} size={24} className="ant-menu-item-icon" />
	);
};

/**
 * 渲染菜单项的文本标签
 * @param {string} label - 菜单项的标签文本
 * @param {React.ReactNode} suffix - 菜单项的后缀节点
 * @param {(key: string) => string} t - 翻译函数
 * @returns {React.ReactNode} 包含文本和后缀的菜单项标签
 */
const renderLabel = (
	label: string,
	suffix: React.ReactNode,
	t: (key: string) => string,
) => {
	return (
		<div className="flex items-center">
			<div>{t(label)}</div>
			{suffix}
		</div>
	);
};

/**
 * Hook: 将路由配置转换为菜单项配置
 */
export function useRouteToMenuFn() {
	const { t } = useTranslation();

	// 使用 useCallback 缓存转换函数，避免每次渲染都重新创建
	const routeToMenuFn = useCallback(
		(items: AppRouteObject[]): MenuItem[] => {
			return items
				.filter((item) => !item.meta?.hideMenu) // 过滤掉隐藏菜单项
				.map((item) => {
					const { meta, children } = item;
					if (!meta) return {} as MenuItem;

					// 构建菜单项
					const menuItem: Partial<MenuItem> = {
						key: meta.key, // 菜单项的唯一标识
						disabled: meta.disabled, // 是否禁用
						label: renderLabel(meta.label, meta.suffix, t), // 菜单项的显示文本
						...(meta.icon && { icon: renderIcon(meta.icon) }), // 如果有图标，则渲染图标
						...(children && { children: routeToMenuFn(children) }), // 如果有子路由，则递归处理子菜单项
					};

					return menuItem as MenuItem;
				});
		},
		[t], // 依赖于翻译函数 t
	);
	return routeToMenuFn;
}
