/**
 *  校验域名是否有效
 *  @param {string} domain - 域名
 */
export function isValidDomain(domain: string) {
	const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
	return domainPattern.test(domain);
}

/**
 *  校验邮箱格式是否有效
 *  @param {string} email - 邮箱
 */
export function isValidEmail(email: string) {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return emailPattern.test(email);
}

/**
 * 验证车牌号是否符合中国标准
 * @param plateNumber - 车牌号字符串
 * @returns 是否符合
 */
export function isValidPlateNumber(plateNumber: string) {
	// 民用车牌（含新能源）
	const civilianRegex =
		/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵青藏川宁琼粤港澳使][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]?$/;

	// 警车牌
	const policeRegex =
		/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵青藏川宁琼粤港澳]警\d{5}$/;

	// 军车牌
	const militaryRegex =
		/^[A-Z]{1,2}\d{5}$|^[A-Z]{1,2}\d{2,4}[北广沈兰成济南哈]$/;

	// 验证规则
	return (
		civilianRegex.test(plateNumber) ||
		policeRegex.test(plateNumber) ||
		militaryRegex.test(plateNumber)
	);
}

/**
 * 验证输入的是否为有效的QQ号
 *
 * @param {string} qq - 输入的QQ号
 * @returns {boolean} - 如果是有效的QQ号，返回true，否则返回false
 */
export function isValidQQ(qq: string): boolean {
	const qqRegex = /^[1-9]\d{4,10}$/; // 正则：5-11位数字，第一个数字不能为0
	return qqRegex.test(qq);
}
