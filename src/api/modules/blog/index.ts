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

	/**
	 *  获取问候语
	 */
	async getGreeting() {
		try {
			// 添加查询参数 type=json 确保获取 JSON 格式数据
			const response = await fetch(
				"https://api.kuleu.com/api/getGreetingMessage?type=json",
			);

			// 打印响应信息以便调试
			console.log("%c Line:59 🍋 response", "color:#2eafb0", response);

			// 检查响应状态是否正常
			if (!response.ok) {
				throw new Error(`HTTP 错误！状态码: ${response.status}`);
			}

			// 解析 JSON 数据
			const { code, data } = await response.json();

			if (code !== 200) {
				message.error("接口返回错误");
				throw new Error(data.msg || "接口返回错误");
			}

			return data;
		} catch (error) {
			// 捕获错误并提示用户
			message.error(error?.message || "请求失败，请稍后再试");
			console.error("请求失败：", error);
			return null; // 确保返回值始终有意义
		}
	}
}

export default new BlogApi();
