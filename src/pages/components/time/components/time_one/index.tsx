import type { TimeType } from '@/hooks/use-get-time';

type TimeDisplayProps = {
  time: TimeType;
  is24Hour?: boolean;
};


function TimeOne({
  time,
  is24Hour = true,
}: TimeDisplayProps) {

  const className = 'text-white bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]'

  /**
   * 格式化时间为两位数
   * @param {number} num - 需要格式化的数字
   * @returns {string} 格式化后的字符串
   */
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <div
      className={`max-w-full flex flex-col items-center justify-center h-full w-full ${className}`}
    >
      {/* 时分秒 */}
      <div className="w-72 flex items-center text-7xl font-bold">
        <div>{is24Hour ? formatNumber(time.hour24) : formatNumber(time.hour12)}</div>
        <span>:</span>
        <div>{formatNumber(time.minute)}</div>
        <span>:</span>
        <div>{formatNumber(time.second)}</div>
      </div>

      <div className="flex items-center space-x-2">
        {/* 年月日 */}
        <div className="mr-2">
          <span>{time.year}</span>
          <span>年</span>
          <span>{time.month}</span>
          <span>月</span>
          <span>{time.day}</span>
          <span>日</span>
        </div>

        {/* 星期 */}
        <div className="mr-2">星期{time.week}</div>

        {/* 农历 */}
        <div>
          {time.lunarMonth}月{time.lunarDay}
        </div>
      </div>
    </div>
  );
}

export default TimeOne;
