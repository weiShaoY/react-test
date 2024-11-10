import { lazy, useCallback, useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

// 懒加载错误页面组件
const PageError = lazy(() => import('@/pages/sys/error/PageError'));

/**
 * 组件属性类型
 */
type Props = {
  /**
   *  需要进行权限校验的子组件
   */
  children: React.ReactNode;
};

/**
 * AuthGuard 组件
 * 用于在用户未登录时，重定向到登录页面，并包裹子组件进行错误边界处理
 * @param {Props} props - 组件属性
 * @param {React.ReactNode} props.children - 需要进行权限校验的子组件
 * @returns {JSX.Element} - 包裹了错误边界的子组件
 */
export default function AuthGuard({ children }: Props): JSX.Element {

  /**
   *  获取路由对象
   */
  const router = useRouter();

  /**
   *  从用户状态中获取访问令牌
   */
  const { accessToken } = useUserToken();

  /**
   * 检查用户是否拥有访问令牌
   * 如果没有访问令牌，则重定向到登录页面
   */
  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [router, accessToken]);


  /**
   *  在组件挂载时检查访问令牌
   */
  useEffect(() => {
    check();
  }, [check]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
