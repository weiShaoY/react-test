import { message } from "antd";

/**
 * 通用 fetch 请求封装
 * @param {string} url - 请求的 URL
 * @param {RequestInit} [options={}] - 可选的 fetch 配置选项
 * @returns {Promise<any>} 返回解析后的 JSON 数据
 */
export async function fetchHttp(
	url: string,
	options: RequestInit = {},
): Promise<any> {
	try {
		const response = await fetch(url, options);

		// 检查响应状态是否正常
		if (!response.ok) {
			throw new Error(`HTTP 错误！状态码: ${response.status}`);
		}

		// 解析并返回 JSON 数据
		const result = await response.json();

		if (!(result?.code === 200 || result?.code === "200")) {
			message.error(`接口响应码错误:${result?.code || "接口响应码错误"}`);

			throw new Error(result.message || "接口响应码错误");
		}
		return result?.data || result;
	} catch (error: any) {
		message.error(`接口返回错误:${error?.message || "接口返回错误"}`);
		throw error; // 确保调用方可以捕获到错误
	}
}
