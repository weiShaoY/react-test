import { isEmpty } from 'ramda'; // 从ramda库导入isEmpty函数，用于判断对象或数组是否为空
import { Suspense, lazy, useMemo } from 'react'; // 从React库导入Suspense、lazy和useMemo，分别用于延迟加载组件、懒加载和缓存计算结果
import { Navigate, Outlet } from 'react-router-dom'; // 从react-router-dom导入Navigate和Outlet，用于路由跳转和嵌套路由

import { Iconify } from '@/components/icon'; // 导入Iconify组件，用于显示图标
import { CircleLoading } from '@/components/loading'; // 导入CircleLoading组件，用于加载中的动画效果
import { useUserPermission } from '@/store/userStore'; // 从用户状态管理中获取当前用户的权限信息
import ProTag from '@/theme/antd/components/tag'; // 导入ProTag组件，用于显示标签
import { flattenTrees } from '@/utils/tree'; // 导入flattenTrees函数，用于将权限树状结构扁平化

import { Permission } from '#/entity'; // 导入权限实体
import { BasicStatus, PermissionType } from '#/enum'; // 导入基础状态和权限类型枚举
import { AppRouteObject } from '#/router'; // 导入应用路由对象类型

const ENTRY_PATH = '/src/pages'; // 定义页面文件所在的目录路径
const PAGES = import.meta.glob('/src/pages/**/*.tsx'); // 使用Vite的import.meta.glob导入页面组件
const loadComponentFromPath = (path: string) => PAGES[`${ENTRY_PATH}${path}`]; // 根据路径加载页面组件

/**
 * 根据当前权限从根权限递归构建完整的路由路径
 * @param {Permission} permission - 当前权限对象
 * @param {Permission[]} flattenedPermissions - 扁平化的权限数组
 * @param {string[]} segments - 路由段的累加器
 * @returns {string} 完整的路由路径
 */
function buildCompleteRoute(
  permission: Permission,
  flattenedPermissions: Permission[],
  segments: string[] = [], // 默认值为一个空数组
): string {
  // 将当前路由段加入到segments数组的开头
  segments.unshift(permission.route);

  // 基础情况：如果权限没有父权限，说明已经到达根权限
  if (!permission.parentId) {
    return `/${segments.join('/')}`; // 返回拼接的完整路由路径
  }

  // 查找父权限并继续递归
  const parent = flattenedPermissions.find((p) => p.id === permission.parentId);
  if (!parent) {
    // 如果找不到父权限，输出警告并返回当前路径
    console.warn(`Parent permission not found for ID: ${permission.parentId}`);
    return `/${segments.join('/')}`;
  }

  // 递归调用，继续查找父级权限
  return buildCompleteRoute(parent, flattenedPermissions, segments);
}

// 组件
function NewFeatureTag() {
  return (
    // 返回一个新功能标签，显示“NEW”
    <ProTag color="cyan" icon={<Iconify icon="solar:bell-bing-bold-duotone" size={14} />}>
      NEW
    </ProTag>
  );
}

function RouteWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>; // 包装子组件并在加载时显示CircleLoading组件
}

// 路由转换器
/**
 * 创建基本路由对象
 * @param {Permission} permission - 权限对象
 * @param {string} completeRoute - 完整路由路径
 * @returns {AppRouteObject} 基本路由对象
 */
const createBaseRoute = (permission: Permission, completeRoute: string): AppRouteObject => {
  const { route, label, icon, order, hide, hideTab, status, frameSrc, newFeature } = permission;

  const baseRoute: AppRouteObject = {
    path: route, // 路由路径
    meta: {
      label, // 标签
      key: completeRoute, // 路由的唯一标识
      hideMenu: !!hide, // 是否隐藏菜单
      hideTab, // 是否隐藏tab
      disabled: status === BasicStatus.DISABLE, // 判断路由是否禁用
    },
  };

  // 如果有order属性，添加到路由对象中
  if (order) baseRoute.order = order;
  // 如果有图标，添加到路由meta中
  if (icon) baseRoute.meta!.icon = icon;
  // 如果有iframe源地址，添加到meta中
  if (frameSrc) baseRoute.meta!.frameSrc = frameSrc;
  // 如果是新功能，添加新功能标签
  if (newFeature) baseRoute.meta!.suffix = <NewFeatureTag />;

  return baseRoute;
};

/**
 * 创建目录路由对象
 * @param {Permission} permission - 权限对象
 * @param {Permission[]} flattenedPermissions - 扁平化权限数组
 * @returns {AppRouteObject} 目录路由对象
 */
const createCatalogueRoute = (
  permission: Permission,
  flattenedPermissions: Permission[],
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions), // 创建完整的路由路径
  );

  baseRoute.meta!.hideTab = true; // 隐藏tab

  const { parentId, children = [] } = permission;
  if (!parentId) {
    // 如果没有父权限，设置该路由的element为Outlet（嵌套路由容器）
    baseRoute.element = (
      <RouteWrapper>
        <Outlet />
      </RouteWrapper>
    );
  }

  // 递归处理子权限
  baseRoute.children = transformPermissionsToRoutes(children, flattenedPermissions);

  // 如果有子权限，设置默认跳转到第一个子路由
  if (!isEmpty(children)) {
    baseRoute.children.unshift({
      index: true,
      element: <Navigate to={children[0].route} replace />,
    });
  }

  return baseRoute;
};

/**
 * 创建菜单路由对象
 * @param {Permission} permission - 权限对象
 * @param {Permission[]} flattenedPermissions - 扁平化权限数组
 * @returns {AppRouteObject} 菜单路由对象
 */
const createMenuRoute = (
  permission: Permission,
  flattenedPermissions: Permission[],
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions), // 创建完整的路由路径
  );

  const Element = lazy(loadComponentFromPath(permission.component!) as any); // 懒加载组件

  // 根据是否有frameSrc来决定渲染方式
  baseRoute.element = permission.frameSrc ? (
    <Element src={permission.frameSrc} /> // 如果有iframe源地址，渲染iframe
  ) : (
    <RouteWrapper>
      <Element />
    </RouteWrapper> // 否则直接渲染组件
  );

  return baseRoute;
};

// 主函数
/**
 * 将权限数组转换为路由数组
 * @param {Permission[]} permissions - 权限数组
 * @param {Permission[]} flattenedPermissions - 扁平化权限数组
 * @returns {AppRouteObject[]} 路由数组
 */
function transformPermissionsToRoutes(
  permissions: Permission[],
  flattenedPermissions: Permission[],
): AppRouteObject[] {
  return permissions.map((permission) => {
    // 根据权限类型选择是创建目录路由还是菜单路由
    if (permission.type === PermissionType.CATALOGUE) {
      return createCatalogueRoute(permission, flattenedPermissions);
    }
    return createMenuRoute(permission, flattenedPermissions);
  });
}

/**
 * 获取当前用户权限的路由配置
 * @returns {AppRouteObject[]} 路由数组
 */
export function usePermissionRoutes() {
  // 从状态管理中获取当前用户的权限信息
  const permissions = useUserPermission();
  return useMemo(() => {
    if (!permissions) return []; // 如果没有权限，返回空数组

    // 将权限树状结构扁平化
    const flattenedPermissions = flattenTrees(permissions);
    // 根据扁平化的权限生成路由配置
    return transformPermissionsToRoutes(permissions, flattenedPermissions);
  }, [permissions]); // 如果权限发生变化，则重新计算路由配置
}
