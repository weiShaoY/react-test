import { Suspense, lazy } from 'react';

import { Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';

import SimpleLayout from '@/layouts/simple';

import AuthGuard from '../components/auth-guard';

import { AppRouteObject } from '#/router';

// 使用 React.lazy 动态加载错误页面组件
const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));

/**
 * ErrorRoutes: 错误页面路由配置
 * 包含 403, 404, 500 三个错误页面
 */
export const ErrorRoutes: AppRouteObject = {
  element: (
    <AuthGuard> {/* 权限守卫，确保用户具有访问权限 */}
      <SimpleLayout> {/* 使用简单布局包裹错误页面 */}
        <Suspense fallback={<CircleLoading />}> {/* 懒加载时显示加载动画 */}
          <Outlet /> {/* 占位符，用于渲染子路由的组件 */}
        </Suspense>
      </SimpleLayout>
    </AuthGuard>
  ),
  children: [
    { path: '403', element: <Page403 /> }, // 403 页面路径和对应组件
    { path: '404', element: <Page404 /> }, // 404 页面路径和对应组件
    { path: '500', element: <Page500 /> }, // 500 页面路径和对应组件
  ],
};
