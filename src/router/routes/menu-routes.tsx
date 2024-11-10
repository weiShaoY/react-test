import { Navigate } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';

import AuthGuard from '../components/auth-guard';
import { getRoutesFromModules } from '../utils';

import { AppRouteObject } from '#/router';

/**
 *  动态获取所有菜单模块路由
 */
const menuModuleRoutes = getRoutesFromModules();

/**
 *  从环境变量中获取首页路径
 */
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * menuRoutes: 动态路由配置
 * 用于配置主菜单的动态路由
 */
export const menuRoutes: AppRouteObject = {
  path: '/',
  element: (
    <AuthGuard> {/* 权限守卫，确保用户具有访问权限 */}
      <DashboardLayout /> {/* 主布局组件 */}
    </AuthGuard>
  ),
  children: [

    // 默认跳转到首页路径，首页路径从环境变量中动态获取
    { index: true, element: <Navigate to={HOMEPAGE} replace /> },
    // 动态加载菜单模块的子路由
    ...menuModuleRoutes,
  ],
};
