import { fetchHttp } from "../../http";

class BlogApi {
	/**
	 * 测试接口
	 */
	test() {
		return fetchHttp("https://tools.mgtv100.com/external/v1/pear/goldPrice");
	}

	/**
	 * 获取大盘黄金价格
	 */
	getMarketGoldPrice() {
		return fetchHttp("https://tools.mgtv100.com/external/v1/pear/goldPrice");
	}

	/**
	 * 获取品牌黄金价格
	 */
	getBrandGoldPrice() {
		return fetchHttp("https://free.xwteam.cn/api/gold/brand");
	}

	/**
	 * 获取问候语
	 */
	getGreeting() {
		return fetchHttp("https://api.kuleu.com/api/getGreetingMessage?type=json");
	}

	/**
	 * 获取励志语句
	 */
	getMotivationalQuotes() {
		return fetchHttp("https://zj.v.api.aa1.cn/api/wenan-zl/?type=json");
	}

	/**
	 * 获取即将上映电影
	 */
	getComingSoonMovie() {
		return fetchHttp("https://free.xwteam.cn/api/cinema/coming");
	}

	/**
	 * 获取院线热播电影
	 */
	getHotTheaterMovie() {
		return fetchHttp("https://free.xwteam.cn/api/cinema/hot");
	}

	/**
	 * 获取王者荣耀战力
	 * @param {string} type - 战力类型
	 * @param {string} hero - 英雄名称
	 */
	getHok(type: string, hero: string) {
		return fetchHttp(
			`https://free.xwteam.cn/api/game/hok?type=${type}&hero=${hero}`,
		);
	}

	/**
	 * 获取壁纸
	 * @param {string} category - 壁纸分类
	 */
	getWallpaper(category: string) {
		return fetchHttp(`https://free.xwteam.cn/api/img/pic?category=${category}`);
	}

	/**
	 * 获取随机美少女视频
	 */
	getRandomGirlVideo() {
		return fetchHttp("http://www.wudada.online/Api/ScSp");
	}

	/**
	 * 获取随机返回一条小姐姐视频
	 */
	getRandomReturnOneGirlVideo() {
		return fetchHttp("https://tools.mgtv100.com/external/v1/pear/xjj");
	}

	/**
	 *  获取测试视频
	 */
	getTestVideo() {
		return fetchHttp("https://tucdn.wpon.cn/api-girl/index.php?wpon=json");
	}

	/**
	 *  获取车牌信息
	 */
	getLicensePlateNumberInfo(licensePlateNumber: string) {
		return fetchHttp(
			`https://v.api.aa1.cn/api/car-number-fl/index.php?num=${licensePlateNumber}`,
		);
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
}

export default new BlogApi();
