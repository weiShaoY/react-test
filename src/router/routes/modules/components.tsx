import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';


const IconPage = lazy(() => import('@/pages/components/icon'));

const ClockPage = lazy(() => import('@/pages/components/clock'));

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
      element: <Navigate to="icon" replace />,
    },
    {
      path: 'icon',
      element: <IconPage />,
      meta: {
        label: 'sys.menu.icon', key: '/components/icon'
      },
    },
    {
      path: 'clock',

      element: <ClockPage />,
      meta: {
        label: '时钟',
        key: '/components/clock',
        icon: <SvgIcon icon="menu-clock" className="ant-menu-item-icon" size="24" />,
      },
    }

  ],
};

export default components;
