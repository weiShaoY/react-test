import { fetchHttp } from "../../http";

class BlogApi {
	/**
	 *  测试接口
	 */
	test() {
		return fetchHttp("https://api.xywlapi.cc/qqapi?qq=1604705673");
	}

	/**
	 *  获取 大盘黄金价格
	 *  @description https://api.pearktrue.cn/info?id=348
	 */
	getMarketGoldPrice() {
		return fetchHttp("https://api.pearktrue.cn/api/goldprice/");
	}

	/**
	 *  获取 品牌黄金价格
	 */
	getBrandGoldPrice() {
		return fetchHttp("https://free.xwteam.cn/api/gold/brand");
	}

	/**
	 *  获取 问候语
	 */
	getGreeting() {
		return fetchHttp("https://api.kuleu.com/api/getGreetingMessage?type=json");
	}

	/**
	 *  获取 励志语句
	 */
	getMotivationalQuotes() {
		return fetchHttp("https://zj.v.api.aa1.cn/api/wenan-zl/?type=json");
	}

	/**
	 *  获取 即将上映电影
	 */
	getComingSoonMovie() {
		return fetchHttp("https://free.xwteam.cn/api/cinema/coming");
	}

	/**
	 *  获取 院线热播电影
	 */
	getHotTheaterMovie() {
		return fetchHttp("https://free.xwteam.cn/api/cinema/hot");
	}

	/**
	 *  获取 王者荣耀战力
	 *  @param {string} type - 战力类型
	 *  @param {string} hero - 英雄名称
	 */
	getHok(type: string, hero: string) {
		return fetchHttp(
			`https://free.xwteam.cn/api/game/hok?type=${type}&hero=${hero}`,
		);
	}

	/**
	 *  获取 壁纸
	 *  @param {string} category - 壁纸分类
	 */
	getWallpaper(category: string) {
		return fetchHttp(`https://free.xwteam.cn/api/img/pic?category=${category}`);
	}

	/**
	 *  获取 随机美少女视频
	 */
	getRandomGirlVideo() {
		return fetchHttp("http://www.wudada.online/Api/ScSp");
	}

	/**
	 *  获取  随机返回一条小姐姐视频
	 */
	getRandomReturnOneGirlVideo() {
		return fetchHttp("https://tools.mgtv100.com/external/v1/pear/xjj");
	}

	/**
	 *  获取 测试视频
	 */
	getTestVideo() {
		return fetchHttp("https://tucdn.wpon.cn/api-girl/index.php?wpon=json");
	}

	/**
	 *  获取车牌信息
	 *  @param {string} licensePlateNumber - 车牌号
	 */
	getLicensePlateNumberInfo(licensePlateNumber: string) {
		return fetchHttp(
			`https://v.api.aa1.cn/api/car-number-fl/index.php?num=${licensePlateNumber}`,
		);
	}

	/**
	 *  获取 域名的 whois 信息
	 *  @param {string} domain - 域名
	 */
	getDomainWhoisInfo(domain: string) {
		return fetchHttp(`https://v2.api-m.com/api/whois?domain=${domain}`);
	}

	/**
	 *  获取 网址综合查询
	 *  @param {string} domain - 域名
	 *  @description https://api.pearktrue.cn/info?id=199
	 */
	getWebsiteDetails(domain: string) {
		return fetchHttp(
			`https://api.pearktrue.cn/api/website/synthesis.php?url=${domain}`,
		);
	}

	/**
	 *  获取 随机绿茶语音
	 *  @description https://api.pearktrue.cn/info?id=143
	 */
	getRandomGreenTeaVoice() {
		return fetchHttp("https://api.pearktrue.cn/api/greentea/?type=mp3");
	}

	/**
	 *  获取 随机怼人语音
	 *  @description https://api.pearktrue.cn/info?id=146
	 */
	getRandomDuiRenVoice() {
		return fetchHttp("https://api.pearktrue.cn/api/duiren/?type=mp3");
	}

	/**
	 *  获取 随机御姐撒娇语音
	 *  @description https://api.pearktrue.cn/info?id=145
	 */
	getRandomYujieVoice() {
		return fetchHttp("https://api.pearktrue.cn/api/yujie/?type=mp3");
	}

	/**
	 *  全国油价查询
	 *  @description https://api.pearktrue.cn/info?id=282
	 */
	getOilPrices() {
		return fetchHttp("https://api.pearktrue.cn/api/oil/");
	}

	/**
	 *  IP同站查询
	 *  @description https://api.pearktrue.cn/info?id=265
	 */
	getIpHistoricalSites(ip: string) {
		return fetchHttp(`https://api.pearktrue.cn/api/website/sameip/?ip=${ip}`);
	}
	/**
	 *  IP端口查询
	 *  https://api.pearktrue.cn/info?id=244
	 */
	getIpPortFromCensys(ip: string) {
		return fetchHttp(`https://api.pearktrue.cn/api/ipport/?ip=${ip}`);
	}

	/**
	 * 获取 域名比价查询
	 *  @description https://api.pearktrue.cn/info?id=236
	 *  @param {string} domainExtension - 域名后缀
	 * @param {string} [type='new'] - 查询模式，默认为注册 (`new`)，可选：`new`（注册）、`renew`（续费）、`transfer`（转入）。
	 */
	getDomainExtensionPriceRanking(
		domainExtension: string,
		type: "new" | "renew" | "transfer" = "new",
	) {
		return fetchHttp(
			`https://api.pearktrue.cn/api/website/domain/?domain=${domainExtension}&type=${type}`,
		);
	}

	/**
	 *  获取 恋爱话术
	 *  @description https://api.pearktrue.cn/info?id=75
	 *  @param {string} question - 问题
	 *  @param {number} page - 页码
	 */
	getLoveSpeech(question: string, page: number) {
		return fetchHttp(
			`https://api.pearktrue.cn/api/love/?question=${question}&page=${page}`,
		);
	}

	/**
	 *  获取 商品历史价格查询
	 *  @description https://api.pearktrue.cn/info?id=66
	 */
	getPriceHistory(url: string) {
		return fetchHttp(
			`https://api.pearktrue.cn/api/shop/history.php?url=${url}`,
		);
	}

	/**
	 *  获取 快递物流查询
	 *  @description https://api.pearktrue.cn/info?id=61
	 *  @param {string} order - 快递单号
	 */
	getLogistic(order: string) {
		return fetchHttp(`https://api.pearktrue.cn/api/kuaidi/?order=${order}`);
	}

	/**
	 *  QQ号查询绑定手机
	 *  @description https://zy.xywlapi.cc/
	 */
	getQqQueryPhone(qq: string) {
		return fetchHttp(`https://api.xywlapi.cc/qqapi?qq=${qq}`);
	}

	/**
	 *  手机号查询绑定QQ
	 */
	getPhoneQueryQq(phone: string) {
		return fetchHttp(`https://api.xywlapi.cc/qqphone?phone=${phone}`);
	}

	/**
	 *  QQ号查询LOL信息
	 */
	getQqQueryLol(qq: string) {
		return fetchHttp(`https://api.xywlapi.cc/qqlol?qq=${qq}`);
	}

	/**
	 *  LOL查询QQ信息
	 */
	getLolQueryQq(lol: string) {
		return fetchHttp(`https://api.xywlapi.cc/lolname?name=${lol}`);
	}

	/**
	 *  QQ号查询老密
	 */
	getQqQueryOldPassword(qq: string) {
		return fetchHttp(`https://api.xywlapi.cc/qqlm?qq=${qq}`);
	}

	/**
	 *  微博通过ID查手机号
	 */
	getWeiBoQueryPhone(id: string) {
		return fetchHttp(`https://api.xywlapi.cc/wbapi?id=${id}`);
	}

	/**
	 *  通过手机号查微博ID
	 */
	getPhoneQueryWeiBo(phone: string) {
		return fetchHttp(`https://api.xywlapi.cc/wbphone?phone=${phone}`);
	}
}

export default new BlogApi();
