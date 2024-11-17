// 引入 numeral 库用于数字格式化
// 官网: https://numeraljs.com/
import numeral from "numeral";

// 定义输入值的类型，可以是 string、number、null 或 undefined
type InputValue = string | number | null | undefined;

/**
 * 格式化为一般数字格式
 * @param number - 输入的数字或字符串
 * @returns 格式化后的字符串
 */
export function fNumber(number: InputValue) {
	return numeral(number).format();
}

/**
 * 格式化为货币格式（带有美元符号）
 * @param number - 输入的数字或字符串
 * @returns 格式化后的货币字符串，如 "$1,000.00"
 */
export function fCurrency(number: InputValue) {
	// 使用 numeral 格式化为货币格式，如果输入为空则返回空字符串
	const format = number ? numeral(number).format("$0,0.00") : "";

	// 调用 result 函数去除小数点后的 ".00"（如果整数）
	return result(format, ".00");
}

/**
 * 格式化为百分比格式
 * @param number - 输入的数字或字符串
 * @returns 格式化后的百分比字符串，如 "50.0%"
 */
export function fPercent(number: InputValue) {
	// 将输入数字除以 100 后格式化为百分比格式
	const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

	// 调用 result 函数去除小数点后的 ".0"（如果整数）
	return result(format, ".0");
}

/**
 * 格式化为缩写数字格式（如千、百万、亿）
 * @param number - 输入的数字或字符串
 * @returns 缩写后的数字字符串，如 "1.00k"
 */
export function fShortenNumber(number: InputValue) {
	// 使用 numeral 格式化为缩写格式
	const format = number ? numeral(number).format("0.00a") : "";

	// 调用 result 函数去除小数点后的 ".00"（如果整数）
	return result(format, ".00");
}

/**
 * 格式化为字节（Bytes）格式
 * @param number - 输入的数字或字符串
 * @returns 格式化后的字节字符串，如 "1.0 KB"
 */
export function fBytes(number: InputValue) {
	// 使用 numeral 格式化为字节（Bytes）格式
	const format = number ? numeral(number).format("0.0 b") : "";

	// 调用 result 函数去除小数点后的 ".0"（如果整数）
	return result(format, ".0");
}

/**
 * 根据输入格式字符串判断并移除指定的后缀（如 ".00"、".0"）
 * @param format - 格式化后的字符串
 * @param key - 需要移除的后缀（默认为 ".00"）
 * @returns 移除后缀后的字符串
 */
function result(format: string, key = ".00") {
	// 判断格式化字符串中是否包含指定的后缀
	const isInteger = format.includes(key);

	// 如果包含指定后缀，则移除该后缀，否则返回原字符串
	return isInteger ? format.replace(key, "") : format;
}
