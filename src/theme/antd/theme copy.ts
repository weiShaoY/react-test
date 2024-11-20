import type { ThemeConfig } from "antd";

import type { ThemeColorPresets } from "#/enum";
/**
 * Antd theme editor: https://ant.design/theme-editor-cn
 */
const customThemeTokenConfig: ThemeConfig["token"] = {
	colorSuccess: "#22c55e",
	colorWarning: "#ff7849",
	colorError: "#ff5630",
	colorInfo: "#00b8d9",

	// 线性化
	wireframe: false,

	borderRadiusSM: 2,

	borderRadius: 4,

	borderRadiusLG: 8,
};

const customComponentConfig: ThemeConfig["components"] = {
	Breadcrumb: {
		fontSize: 12,
		separatorMargin: 4,
	},
	Menu: {
		fontSize: 14,
		colorFillAlter: "transparent",
		itemColor: "rgb(145, 158, 171)",
		motionDurationMid: "0.125s",
		motionDurationSlow: "0.125s",
	},
};

const colorPrimarys: {
	[k in ThemeColorPresets]: string;
} = {
	default: "#00a76f",
	cyan: "#078DEE",
	purple: "#7635DC",
	blue: "#2065D1",
	orange: "#FDA92D",
	red: "#FF3030",
};

/**
 * 扩展后的 ThemeConfig 类型
 */
export interface ExtendedThemeConfig extends Omit<ThemeConfig, "token"> {
	/**
	 * 使用扩展后的 Token 类型
	 */
	token?: ThemeConfig["token"] & {
		/**
		 * 自定义属性：首页头部背景色
		 */
		colorHomeHeaderBg?: string;

		// /**
		//  *  自定义属性：首页页面背景色
		//  */
		// colorHomeBgLayout?: string;
	};
}
const themeModeToken: Record<"dark" | "light", ExtendedThemeConfig> = {
	light: {
		token: {
			/**
			 *   布局背景色
			 */
			colorBgLayout: "#D0D2D6",

			/**
			 *  组件容器背景色
			 */
			// colorBgContainer: "#D0D2D6",

			/**
			 *   浮层容器背景色
			 */
			// colorBgElevated: "#ff5630",

			/**
			 *  首页头部背景色
			 */
			colorHomeHeaderBg: "#e2e5e5",
		},

		components: {
			Layout: {
				/**
				 *   侧边栏背景色
				 */
				lightSiderBg: "#D0D2D6",
			},
			Menu: {
				/**
				 *  危险菜单项文字颜色
				 */
				dangerItemColor: "#ff5630",

				itemBg: "#D0D2D6",
				subMenuItemBg: "#f1f1f1",
			},
		},
	},

	dark: {
		token: {
			/**
			 *   布局背景色
			 */
			colorBgLayout: "#212224",

			/**
			 *  组件容器背景色
			 */
			colorBgContainer: "#333639",

			/**
			 *   浮层容器背景色
			 */
			colorBgElevated: "#212224",

			/**
			 *  首页头部背景色
			 */
			colorHomeHeaderBg: "#191919",
		},
		components: {
			Layout: {
				/**
				 *   侧边栏背景色
				 */
				siderBg: "#191919",
			},
			Menu: {
				/**
				 *  暗色模式下的菜单项背景
				 */
				darkItemBg: "#191919",

				/**
				 *   暗色模式下的子菜单项背景
				 */
				darkSubMenuItemBg: "#333639",

				/**
				 *  暗色模式下的菜单项悬浮背景
				 */
				darkItemHoverBg: "#D0D2D6",

				/**
				 *  暗色模式下的浮层菜单的背景颜色
				 */
				darkPopupBg: "#333639",
			},

			Modal: {
				headerBg: "#212b36",
				contentBg: "#DE0000",
				footerBg: "#212b36",
			},
			Notification: {},
		},
	},
};

export {
	customThemeTokenConfig,
	customComponentConfig,
	colorPrimarys,
	themeModeToken,
};
