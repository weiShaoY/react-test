import { message } from "antd";

/**
 * 通用 fetch 请求封装
 * @param {string} url - 请求的 URL
 * @param {RequestInit} [options={}] - 可选的 fetch 配置选项
 * @returns {Promise<any>} 返回解析后的 JSON 数据
 */
async function fetchData(url: string, options: RequestInit = {}): Promise<any> {
	try {
		const response = await fetch(url, options);

		// 检查响应状态是否正常
		if (!response.ok) {
			throw new Error(`HTTP 错误！状态码: ${response.status}`);
		}

		// 解析并返回 JSON 数据
		const result = await response.json();
		if (result?.code && result.code !== 200) {
			message.error(result.message || "接口返回错误");
			throw new Error(result.message || "接口返回错误");
		}
		return result?.data || result;
	} catch (error: any) {
		// 捕获错误并提示用户
		message.error(error?.message || "请求失败，请稍后再试");
		throw error; // 确保调用方可以捕获到错误
	}
}

class BlogApi {
	/**
	 * 测试接口
	 */
	async test() {
		return fetchData("https://tools.mgtv100.com/external/v1/pear/goldPrice");
	}

	/**
	 * 获取大盘黄金价格
	 */
	async getMarketGoldPrice() {
		return fetchData("https://tools.mgtv100.com/external/v1/pear/goldPrice");
	}

	/**
	 * 获取品牌黄金价格
	 */
	async getBrandGoldPrice() {
		return fetchData("https://free.xwteam.cn/api/gold/brand");
	}

	/**
	 * 获取问候语
	 */
	async getGreeting() {
		return fetchData(
			"https://api.kuleu.com/api/getGreetingMessage?type=json",
		);
	}

	/**
	 * 获取励志语句
	 */
	async getMotivationalQuotes() {
		return fetchData(
			"https://zj.v.api.aa1.cn/api/wenan-zl/?type=json",
		);
	}

	/**
	 * 获取即将上映电影
	 */
	async getComingSoonMovie() {
		return fetchData("https://free.xwteam.cn/api/cinema/coming");
	}

	/**
	 * 获取院线热播电影
	 */
	async getHotTheaterMovie() {
		return fetchData("https://free.xwteam.cn/api/cinema/hot");
	}

	/**
	 * 获取王者荣耀战力
	 * @param {string} type - 战力类型
	 * @param {string} hero - 英雄名称
	 */
	async getHok(type: string, hero: string) {
		return fetchData(
			`https://free.xwteam.cn/api/game/hok?type=${type}&hero=${hero}`,
		);
	}

	/**
	 * 获取壁纸
	 * @param {string} category - 壁纸分类
	 */
	async getWallpaper(category: string) {
		return fetchData(
			`https://free.xwteam.cn/api/img/pic?category=${category}`,
		);
	}

	/**
	 * 获取随机美少女视频
	 */
	async getRandomGirlVideo() {
		return fetchData("http://www.wudada.online/Api/ScSp");
	}

	/**
	 * 获取随机返回一条小姐姐视频
	 */
	async getRandomReturnOneGirlVideo() {
		return fetchData("https://tools.mgtv100.com/external/v1/pear/xjj");
	}

	/**
	 * 获取测试视频
	 */
	async getTestVideo() {
		return fetchData("https://api.dwo.cc/api/ksvideo?type=json");
	}
}

export default new BlogApi();