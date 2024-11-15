import type { TimeType } from '@/hooks/use-get-time';
import Digit from './digit';

import Separator from './separator';
import type { DigitNum } from './digit'

type TimeDisplayProps = {
  time: TimeType;
  is24Hour?: boolean;
};

/**
 * 格式化时间为两位数的每一位
 * @param {number} number - 要格式化的数字
 * @param {boolean} bool - 是否为十位数
 * @returns {DigitNum} 返回格式化后的数字
 */
const mathNum = (number: number = 0, bool: boolean = true): DigitNum => {
  return bool
    ? (Math.floor(number / 10) as DigitNum)
    : ((number % 10) as DigitNum);
};

function TimeTwo({
  time,
  is24Hour = true,
}: TimeDisplayProps) {

  const className = 'text-white bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]'

  console.log("%c Line:32 🍑 time", "color:#7f2b82", time);
  const hour = is24Hour ? time.hour24 : time.hour12;
  console.log("%c Line:33 🍧 hour", "color:#ffdd4d", hour);


  return (
    <div
      className={`max-w-full flex flex-col items-center justify-center h-full w-full ${className}`}
    >
      <div className="max-w-full flex items-center justify-center gap-1 px-2 md:gap-2 md:px-0">
        {/* 小时十位 */}
        <Digit number={mathNum(hour)} />
        {/* 小时个位 */}
        <Digit number={mathNum(hour, false)} />
        {/* 分隔符 */}
        <Separator number={time.second || 0} />
        {/* 分钟十位 */}
        <Digit number={mathNum(time.minute)} />
        {/* 分钟个位 */}
        <Digit number={mathNum(time.minute, false)} />
        {/* 分隔符 */}
        <Separator number={time.second || 0} />
        {/* 秒钟十位 */}
        <Digit number={mathNum(time.second)} />
        {/* 秒钟个位 */}
        <Digit number={mathNum(time.second, false)} />
      </div>
    </div>
  );
}

export default TimeTwo;
