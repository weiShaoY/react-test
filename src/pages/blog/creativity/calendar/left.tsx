import { SvgIcon } from "@/components/icon";
import { useEventListener } from "ahooks";
import type { DatePickerProps } from "antd";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import CalendarUtils from "./utils";
import type { DayType, StateType } from "./utils";

import { Button, DatePicker } from "antd";

import dayjs, { type Dayjs } from "dayjs";
type LeftProps = {
	state: StateType;
	setState: React.Dispatch<React.SetStateAction<StateType>>;
};

function Calendar({ state, setState }: LeftProps) {
	const elementRef = useRef<HTMLDivElement>(null);

	const [monthPicker, setMonthPicker] = useState<Dayjs>(dayjs(new Date()));

	/**
	 * 选择日期
	 */
	const handleSelectDay = (day: DayType): void => {
		const newState = {
			...state,
			selectedDay: {
				...day,
				isSelected: true,
			},
		};

		CalendarUtils.render(newState);
		setState(newState);
	};

	/**
	 * 重置为当前日期
	 */
	const handleToday = (): void => {
		const updatedState = CalendarUtils.init();

		CalendarUtils.render(updatedState);

		setState({
			...updatedState,
		});
	};

	/**
	 * 监听年份、月份变化时调用渲染函数
	 */
	useEffect(() => {
		const newDayjsDate = dayjs(new Date(state.year, state.month - 1, 1));
		setMonthPicker(newDayjsDate);
		setState(state);
	}, [state, setState]);

	/**
	 * 月份选择器变化
	 */
	const handleMonthPickerChange: DatePickerProps["onChange"] = (date) => {
		const newState = {
			...state,
			year: date.year(),
			month: date.month() + 1,
			selectedDay: CalendarUtils.init().selectedDay,
		};

		CalendarUtils.render(newState);

		setState(newState);
	};

	/**
	 * 跳转到上一个月
	 */
	function handlePreviousMonth() {
		let newMonth = state.month - 1;
		let newYear = state.year;

		if (newMonth < 1) {
			newMonth = 12;
			newYear -= 1;
		}

		const newState = {
			...state,
			month: newMonth,
			year: newYear,
		};

		CalendarUtils.render(newState);

		setState(newState);
	}

	/**
	 * 跳转到下一个月
	 */
	function handleNextMonth(): void {
		let newMonth = state.month + 1;
		let newYear = state.year;

		if (newMonth > 12) {
			newMonth = 1;
			newYear += 1;
		}

		const newState = {
			...state,
			month: newMonth,
			year: newYear,
		};

		CalendarUtils.render(newState);

		setState(newState);
	}

	/**
	 *  鼠标滚动
	 */
	useEventListener(
		"wheel",
		(event: WheelEvent) => {
			if (event.deltaY < 0) {
				handlePreviousMonth();
			} else {
				handleNextMonth();
			}
		},
		{ target: elementRef },
	);
	return (
		<div className="h-full w-2/3 flex flex-col p-5">
			{/* 日期选择和按钮行 */}
			<div className="h-10 flex items-center">
				<DatePicker
					value={monthPicker}
					format={"YYYY/MM"}
					picker="month"
					onChange={handleMonthPickerChange}
				/>

				<Button
					className="ml-3"
					icon={<SvgIcon icon="blog-leftArrow" />}
					onClick={handlePreviousMonth}
				/>

				<Button
					className="ml-3"
					icon={<SvgIcon icon="blog-rightArrow" />}
					onClick={handleNextMonth}
				/>

				{state.isShowBackToday && (
					<Button
						className="ml-3"
						icon={<SvgIcon icon="blog-position" />}
						onClick={handleToday}
					/>
				)}
			</div>

			{/* 日历的星期数组 */}
			<div className="ml-10 flex items-center justify-around">
				{state.monthData.weekTitleArray.map((weekTitle) => (
					<div
						key={weekTitle}
						className={`mx-1 text-center text-2xl ${weekTitle === "六" || weekTitle === "日" ? "text-red" : ""}`}
					>
						{weekTitle}
					</div>
				))}
			</div>

			{/* 背景 */}
			<div ref={elementRef} className="relative flex flex-col flex-1">
				<div className="absolute left-0 top-0 h-full w-full flex items-center justify-center text-[320px] text-[#999] opacity-10">
					{state.month}
				</div>

				{state.monthData.weeks.map((week) => (
					<div
						key={week.weekIndex}
						className="my-1 h-full w-full flex items-center justify-around"
					>
						<div
							className={`w-16 flex items-center justify-start text-xl ${week.isTodayWeek ? "text-primary" : ""}`}
						>
							<span className="font-bold">{week.weekIndex}</span>

							<span>周</span>
						</div>

						{week.dayArray.map((day, dayIndex) => (
							<div
								key={day.day}
								onClick={() => handleSelectDay(day)}
								className={`relative mx-1 h-full flex flex-col flex-1 cursor-pointer items-center justify-center border-4 rounded-2xl
                  ${day.isSelected ? "border-primary" : ""}
                  ${day.isRestDay || dayIndex >= 5 ? "bg-#FBDFDF" : ""}
                  ${day.isToday ? "!bg-primary" : ""}
                `}
							>
								{/* 日期 */}
								<div
									className={`text-2xl font-bold ${day.isToday ? "!text-[#fff]" : ""}`}
								>
									{day.day}
								</div>

								{/* 文字 */}
								<div
									className={`text-center text-4 font-bold leading-4 ${day.isFestival ? "text-[#A38CF3]" : ""}`}
								>
									{day.desc}
								</div>

								{/* 标记 */}
								{day.isHoliday && (
									<div
										className={`absolute right-1 top-1 h-4 w-4 flex items-center justify-center rounded-xl text-xs text-[#fff]
                      ${day.isRestDay ? "bg-red" : "bg-[#333]"}
                    `}
									>
										{day.isRestDay ? "休" : "班"}
									</div>
								)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default Calendar;
