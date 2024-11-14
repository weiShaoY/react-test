import { isEmpty } from 'ramda';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useCurrentRouteMeta, useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-current-route-meta';

import type { RouteMeta } from '#/router';

export type KeepAliveTab = RouteMeta & {
  children: any;
};

/**
 *  定义多标签上下文类型
 */
type MultiTabsContextType = {
  /**
   *  当前已打开的标签页列表
   */
  tabs: KeepAliveTab[];
  /**
   *  当前激活的标签页路由路径
   */
  activeTabRoutePath?: string;
  /**
   *  更新标签页列表
   */
  setTabs: (tabs: KeepAliveTab[]) => void;
  /**
   *  关闭指定的标签页
   */
  closeTab: (path?: string) => void;
  /**
   *  关闭指定标签页以外的所有标签页
   */
  closeOthersTab: (path?: string) => void;
  /**
   *  关闭所有标签页
   */
  closeAll: () => void;
  /**
   *  关闭指定标签页左侧的所有标签页
   */
  closeLeft: (path: string) => void;
  /**
   *  关闭指定标签页右侧的所有标签页
   */
  closeRight: (path: string) => void;
  /**
   *  刷新指定的标签页
   */
  refreshTab: (path: string) => void;
};
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 *   创建多标签上下文，提供默认值
 */
const MultiTabsContext = createContext<MultiTabsContextType>({
  tabs: [],
  activeTabRoutePath: '',
  setTabs: () => { },
  closeTab: () => { },
  closeOthersTab: () => { },
  closeAll: () => { },
  closeLeft: () => { },
  closeRight: () => { },
  refreshTab: () => { },
});

/**
 *  多标签上下文提供者组件
 */
export function MultiTabsProvider({ children }: PropsWithChildren) {
  const { push } = useRouter();

  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  /**
   *   当前路由的元信息
   */
  const currentRouteMeta = useCurrentRouteMeta();

  //  计算当前激活的标签页路径
  const activeTabRoutePath = useMemo(() => {

    if (!currentRouteMeta) {
      return ''
    };

    const { key, params = {} } = currentRouteMeta;
    if (!isEmpty(params)) {
      // 替换动态参数
      return replaceDynamicParams(key, params);
    }
    return key;
  }, [currentRouteMeta]);

  /**
    * 关闭指定的标签页
    */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      const tempTabs = [...tabs];
      //  只有一个标签时不允许关闭
      if (tempTabs.length === 1) {
        return
      };

      const deleteTabIndex = tempTabs.findIndex((item) => item.key === path);
      if (deleteTabIndex === -1) {
        return
      };

      // 关闭后导航到前一个或下一个标签页
      if (deleteTabIndex > 0) {
        push(tempTabs[deleteTabIndex - 1].key);
      } else {
        push(tempTabs[deleteTabIndex + 1].key);
      }

      tempTabs.splice(deleteTabIndex, 1);
      setTabs(tempTabs);
    },
    [activeTabRoutePath, push, tabs],
  );

  /**
   *  关闭指定标签页以外的所有标签页
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => prev.filter((item) => item.key === path));
      if (path !== activeTabRoutePath) {
        push(path);
      }
    },
    [activeTabRoutePath, push],
  );

  /**
   *  关闭所有标签页并跳转到首页
   */
  const closeAll = useCallback(() => {
    setTabs([]);
    push(HOMEPAGE);
  }, [push]);

  /**
   * 关闭指定标签页左侧的所有标签页
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(currentTabIndex);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs],
  );

  /**
   * 关闭指定标签页右侧的所有标签页
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(0, currentTabIndex + 1);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs],
  );

  /**
    * 刷新指定的标签页
    */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => {
        const index = prev.findIndex((item) => item.key === path);

        if (index >= 0) {
          prev[index].timeStamp = getTimeStamp();
        }

        return [...prev];
      });
    },
    [activeTabRoutePath],
  );

  // 当路由元信息变化时，自动添加新标签页
  useEffect(() => {
    setTabs((prev) => prev.filter((item) => !item.hideTab));

    if (!currentRouteMeta) return;
    let { key } = currentRouteMeta;
    const { outlet: children, params = {} } = currentRouteMeta;

    if (!isEmpty(params)) {
      key = replaceDynamicParams(key, params);
    }
    const isExisted = tabs.find((item) => item.key === key);

    if (!isExisted) {
      setTabs((prev) => [
        ...prev,
        { ...currentRouteMeta, key, children, timeStamp: getTimeStamp() },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteMeta]);


  // 使用 useMemo 创建上下文默认值
  const defaultValue: MultiTabsContextType = useMemo(
    () => ({
      tabs,
      activeTabRoutePath,
      setTabs,
      closeTab,
      closeOthersTab,
      refreshTab,
      closeAll,
      closeLeft,
      closeRight,
    }),
    [
      activeTabRoutePath,
      closeAll,
      closeLeft,
      closeOthersTab,
      closeRight,
      closeTab,
      refreshTab,
      tabs,
    ],
  );

  // 提供多标签上下文
  return <MultiTabsContext.Provider value={defaultValue}>{children}</MultiTabsContext.Provider>;
}

/**
 *  自定义 Hook，用于获取多标签上下文
 */
export function useMultiTabsContext() {
  return useContext(MultiTabsContext);
}

/**
 *  获取当前时间戳的辅助函数
 */
function getTimeStamp() {
  return new Date().getTime().toString();
}
