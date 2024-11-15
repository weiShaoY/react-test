import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';



const ClockPage = lazy(() => import('@/pages/components/clock'));
const MuYuPage = lazy(() => import('@/pages/components/muYu'));
const CalendarPage = lazy(() => import('@/pages/components/calendar'));
const ScreensaverPage = lazy(() => import('@/pages/components/screensaver'));
const TimePage = lazy(() => import('@/pages/components/time'));
const RipplePage = lazy(() => import('@/pages/components/ripple'));

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
    },
    {
      path: 'calendar',
      element: <CalendarPage />,
      meta: {
        label: '日历',
        key: '/components/calendar',
        icon: <SvgIcon icon="menu-calendar" className="ant-menu-item-icon" size="24" />,
      },
    },
    {
      path: 'screensaver',
      element: <ScreensaverPage />,
      meta: {
        label: '屏保',
        key: '/components/screensaver',
        icon: <SvgIcon icon="menu-screensaver" className="ant-menu-item-icon" size="24" />,
      },
    },
    {
      path: 'time',
      element: <TimePage />,
      meta: {
        label: '时间',
        key: '/components/time',
        icon: <SvgIcon icon="menu-time" className="ant-menu-item-icon" size="24" />,
      },
    },
    {
      path: 'ripple',
      element: <RipplePage />,
      meta: {
        label: '水波',
        key: '/components/ripple',
        icon: <SvgIcon icon="menu-ripple" className="ant-menu-item-icon" size="24" />,
      },
    },

  ],
};

export default components;
