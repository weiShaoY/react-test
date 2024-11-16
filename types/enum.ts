/**
 * @enum {number} BasicStatus
 * @description 基础状态枚举，用于表示启用/禁用状态
 */
export enum BasicStatus {
	/**
	 * 禁用状态
	 */
	DISABLE = 0,
	/**
	 * 启用状态
	 */
	ENABLE = 1,
}

/**
 * @enum {number} ResultEnum
 * @description 请求结果枚举，用于表示请求的返回状态
 */
export enum ResultEnum {
	/**
	 * 成功
	 */
	SUCCESS = 0,
	/**
	 * 错误
	 */
	ERROR = -1,
	/**
	 * 超时（未授权或登录失效）
	 */
	TIMEOUT = 401,
}

/**
 * @enum {string} StorageEnum
 * @description 本地存储的键枚举，用于管理浏览器的 localStorage 或 sessionStorage 键名
 */
export enum StorageEnum {
	/**
	 * 用户信息
	 */
	UserInfo = "userInfo",
	/**
	 * 用户令牌
	 */
	UserToken = "userToken",
	/**
	 * 用户设置
	 */
	Settings = "settings",
	/**
	 * 语言设置（国际化）
	 */
	I18N = "i18nextLng",
}

/**
 * @enum {string} ThemeMode
 * @description 主题模式枚举，用于表示不同的主题模式
 */
export enum ThemeMode {
	/**
	 * 浅色模式
	 */
	Light = "light",
	/**
	 * 深色模式
	 */
	Dark = "dark",
}

/**
 * @enum {string} ThemeLayout
 * @description 主题布局枚举，用于表示不同的布局风格
 */
export enum ThemeLayout {
	/**
	 * 垂直布局
	 */
	Vertical = "vertical",
	/**
	 * 水平布局
	 */
	Horizontal = "horizontal",
	/**
	 * 迷你布局
	 */
	Mini = "mini",
}

/**
 * @enum {string} ThemeColorPresets
 * @description 主题颜色预设枚举，用于表示不同的主题颜色选项
 */
export enum ThemeColorPresets {
	/**
	 * 默认颜色
	 */
	Default = "default",
	/**
	 * 青色
	 */
	Cyan = "cyan",
	/**
	 * 紫色
	 */
	Purple = "purple",
	/**
	 * 蓝色
	 */
	Blue = "blue",
	/**
	 * 橙色
	 */
	Orange = "orange",
	/**
	 * 红色
	 */
	Red = "red",
}

/**
 * @enum {string} LocalEnum
 * @description 语言枚举，用于表示支持的多语言选项
 */
export enum LocalEnum {
	/**
	 * 英文（美国）
	 */
	en_US = "en_US",
	/**
	 * 中文（简体）
	 */
	zh_CN = "zh_CN",
}

/**
 * @enum {string} MultiTabOperation
 * @description 多标签页操作枚举，用于表示对标签页进行的各种操作
 */
export enum MultiTabOperation {
	/**
	 * 全屏显示
	 */
	FULLSCREEN = "fullscreen",
	/**
	 * 刷新标签页
	 */
	REFRESH = "refresh",
	/**
	 * 关闭标签页
	 */
	CLOSE = "close",
	/**
	 * 关闭其他标签页
	 */
	CLOSEOTHERS = "closeOthers",
	/**
	 * 关闭所有标签页
	 */
	CLOSEALL = "closeAll",
	/**
	 * 关闭左侧标签页
	 */
	CLOSELEFT = "closeLeft",
	/**
	 * 关闭右侧标签页
	 */
	CLOSERIGHT = "closeRight",
}

/**
 * @enum {number} PermissionType
 * @description 权限类型枚举，用于表示不同的权限类型
 */
export enum PermissionType {
	/**
	 * 目录权限
	 */
	CATALOGUE = 0,
	/**
	 * 菜单权限
	 */
	MENU = 1,
	/**
	 * 按钮权限
	 */
	BUTTON = 2,
}
