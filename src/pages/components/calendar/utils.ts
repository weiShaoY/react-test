import {
	HolidayUtil,
	Solar,
	SolarMonth,
	SolarUtil,
	SolarWeek,
} from "lunar-typescript";

/**
 *  日历-每天数据
 */
export type DayType = {
	/**
	 *  描述
	 */
	desc: string;

	/**
	 *  年月日字符串
	 */
	ymd: string;

	/**
	 *  阳历年份
	 */
	year: number;

	/**
	 *  阳历月份
	 */
	month: number;

	/**
	 *  阳历日期
	 */
	day: number;

	/**
	 *  星期几
	 */
	dayOfWeek: string;

	/**
	 *  一年中的第几天
	 */
	dayOfYear: number;

	/**
	 *  星座
	 */
	xingZuo: string;

	/**
	 *  一年中的第几周
	 */
	weekOfYear: number;

	/**
	 *  距离今天的天数
	 */
	dayFromToday: number;

	/**
	 *  农历年份
	 */
	lunarYear: string;

	/**
	 *  农历月份
	 */
	lunarMonth: string;

	/**
	 *  农历日期
	 */
	lunarDay: string;

	/**
	 *  年干支
	 */
	yearGanZhi: string;

	/**
	 *  月干支
	 */
	monthGanZhi: string;

	/**
	 *  日干支
	 */
	dayGanZhi: string;

	/**
	 *  生肖
	 */
	shengXiao: string;

	/**
	 *  月相
	 */
	yueXiang: string;

	/**
	 *  物候
	 */
	wuHou: string;

	/**
	 *  福神
	 */
	fuShen: string;

	/**
	 *  财神
	 */
	caiShen: string;

	/**
	 *  宜数组
	 */
	yiArray: string[];

	/**
	 *  忌数组
	 */
	jiArray: string[];

	/**
	 *  是否是今天
	 */
	isToday: boolean;

	/**
	 *  是否选中
	 */
	isSelected: boolean;

	/**
	 *  是否是节假日
	 */
	isHoliday: boolean;

	/**
	 *  是否是休息日
	 */
	isRestDay: boolean;

	/**
	 *  是否是特定的节日
	 */
	isFestival: boolean;

	/**
	 *  特定的节日数组
	 */
	festivalArray: string[];
};

/**
 *  日历-每周数据
 */
export type WeekType = {
	/**
	 *  每周的数据
	 */
	dayArray: DayType[];

	/**
	 *  每周的索引(在一年中的第几周)
	 */
	weekIndex: number;

	/**
	 *  是否是今天所在的周
	 */
	isTodayWeek: boolean;
};

/**
 *  日历-每月数据
 */
export type MonthType = {
	/**
	 *  每月的数据
	 */
	weeks: WeekType[];

	/**
	 *  周标题
	 */
	weekTitleArray: string[];
};

/**
 *  日历-节日信息
 */
export type HolidayType = {
	/**
	 *  节日名称
	 */
	name: string;

	/**
	 *  节日所在月份
	 */
	month: number;
};

/**
 *  存储日历的状态，如年份、月份等
 */
export type StateType = {
	/**
	 *  被选中的日，类型为DayType
	 */
	selectedDay: DayType;

	/**
	 *  年份，初始化为当前年份
	 */
	year: number;

	/**
	 *  月份，初始化为当前月份
	 */
	month: number;

	/**
	 *  一周的开始是星期几，此处初始化为星期一
	 */
	weekStart: number;

	/**
	 *  当前展示的月份数据，类型为MonthType
	 */
	monthData: MonthType;

	/**
	 *  节日数组，类型为HolidayType
	 */
	holidays: HolidayType[];

	/**
	 *  关注的节日所在的月份，初始化为0，表示没有特定的月份
	 */
	holidayMonth: number;

	/**
	 *  是否显示回到今天按钮
	 */
	isShowBackToday: boolean;
};

/**
 * 日历工具
 */
class CalendarUtils {
	/**
	 * 构建Day对象的函数，用于根据Solar对象（代表具体的某天）生成一个完整的Day对象。
	 * @param {Solar} d 代表特定日期的Solar对象。
	 * @param {StateType} state 存储日历的状态，如年份、月份等
	 * @returns 初始化并填充数据的Day对象。
	 */
	static buildDay(d: Solar, state: StateType): DayType {
		/**
		 *  获取该日期的年月日字符串
		 */
		const ymd = d.toYmd();

		/**
		 *  获取对应的农历对象
		 */
		const lunar = d.getLunar();

		/**
		 *  创建一个新的 Day 对象并填充数据
		 */
		const day: DayType = {
			desc: lunar.getDayInChinese(),
			ymd: d.toYmd(),
			year: d.getYear(),
			month: d.getMonth(),
			day: d.getDay(),
			dayOfWeek: d.getWeekInChinese(),
			dayOfYear: SolarUtil.getDaysInYear(d.getYear(), d.getMonth(), d.getDay()),
			weekOfYear: SolarWeek.fromYmd(
				d.getYear(),
				d.getMonth(),
				d.getDay(),
				1,
			).getIndexInYear(),
			dayFromToday: Solar.fromYmd(
				d.getYear(),
				d.getMonth(),
				d.getDay(),
			).subtract(Solar.fromDate(new Date())),
			xingZuo: d.getXingZuo(),
			lunarYear: lunar.getYearInChinese(),
			lunarMonth: lunar.getMonthInChinese(),
			lunarDay: lunar.getDayInChinese(),
			yearGanZhi: lunar.getYearInGanZhi(),
			monthGanZhi: lunar.getMonthInGanZhi(),
			dayGanZhi: lunar.getDayInGanZhi(),
			shengXiao: lunar.getYearShengXiao(),
			yueXiang: lunar.getYueXiang(),
			wuHou: lunar.getWuHou(),
			fuShen: lunar.getDayPositionFuDesc(),
			caiShen: lunar.getDayPositionCaiDesc(),
			yiArray: lunar.getDayYi(),
			jiArray: lunar.getDayJi(),
			isToday: ymd === Solar.fromDate(new Date()).toYmd(),
			isSelected: ymd === state.selectedDay.ymd,
			isHoliday: false,
			isRestDay: [0, 6].includes(d.getWeek()), // 周末为休息日
			isFestival: false,
			festivalArray: [],
		};

		// 如果是今天且当前选中的Day对象为空，则将当前Day对象设为选中
		if (day.isToday && !state.selectedDay.day) {
			state.selectedDay = day;
		}

		// 合并农历节日  农历节气  阳历节日
		const allFestivals = [
			...lunar.getFestivals(),
			...[lunar.getJieQi()],
			...d.getFestivals(),
		];

		if (allFestivals.length > 0) {
			day.desc = allFestivals[0];
			day.festivalArray.push(...allFestivals);
			day.isFestival = true;
		}

		// 其他纪念日的数组，例如世界抗癌日、香港回归纪念日等，有可能同一天有多个，也可能没有 但如果有也不设置 day 为节日
		day.festivalArray.push(
			...d.getOtherFestivals(),
			...lunar.getOtherFestivals(),
		);

		// 如果 day 为农历每月的初一
		if (lunar.getDay() === 1) {
			day.desc = `${lunar.getMonthInChinese()}月`;
		}

		// 如果 day 为正月初一
		if (lunar.getMonth() === 1 && lunar.getDay() === 1) {
			day.desc = `${day.yearGanZhi}年`;
		}

		// 获取节日
		const holiday = HolidayUtil.getHoliday(ymd);

		if (holiday) {
			day.isRestDay = !holiday.isWork();
		}

		day.isHoliday = !!holiday;

		return day;
	}

	/**
	 * 渲染函数，用于根据当前的年份和月份重新计算并渲染页面。
	 */
	render(state: StateType) {
		state.isShowBackToday =
			state.selectedDay.ymd !== Solar.fromDate(new Date()).toYmd() ||
			state.month !== Solar.fromDate(new Date()).getMonth() ||
			state.year !== Solar.fromDate(new Date()).getYear();

		const year = Number.parseInt(`${state.year}`, 10);

		const month = Number.parseInt(`${state.month}`, 10);

		// 创建月份实例
		const monthData: MonthType = {
			weeks: [],
			weekTitleArray: [],
		};

		// 获取当前月份的所有周
		const solarWeeks = SolarMonth.fromYm(year, month).getWeeks(state.weekStart);

		// 确保每个月都显示六周，以保持日历布局的一致性
		const weeks = [...solarWeeks];

		while (weeks.length < 6) {
			weeks.push(weeks[weeks.length - 1].next(1, false));
		}

		// 遍历每一周
		for (const w of weeks) {
			// 创建周实例
			const week: WeekType = {
				dayArray: [],
				weekIndex: w.getIndexInYear(),
				isTodayWeek: false,
			};

			// 存储周的头部信息，即星期几
			const weekTitle: string[] = [];

			// 遍历周内的每一天
			for (const d of w.getDays()) {
				// 将每一天的星期几添加到头部信息中
				weekTitle.push(d.getWeekInChinese());

				// 构建并添加每一天的日期信息到当前周中
				week.dayArray.push(CalendarUtils.buildDay(d, state));
			}

			/**
			 * 将计算标志设置为 false，表示已经检查过
			 */
			let isWeekChecked = true;

			if (
				isWeekChecked &&
				w.getYear() === Solar.fromDate(new Date()).getYear() &&
				SolarWeek.fromYmd(
					w.getYear(),
					w.getMonth(),
					w.getDay(),
					1,
				).getIndexInYear() ===
					SolarWeek.fromDate(new Date(), 1).getIndexInYear()
			) {
				week.isTodayWeek = true;
			}

			// 将计算标志设置为 false，表示已经检查过
			isWeekChecked = false;

			// 将头部信息存储到月份实例中
			monthData.weekTitleArray = weekTitle;

			// 将当前周存储到月份实例中
			monthData.weeks.push(week);
		}

		// 存储月份实例到 state 中
		state.monthData = monthData;

		// 构建节假日信息
		const holidays = HolidayUtil.getHolidays(year).reduce<
			{ name: string; month: number }[]
		>((acc, h) => {
			const holidayMonth = Number.parseInt(h.getTarget().substring(5, 7), 10);

			if (!acc.some((a) => a.name === h.getName())) {
				acc.push({
					name: h.getName(),
					month: holidayMonth,
				});
			}

			return acc;
		}, []);

		// 存储节假日信息到 state 中
		state.holidays = holidays;

		// return state
	}

	/**
	 *  初始化日历状态
	 */
	init(): StateType {
		/**
		 * 使用当前日期创建一个Solar对象实例，以便获取和使用当前日期的相关信息
		 */
		const now = Solar.fromDate(new Date());

		const nowLunar = now.getLunar();

		return {
			selectedDay: {
				desc: nowLunar.getDayInChinese(),
				ymd: now.toYmd(),
				year: now.getYear(),
				month: now.getMonth(),
				day: now.getDay(),
				dayOfWeek: now.getWeekInChinese(),
				dayOfYear: SolarUtil.getDaysInYear(
					now.getYear(),
					now.getMonth(),
					now.getDay(),
				),
				weekOfYear: SolarWeek.fromYmd(
					now.getYear(),
					now.getMonth(),
					now.getDay(),
					1,
				).getIndexInYear(),
				dayFromToday: Solar.fromYmd(
					now.getYear(),
					now.getMonth(),
					now.getDay(),
				).subtract(now),
				xingZuo: now.getXingZuo(),
				lunarYear: nowLunar.getYearInChinese(),
				lunarMonth: nowLunar.getMonthInChinese(),
				lunarDay: nowLunar.getDayInChinese(),
				yearGanZhi: nowLunar.getYearInGanZhi(),
				monthGanZhi: nowLunar.getMonthInGanZhi(),
				dayGanZhi: nowLunar.getDayInGanZhi(),
				shengXiao: nowLunar.getYearShengXiao(),
				yueXiang: nowLunar.getYueXiang(),
				wuHou: nowLunar.getWuHou(),
				fuShen: nowLunar.getDayPositionFuDesc(),
				caiShen: nowLunar.getDayPositionCaiDesc(),
				yiArray: nowLunar.getDayYi(),
				jiArray: nowLunar.getDayJi(),
				isToday: true,
				isSelected: false,
				isHoliday: false,
				isRestDay: [0, 6].includes(now.getWeek()), // 周末为休息日
				isFestival: false,
				festivalArray: [],
			},

			year: now.getYear(),

			month: now.getMonth(),

			weekStart: 1,

			monthData: {
				weeks: [],
				weekTitleArray: [],
			},

			holidays: [],

			holidayMonth: 0,

			isShowBackToday: false,
		};
	}

	/**
	 *  跳转到上一个月
	 */
	toPrevMonth(state: StateType) {
		state.month = state.month - 1;
		if (state.month < 1) {
			state.month = 12;
			state.year = state.year - 1;
		}
		this.render(state);
	}

	/**
	 *  跳转到下一个月
	 */
	// toNextMonth(state: StateType) {
	//   console.log("%c Line:525 🌰 state", "color:#2eafb0", state);
	//   state.month = state.month + 1
	//   if (state.month > 12) {
	//     state.month = 1
	//     state.year = state.year + 1
	//   }
	//   // 渲染
	//   this.render(state)
	// }
}

export default new CalendarUtils();
