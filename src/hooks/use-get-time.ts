import { useEffect, useState } from 'react';
import { Lunar, Solar, SolarWeek } from 'lunar-typescript';

/**
 * 当前时间对象的类型
 */
export type TimeType = {
  year: number;
  month: number;
  day: number;
  hour12: number;
  hour12Formatted: string;
  hour24: number;
  hour24Formatted: string;
  minute: number;
  minuteFormatted: string;
  second: number;
  secondFormatted: string;
  currentWeekInYear: number;
  week: string;
  lunarDay: string;
  lunarMonth: string;
  lunarYear: string;
  lunarHour: string;
};

/**
 * @description 补零格式化函数
 */
function formatWithLeadingZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

/**
 * @description 获取当前时间对象
 * @param time 当前时间对象
 */
function getTime(time: TimeType) {
  const now = new Date();

  const solar = Solar.fromDate(now);
  const lunar = Lunar.fromDate(now);

  time.year = solar.getYear();
  time.month = solar.getMonth();
  time.day = solar.getDay();

  time.hour24 = solar.getHour();
  time.hour12 = time.hour24 % 12 || 12; // 12 小时制

  time.minute = solar.getMinute();
  time.second = solar.getSecond();

  // 格式化字符串
  time.hour24Formatted = formatWithLeadingZero(time.hour24);
  time.hour12Formatted = formatWithLeadingZero(time.hour12);
  time.minuteFormatted = formatWithLeadingZero(time.minute);
  time.secondFormatted = formatWithLeadingZero(time.second);

  time.currentWeekInYear = SolarWeek.fromDate(now, 1).getIndexInYear();
  time.week = solar.getWeekInChinese();
  time.lunarDay = lunar.getDayInChinese();
  time.lunarMonth = lunar.getMonthInChinese();
  time.lunarYear = lunar.getYearInChinese();
  time.lunarHour = lunar.getTimeZhi(); // 地支
}

/**
 * @description 获取本地时间的 React Hook
 */
export default function useGetTime() {
  /**
   * 当前时间对象的初始值
   */
  const initialTime: TimeType = {
    year: 0,
    month: 0,
    day: 0,
    hour12: 0,
    hour12Formatted: '',
    hour24: 0,
    hour24Formatted: '',
    minute: 0,
    minuteFormatted: '',
    second: 0,
    secondFormatted: '',
    currentWeekInYear: 0,
    week: '',
    lunarDay: '',
    lunarMonth: '',
    lunarYear: '',
    lunarHour: '',
  };

  const [time, setTime] = useState<TimeType>(initialTime);

  /**
   * @description 更新时间
   */
  const updateTime = () => {
    const updatedTime = { ...time };
    getTime(updatedTime);
    setTime(updatedTime);
  };

  useEffect(() => {
    // 启动定时器
    const intervalId = setInterval(updateTime, 1000);

    // 清除定时器
    return () => clearInterval(intervalId);
  }, []);

  return time;
}
