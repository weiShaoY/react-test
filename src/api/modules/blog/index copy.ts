import { message } from "antd";

import { fetchHttp } from "../../http";

class BlogApi {
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
	 *  获取大盘黄金价格
	 */
	async getMarketGoldPrice() {
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
	 *  获取品牌黄金价格
	 */
	async getBrandGoldPrice() {
		try {
			const response = await fetch("https://free.xwteam.cn/api/gold/brand");

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
	/**
	 *  获取励志语句
	 */
	async getMotivationalQuotes() {
		try {
			const response = await fetch(
				"https://zj.v.api.aa1.cn/api/wenan-zl/?type=json",
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
	 *  获取即将上映电影
	 */
	async getComingSoonMovie() {
		try {
			const response = await fetch("https://free.xwteam.cn/api/cinema/coming");

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
	 *  获取院线热播电影
	 */
	async getHotTheaterMovie() {
		try {
			const response = await fetch("https://free.xwteam.cn/api/cinema/hot");

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
	 *  获取王者荣耀战力
	 */
	async getHok(type: string, hero: string) {
		try {
			const response = await fetch(
				`https://free.xwteam.cn/api/game/hok?type=${type}&hero=${hero}`,
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
	 *  获取壁纸
	 */
	async getWallpaper(category: string) {
		try {
			const response = await fetch(
				`https://free.xwteam.cn/api/img/pic?category=${category}`,
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

	//  今日热点 https://v.api.aa1.cn/api/topbaidu/index.php
	//  随机壁纸图片[API盒子官方资源库] https://cn.apihz.cn/api/img/apihzimgbz.php?id=88888888&key=88888888&type=1&imgtype=2
	//  随机壁纸 https://www.bfbke.com/bzApi.php?type=sj

	//  新闻简报 https://dayu.qqsuu.cn/weiyujianbao/apis.php?type=json
	//  每日更新假期倒计时日历 https://dayu.qqsuu.cn/moyurili/apis.php?type=json
	// 品牌黄金 https://free.xwteam.cn/api/gold/brand
	// 摸鱼日报美女视频版 https://dayu.qqsuu.cn/moyuribaoshipin/apis.php?type=json

	//  随机美少女视频 https://www.wudada.online/Api/ScSp
	//  随机返回一条小姐姐视频 https://tools.mgtv100.com/external/v1/pear/xjj

	/**
	 *  获取随机美少女视频
	 */
	async getRandomGirlVideo() {
		try {
			const response = await fetch("http://www.wudada.online/Api/ScSp");

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
	 *  获取随机返回一条小姐姐视频
	 */
	async getRandomReturnOneGirlVideo() {
		try {
			const response = await fetch(
				"https://tools.mgtv100.com/external/v1/pear/xjj",
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
	 *  获取测试视频
	 */
	async getTestVideo() {
		return fetchHttp("https://api.dwo.cc/api/ksvideo?type=json");
	}
}

export default new BlogApi();
