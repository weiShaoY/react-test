import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';

type SettingsType = {
  themeColorPresets: ThemeColorPresets; // 主题颜色预设
  themeMode: ThemeMode;                 // 主题模式（如：浅色、深色）
  themeLayout: ThemeLayout;             // 布局方式（如：垂直、水平）
  themeStretch: boolean;                // 是否启用自适应拉伸布局
  breadCrumb: boolean;                  // 是否启用面包屑导航
  multiTab: boolean;                    // 是否启用多标签页
  darkSidebar: boolean;                 // 是否启用深色侧边栏
};

type SettingStore = {
  settings: SettingsType;
  // actions 命名空间，包含所有修改 state 的函数
  actions: {
    setSettings: (settings: SettingsType) => void;
    clearSettings: () => void;
  };
};

// 创建 zustand store，并使用 persist 中间件持久化存储
const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      // 初始化 settings 的默认值
      settings: {
        themeColorPresets: ThemeColorPresets.Default,
        themeMode: ThemeMode.Light,
        themeLayout: ThemeLayout.Vertical,
        themeStretch: false,
        breadCrumb: true,
        multiTab: true,
        darkSidebar: false,
      },
      actions: {
        // 更新 settings 的函数
        setSettings: (settings) => {
          set({ settings });
        },
        // 清除持久化存储的 settings 数据
        clearSettings() {
          useSettingStore.persist.clearStorage();
        },
      },
    }),
    {
      // 存储的 key 名称
      name: StorageEnum.Settings,
      // 存储方式，这里使用 localStorage
      storage: createJSONStorage(() => localStorage),
      // 持久化时仅存储 settings 部分的数据
      partialize: (state) => ({ [StorageEnum.Settings]: state.settings }),
    },
  ),
);

// 导出 hooks 用于访问 settings 和 actions
export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
