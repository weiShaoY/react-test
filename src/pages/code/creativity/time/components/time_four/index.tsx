import type { TimeType } from "@/hooks/use-get-time";

import Digit from "./digit";

import Separator from "./separator";

import type { DigitNumType } from "./digit";

type PropsType = {
	time: TimeType;
	is24Hour?: boolean;
	color?: string;
};

/**
 * 格式化时间为两位数的每一位
 * @param  number - 要格式化的数字
 * @param  bool - 是否为十位数
 * @returns {DigitNumType} 返回格式化后的数字
 */
function mathNum(number = 0, bool = true): DigitNumType {
	return bool
		? (Math.floor(number / 10) as unknown as DigitNumType)
		: ((number % 10) as unknown as DigitNumType);
}

function TimeFour({ time, is24Hour = true, color = "#04A770" }: PropsType) {
	const hour = is24Hour ? time.hour24 : time.hour12;

	return (
		<div
			className={
				"max-w-full flex items-center justify-center gap-1 px-2 md:gap-2 md:px-0 "
			}
		>
			{/* 小时十位 */}
			<Digit number={mathNum(hour)} color={color} />
			{/* 小时个位 */}
			<Digit number={mathNum(hour, false)} color={color} />
			{/* 分隔符 */}
			<Separator number={time.second || 0} color={color} />
			{/* 分钟十位 */}
			<Digit number={mathNum(time.minute)} color={color} />
			{/* 分钟个位 */}
			<Digit number={mathNum(time.minute, false)} color={color} />
			{/* 分隔符 */}
			<Separator number={time.second || 0} color={color} />
			{/* 秒钟十位 */}
			<Digit number={mathNum(time.second)} color={color} />
			{/* 秒钟个位 */}
			<Digit number={mathNum(time.second, false)} color={color} />
		</div>
	);
}

export default TimeFour;
