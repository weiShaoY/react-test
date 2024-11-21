/**
 *  检查是否为移动端
 *  @returns  是否为移动端
 */
export const isMobile = (() => {
	const userAgent = navigator.userAgent.toLowerCase();
	// 检查是否包含手机或移动设备关键字
	return userAgent.match(/(iphone|ipod|android|ios|mobile)/) !== null;
})();
