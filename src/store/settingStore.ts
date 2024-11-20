import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from "#/enum";

/**
 * 全局设置的类型定义，包含主题、布局等配置信息
 */
type SettingsType = {
	/**
	 *  主题颜色预设，用户可以选择不同的主题配色方案
	 */
	themeColorPresets: ThemeColorPresets;

	/**
	 *  主题模式，例如浅色模式（light）或深色模式（dark）
	 */
	themeMode: ThemeMode;

	/**
	 *  布局方式，例如垂直布局（Vertical）或水平布局（Horizontal）
	 */
	themeLayout: ThemeLayout;

	/**
	 *  是否启用自适应拉伸布局，启用后页面会根据屏幕宽度进行拉伸适配
	 */
	themeStretch: boolean;

	/**
	 *  是否显示面包屑导航，用于指示用户当前页面的层级结构
	 */
	breadCrumb: boolean;

	/**
	 *  是否启用多标签页功能，可以在顶部显示多个打开的页面标签
	 */
	multiTab: boolean;

	/**
	 *  是否启用深色侧边栏样式，适用于深色主题模式
	 */
	darkSidebar: boolean;
};

/**
 * 全局设置存储的类型定义，包含配置信息和修改设置的操作
 */
type SettingStore = {
	/**
	 * 当前应用的全局设置
	 */
	settings: SettingsType;

	/**
	 * 修改应用全局设置的操作命名空间
	 * @property {Function} setSettings - 更新应用的全局设置
	 * @property {Function} clearSettings - 清空应用的全局设置，恢复默认配置
	 */
	actions: {
		/**
		 * 更新全局设置，覆盖现有的配置
		 * @param {SettingsType} settings - 要更新的设置对象
		 */
		setSettings: (settings: SettingsType) => void;

		/**
		 * 清空全局设置，将配置恢复到默认状态
		 */
		clearSettings: () => void;
	};
};

// 创建 zustand store，并使用 persist 中间件持久化存储
const useSettingStore = create<SettingStore>()(
	persist(
		(set) => ({
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
				setSettings: (settings) => {
					set({ settings });
				},
				clearSettings() {
					useSettingStore.persist.clearStorage();
				},
			},
		}),
		{
			name: StorageEnum.Settings, // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({ [StorageEnum.Settings]: state.settings }),
		},
	),
);
/**
 *  Hook 用于访问全局的 settings 配置
 */
export const useSettings = () => useSettingStore((state) => state.settings);

/**
 *  Hook 用于访问修改 settings 的 actions 函数
 */
export const useSettingActions = () =>
	useSettingStore((state) => state.actions);
