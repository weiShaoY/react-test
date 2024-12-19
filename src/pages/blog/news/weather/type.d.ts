/**
 *  实时天气数据
 */
type RealWeatherData = {
	/**
	 * 站点信息
	 */
	station: {
		/**
		 * 站点代码
		 */
		code: string;

		/**
		 * 所在省份
		 */
		province: string;

		/**
		 * 所在城市
		 */
		city: string;

		/**
		 * 站点网址
		 */
		url: string;
	};

	/**
	 * 实况发布时间
	 */
	publish_time: string;

	/**
	 * 天气信息
	 */
	weather: {
		/**
		 * 当前温度
		 */
		temperature: number;

		/**
		 * 温度差（与前次温度对比）
		 */
		temperatureDiff: number;

		/**
		 * 气压
		 */
		airpressure: number;

		/**
		 * 湿度
		 */
		humidity: number;

		/**
		 * 降雨量
		 */
		rain: number;

		/**
		 * 体感舒适度（以温度和湿度等因素计算）
		 */
		rcomfort: number;

		/**
		 * 体感指数
		 */
		icomfort: number;

		/**
		 * 天气状况简述
		 */
		info: string;

		/**
		 * 天气图标（如图标编号）
		 */
		img: string;

		/**
		 * 体感温度
		 */
		feelst: number;
	};

	/**
	 * 风力信息
	 */
	wind: {
		/**
		 * 风向（如“西北风”）
		 */
		direct: string;

		/**
		 * 风向角度（如“319”表示西北风的角度）
		 */
		degree: number;

		/**
		 * 风力等级（如“3级”）
		 */
		power: string;

		/**
		 * 风速（单位：米/秒）
		 */
		speed: number;
	};

	/**
	 * 预警信息
	 */
	warn: {
		/**
		 * 警报信息
		 */
		alert: string;

		/**
		 * 预警图片链接
		 */
		pic: string;

		/**
		 * 预警所在省份
		 */
		province: string;

		/**
		 * 预警所在城市
		 */
		city: string;

		/**
		 * 预警网址链接
		 */
		url: string;

		/**
		 * 发布内容
		 */
		issuecontent: string;

		/**
		 * 防范措施
		 */
		fmeans: string;

		/**
		 * 信号类型（如“红色”）
		 */
		signaltype: string;

		/**
		 * 信号等级（如“高级”）
		 */
		signallevel: string;

		/**
		 * 预警图片 2（备用图片）
		 */
		pic2: string;
	};

	/**
	 * 日出日落信息
	 */
	sunriseSunset: {
		/**
		 * 日出时间
		 */
		sunrise: string;

		/**
		 * 日落时间
		 */
		sunset: string;
	};
};

/**
 *  天气数据
 */
export type WeatherType = {
	/**
	 *  实时天气数据
	 */
	real: {
		/**
		 * 站点信息
		 */
		station: {
			/**
			 * 站点代码
			 */
			code: string;

			/**
			 * 所在省份
			 */
			province: string;

			/**
			 * 所在城市
			 */
			city: string;

			/**
			 * 站点网址
			 */
			url: string;
		};

		/**
		 * 实况发布时间
		 */
		publish_time: string;

		/**
		 * 天气信息
		 */
		weather: {
			/**
			 * 当前温度
			 */
			temperature: number;

			/**
			 * 温度差（与前次温度对比）
			 */
			temperatureDiff: number;

			/**
			 * 气压
			 */
			airpressure: number;

			/**
			 * 湿度
			 */
			humidity: number;

			/**
			 * 降雨量
			 */
			rain: number;

			/**
			 * 体感舒适度（以温度和湿度等因素计算）
			 */
			rcomfort: number;

			/**
			 * 体感指数
			 */
			icomfort: number;

			/**
			 * 天气状况简述
			 */
			info: string;

			/**
			 * 天气图标（如图标编号）
			 */
			img: string;

			/**
			 * 体感温度
			 */
			feelst: number;
		};

		/**
		 * 风力信息
		 */
		wind: {
			/**
			 * 风向（如“西北风”）
			 */
			direct: string;

			/**
			 * 风向角度（如“319”表示西北风的角度）
			 */
			degree: number;

			/**
			 * 风力等级（如“3级”）
			 */
			power: string;

			/**
			 * 风速（单位：米/秒）
			 */
			speed: number;
		};

		/**
		 * 预警信息
		 */
		warn: {
			/**
			 * 警报信息
			 */
			alert: string;

			/**
			 * 预警图片链接
			 */
			pic: string;

			/**
			 * 预警所在省份
			 */
			province: string;

			/**
			 * 预警所在城市
			 */
			city: string;

			/**
			 * 预警网址链接
			 */
			url: string;

			/**
			 * 发布内容
			 */
			issuecontent: string;

			/**
			 * 防范措施
			 */
			fmeans: string;

			/**
			 * 信号类型（如“红色”）
			 */
			signaltype: string;

			/**
			 * 信号等级（如“高级”）
			 */
			signallevel: string;

			/**
			 * 预警图片 2（备用图片）
			 */
			pic2: string;
		};

		/**
		 * 日出日落信息
		 */
		sunriseSunset: {
			/**
			 * 日出时间
			 */
			sunrise: string;

			/**
			 * 日落时间
			 */
			sunset: string;
		};
	};

	/**
	 *  天气预报数据
	 */
	predict: {
		/**
		 *  站点信息
		 */
		station: {
			/**
			 *  站点代码
			 */
			code: string;
			/**
			 *  所在省份
			 */
			province: string;

			/**
			 *  所在城市
			 */
			city: string;

			/**
			 *  站点网址
			 */
			url: string;
		};

		/**
		 * 实况发布时间
		 */
		publish_time: string;

		/**
		 *  详细预报
		 */
		detail: {
			/**
			 *  日期
			 */
			date: string;
			/**
			 *  预报时间
			 */
			pt: string;

			/**
			 *  白天天气
			 */
			day: {
				/**
				 *  天气信息
				 */
				weather: {
					/**
					 *  天气情况
					 */
					info: string;
					/**
					 *  天气图标
					 */
					img: string;
					/**
					 *  温度
					 */
					temperature: string;
				};
				/**
				 *  风力信息
				 */
				wind: {
					/**
					 *  风向
					 */
					direct: string;
					/**
					 *  风力等级
					 */
					power: string;
				};
			};

			/**
			 *  夜间天气
			 */
			night: {
				/**
				 *  天气信息
				 */
				weather: {
					/**
					 *  天气情况
					 */
					info: string;
					/**
					 *  天气图标
					 */
					img: string;
					/**
					 *  温度
					 */
					temperature: string;
				};
				/**
				 *  风力信息
				 */
				wind: {
					/**
					 *  风向
					 */
					direct: string;
					/**
					 *  风力等级
					 */
					power: string;
				};
			};

			/**
			 *  降水量
			 */
			precipitation: number;
		}[];
	};

	/**
	 *  空气质量实况数据
	 */
	air: {
		/**
		 *  更新时间
		 */
		forecasttime: "2024-12-19 15:00";
		/**
		 *  空气质量指数
		 */
		aqi: 91;
		/**
		 *  空气质量等级
		 */
		aq: 2;

		/**
		 *  空气质量文本
		 */
		text: "良";
		/**
		 *  空气质量代码
		 */
		aqiCode: "99031;99032;99033;99035;99037;99038;99039;99040";
	};

	/**
	 *  温度变化图表
	 */
	tempchart: {
		/**
		 *  时间
		 */
		time: string;
		/**
		 *  最高温度
		 */
		max_temp: number;
		/**
		 *  最低温度
		 */
		min_temp: number;
		/**
		 *  白天天气图标
		 */
		day_img: string;
		/**
		 *  白天天气文本
		 */
		day_text: string;
		/**
		 *  夜间天气图标
		 */
		night_img: string;
		/**
		 *  夜间天气文本
		 */
		night_text: string;
	}[];

	/**
	 *  过去的天气数据
	 */
	passedchart: {
		/**
		 *  1小时降雨量
		 */
		rain1h: number;

		/**
		 *  6小时降雨量
		 */
		rain6h: number;

		/**
		 *  12小时降雨量
		 */
		rain12h: number;

		/**
		 *  24小时降雨量
		 */
		rain24h: number;

		/**
		 *  温度
		 */
		temperature: number;

		/**
		 *  温差
		 */
		tempDiff: "";

		/**
		 *  湿度
		 */
		humidity: number;

		/**
		 *  气压
		 */
		pressure: number;

		/**
		 *  风向
		 */
		windDirection: number;

		/**
		 *  风速
		 */
		windSpeed: number;

		/**
		 *  时间
		 */
		time: string;
	}[];

	/**
	 *  气候数据
	 */
	climate: {
		/**
		 *  时间范围
		 *  @description  一般是 1981～2010
		 */
		time: string;

		/**
		 *  月份数据
		 */
		month: {
			/**
			 *  月份
			 */
			month: number;

			/**
			 *  最高温度
			 */
			maxTemp: number;

			/**
			 *  最低温度
			 */
			minTemp: number;

			/**
			 *  降水量
			 */
			precipitation: number;
		}[];
	};

	/**
	 *  实况雷达数据
	 */
	radar: {
		/**
		 *  标题
		 */
		title: string;

		/**
		 *  图片
		 *  @description  图片地址前缀拼接  http://www.nmc.cn/
		 */
		image: string;

		/**
		 *  链接
		 */
		url: string;
	};
};
