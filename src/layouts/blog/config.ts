/**
 * 布局尺寸配置对象，包含导航栏、页头和多标签页栏的尺寸设置
 */
export const dashboardConfig = {
	/**
	 * 导航栏展开时的宽度（单位：像素）
	 */
	NAV_WIDTH: 260,

	/**
	 * 导航栏折叠时的宽度（单位：像素）
	 */
	NAV_COLLAPSED_WIDTH: 80,

	/**
	 * 水平导航栏的高度（单位：像素）
	 */
	NAV_HORIZONTAL_HEIGHT: 48,

	/**
	 * 页头的高度（单位：像素）
	 */
	HEADER_HEIGHT: 80,

	/**
	 * 偏移后的页头高度（单位：像素），用于计算页面滚动时的偏移量
	 */
	OFFSET_HEADER_HEIGHT: 64,

	/**
	 * 多标签页栏的高度（单位：像素），通常用于显示多个打开的页面标签
	 */
	MULTI_TABS_HEIGHT: 32,
};

export default dashboardConfig;
