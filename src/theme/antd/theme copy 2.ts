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
			colorHomeHeaderBg: "#e2e5e5",
		},

		components: {
			Layout: {
				siderBg: "#212224",
				headerBg: "#212224",
				colorBgBody: "#D0D2D6",
			},
			Menu: {
				darkItemBg: "#212224",
				dangerItemColor: "#ff5630",
			},
		},
	},

	dark: {
		token: {
			colorBgLayout: "#222325",
			colorBgContainer: "#212b36",
			colorBgElevated: "#212224",

			colorHomeHeaderBg: "#191919",
		},
		components: {
			Layout: {
				siderBg: "#212224",
			},
			Menu: {
				darkItemBg: "#212224",
			},
			Modal: {
				headerBg: "#212b36",
				contentBg: "#212b36",
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
