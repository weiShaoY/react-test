/**
 *  校验域名是否有效
 *  @param {string} domain - 域名
 */
export const isValidDomain = (domain: string): boolean => {
	const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
	return domainPattern.test(domain);
};

/**
 *  校验邮箱格式是否有效
 *  @param {string} email - 邮箱
 */
export const isValidEmail = (email: string): boolean => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return emailPattern.test(email);
};
