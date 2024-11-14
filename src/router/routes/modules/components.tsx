import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';



const ClockPage = lazy(() => import('@/pages/components/clock'));
const MuYuPage = lazy(() => import('@/pages/components/muYu'));

const components: AppRouteObject = {
  order: 2,
  path: 'components',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: '组件',
    icon: <SvgIcon icon="menu-components" className="ant-menu-item-icon" size="24" />,
    key: '/components',
  },
  children: [
    {
      index: true,
      element: <Navigate to="clock" replace />,
    },

    {
      path: 'clock',
      element: <ClockPage />,
      meta: {
        label: '时钟',
        key: '/components/clock',
        icon: <SvgIcon icon="menu-clock" className="ant-menu-item-icon" size="24" />,
      },
    },
    {
      path: 'muYu',
      element: <MuYuPage />,
      meta: {
        label: '木鱼',
        key: '/components/muYu',
        icon: <SvgIcon icon="menu-muYu" className="ant-menu-item-icon" size="24" />,
      },
    }

  ],
};

export default components;
