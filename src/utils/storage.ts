import type { StorageEnum } from "#/enum"; // 导入 StorageEnum 枚举类型

/**
 * 从 localStorage 获取并解析 JSON 对象
 * @template T - 返回值的类型
 * @param key - localStorage 中存储的键名
 * @returns 解析后的对象或 null
 */
export const getItem = <T>(key: StorageEnum): T | null => {
	let value = null;
	try {
		// 从 localStorage 获取字符串值
		const result = window.localStorage.getItem(key);
		if (result) {
			// 如果存在结果，解析为 JSON 对象
			value = JSON.parse(result);
		}
	} catch (error) {
		// 捕获解析错误并打印到控制台
		console.error(error);
	}
	return value;
};

/**
 * 从 localStorage 获取字符串值
 * @param key - localStorage 中存储的键名
 * @returns 存储的字符串值或 null
 */
export const getStringItem = (key: StorageEnum): string | null => {
	return localStorage.getItem(key);
};

/**
 * 将对象以 JSON 字符串格式存储到 localStorage
 * @template T - 存储值的类型
 * @param key - localStorage 中存储的键名
 * @param value - 需要存储的值
 */
export const setItem = <T>(key: StorageEnum, value: T): void => {
	// 将值序列化为 JSON 字符串并存储到 localStorage
	localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 从 localStorage 中移除指定键名的存储项
 * @param key - localStorage 中存储的键名
 */
export const removeItem = (key: StorageEnum): void => {
	localStorage.removeItem(key);
};

/**
 * 清空 localStorage 中的所有存储项
 */
export const clearItems = () => {
	localStorage.clear();
};
