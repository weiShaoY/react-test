import { message } from "antd";

class BlogApi {
	/**
	 * 测试获取黄金价格接口
	 */
	async test() {
		try {
			const response = await fetch(
				"https://tools.mgtv100.com/external/v1/pear/goldPrice",
			);

			// 检查响应状态是否正常
			if (!response.ok) {
				throw new Error(`HTTP 错误！状态码: ${response.status}`);
			}

			// 解析并返回 JSON 数据
			const { data } = await response.json();
			return data;
		} catch (error) {
			// 捕获错误并提示用户
			message.error(error?.message || "请求失败，请稍后再试");
		}
	}

	/**
	 *  获取黄金价格
	 */
	async getGoldPrice() {
		try {
			const response = await fetch(
				"https://tools.mgtv100.com/external/v1/pear/goldPrice",
			);

			// 检查响应状态是否正常
			if (!response.ok) {
				throw new Error(`HTTP 错误！状态码: ${response.status}`);
			}

			// 解析并返回 JSON 数据
			const { data } = await response.json();
			return data;
		} catch (error) {
			// 捕获错误并提示用户
			message.error(error?.message || "请求失败，请稍后再试");
		}
	}
}

export default new BlogApi();
