import { toast } from "sonner";

/**
 * 检查接口响应码是否有效
 * @param {any} result - 接口返回的结果
 * @returns {boolean} 是否为有效响应码
 */
function isValidResponseCode(result: any): boolean {
	console.log("%c Line:9 🍢 result", "color:#f5ce50", result.code);
	const validCodes = [200, "200", 1, 0]; // 可扩展的有效响应码

	const errorCodes = [500]; // 特殊允许的错误响应码
	return (
		validCodes.includes(result?.code) ||
		validCodes.includes(result?.status) ||
		errorCodes.includes(result?.status)
	);
}

/**
 * 通用 fetch 请求封装
 * @param {string} url - 请求的 URL
 * @param {RequestInit} [options={}] - 可选的 fetch 配置选项
 * @returns {Promise<any>} 返回解析后的数据
 * @throws 如果发生 HTTP 错误或接口响应码无效
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

		// 解析 JSON 数据（如果无法解析则返回原始内容）
		const result = await response.json().catch(() => response);

		// 检查接口响应码是否有效
		if (!isValidResponseCode(result)) {
			const errorMessage =
				result.message || `接口响应码错误: ${result.code || "未知"}`;
			toast.error(errorMessage);
			throw new Error(errorMessage);
		}

		// 返回数据
		return result?.data || result;
	} catch (error: any) {
		console.error("接口请求错误:", error);
		// toast.error(`接口请求失败: ${error.message || "未知错误"}`);
		throw error; // 确保调用方可以捕获到错误
	}
}
