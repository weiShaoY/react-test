import { Breadcrumb, type BreadcrumbProps, type GetProp } from "antd";
import { useMemo } from "react";
import { Link, useMatches } from "react-router-dom";

import { Iconify } from "@/components/icon";
import { useFlattenedRoutes, useBlogRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";

type MenuItem = GetProp<BreadcrumbProps, "items">[number];

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
	const matches = useMatches();
	const flattenedRoutes = useFlattenedRoutes();
	const permissionRoutes = useBlogRoutes();

	const breadCrumbs = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		const paths = matches
			.filter((item) => item.pathname !== "/")
			.map((item) => item.pathname);

		const pathRouteMetas = flattenedRoutes.filter((item) =>
			paths.includes(item.key),
		);

		let currentMenuItems = [...menuRoutes];

		return pathRouteMetas.map((routeMeta): MenuItem => {
			const { key, label } = routeMeta;

			// Find current level menu items
			const currentRoute = currentMenuItems.find(
				(item) => item.meta?.key === key,
			);

			// Update menu items for next level
			currentMenuItems =
				currentRoute?.children?.filter((item) => !item.meta?.hideMenu) ?? [];

			return {
				key,
				title: label,
				...(currentMenuItems.length > 0 && {
					menu: {
						items: currentMenuItems.map((item) => ({
							key: item.meta?.key,
							label: item.meta?.key ? (
								<Link to={item.meta.key}>{item.meta.label}</Link>
							) : null,
						})),
					},
				}),
			};
		});
	}, [matches, flattenedRoutes, permissionRoutes]);

	return (
		<Breadcrumb
			items={breadCrumbs}
			className="!text-sm"
			separator={<Iconify icon="ph:dot-duotone" />}
		/>
	);
}
