import { lazy } from 'react';

import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';

import AuthGuard from '@/router/components/auth-guard';

import { usePermissionRoutes } from '@/router/hooks';

import { ErrorRoutes } from '@/router/routes/error-routes';

import { AppRouteObject } from '#/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * 登录路由配置
 * @type {AppRouteObject}
 */
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};

/**
 * 主页路由配置
 * @type {AppRouteObject}
 */
const HomeRoute: AppRouteObject = {
  path: '/home',
  Component: lazy(() => import('@/pages/home/index')),
};

/**
 * 404 页面路由配置
 * @type {AppRouteObject}
 */
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

/**
 * 主路由组件
 * @returns {JSX.Element} - 路由提供程序
 */
export default function Router(): JSX.Element {
  // 获取带权限过滤的路由列表
  const permissionRoutes = usePermissionRoutes();

  /**
   * 动态加载的权限路由
   * @type {AppRouteObject}
   */
  /**
 * 定义异步加载的主页路由对象，`AppRouteObject` 类型是应用自定义的路由对象类型。
 */
  const asyncRoutes: AppRouteObject = {

    path: '/',
    element: (
      <DashboardLayout />
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      ...permissionRoutes,
    ],
  };



  /**
   * 合并后的所有路由
   */
  const routes = [

    /**
     * 登录页路由
      * 包含用户登录的页面路径
     */
    LoginRoute,

    /**
     *  首页路由
     */
    HomeRoute,

    /**
     * 异步加载的主页路由
     * 包含权限校验的动态加载页面
     */
    asyncRoutes,

    /**
     * 错误页路由
     * 包含 404、500 等错误页面路径
     */
    ErrorRoutes,

    /**
     * 未匹配到的路由
     * 重定向到 404 页面
     */
    PAGE_NOT_FOUND_ROUTE,
  ];

  /**
   * 创建 Hash 路由器
   */
  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}


//   /**
//    * 动态加载的权限路由
//    * @type {AppRouteObject}
//    */
//   /**
//  * 定义异步加载的主页路由对象，`AppRouteObject` 类型是应用自定义的路由对象类型。
//  */
//   const asyncRoutes: AppRouteObject = {
//     /**
//      * `path` 属性表示路径为 `/`，即默认的根路径。
//      * 当用户访问根路径时，将加载此路由的 `element` 中定义的组件。
//      */
//     path: '/',

//     /**
//      * `element` 属性定义在当前路由下渲染的 React 组件。
//      * 这里使用了 `AuthGuard` 组件，表示此路由受权限控制保护。
//      *
//      * `AuthGuard` 组件:
//      * 1. 检查用户是否已登录（存在 accessToken）。
//      * 2. 如果用户未登录，跳转到 `/login` 登录页面。
//      *
//      * `DashboardLayout` 组件:
//      * 1. 用于渲染包含导航菜单、顶部导航栏等的主布局。
//      * 2. 用户登录成功后，进入的默认布局界面。
//      */
//     // element: (
//     //   <AuthGuard>
//     //     <DashboardLayout />
//     //   </AuthGuard>
//     // ),

//     /**
//      * `children` 属性是当前路由的子路由配置列表。
//      * 定义了当前路由 `/` 下的子页面路由。
//      */
//     children: [
//       /**
//        * 第一个子路由对象，表示默认子路由，使用 `{ index: true }` 表示该子路由为默认路由。
//        * 当用户访问 `/` 路径时，会自动重定向到 `/home` 路径。
//        *
//        * `<Navigate>` 组件用于实现页面重定向。
//        * - `to='/home'` 表示重定向的目标路径为 `/home`。
//        * - `replace` 属性表示在浏览器历史记录中替换当前路径，不会新增历史记录。
//        */
//       { index: true, element: <Navigate to='/home' replace /> },

//       /**
//        * 展开 `permissionRoutes`，包含根据用户权限动态加载的路由列表。
//        * - `permissionRoutes` 是从 `usePermissionRoutes` 钩子函数中获取的，通常根据用户权限生成。
//        * - 这些路由包含用户有权限访问的页面，如仪表盘、设置等功能页面。
//        */
//       ...permissionRoutes,
//     ],
//   };
