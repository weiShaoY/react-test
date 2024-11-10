import { App as AntdApp } from 'antd';

import { Helmet } from 'react-helmet-async';

import Logo from '@/assets/images/logo.png';

import Router from '@/router/index';

import AntdConfig from '@/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        {/* 懒加载路由 */}
        <MotionLazy>
          {/* 修改 HTML <head> 中的内 */}
          <Helmet>
            <title>
              weiShaoY
            </title>
            <link rel="icon" href={Logo} />
          </Helmet>

          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
