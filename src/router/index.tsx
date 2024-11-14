import { lazy } from 'react';

import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';


import { usePermissionRoutes } from '@/router/hooks';

import { ErrorRoutes } from '@/router/routes/error-routes';

import { AppRouteObject } from '#/router';


// const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 *  根路由配置
 */
const RootRoute: AppRouteObject = {
  path: '/',
  element: <Navigate to='/home' replace />,
};



/**
 * 首页路由配置
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

  /**
   * 动态加载的权限路由
   * @type {AppRouteObject}
   */

  const asyncRoutes: AppRouteObject = {

    path: '/',
    element: (
      <DashboardLayout />
    ),
    children: [
      { index: true, element: <Navigate to='/dashboard/analysis' replace /> },
      ...usePermissionRoutes(),
    ],
  };

  /**
   * 合并后的所有路由
   */
  const routes = [
    /**
     *  根路由
     */
    RootRoute,

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


