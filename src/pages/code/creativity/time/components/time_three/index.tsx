import type { TimeType } from "@/hooks/use-get-time";

type PropsType = {
	time: TimeType;
	color?: string;
	is24Hour?: boolean;
};

/**
 *  格式化日期函数
 */
function renderDate(date = new Date()) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const year = date.getFullYear();
	const month = months[date.getMonth()];
	const day = date.getDate();
	return `${month} ${day}, ${year}`; // 格式为 "Month Day, Year"
}

function TimeThree({ time, is24Hour = true, color = "#04A770" }: PropsType) {
	const hour = is24Hour ? time.hour24 : time.hour12;

	return (
		<div
			className="max-w-full flex flex-col items-center justify-center"
			style={{
				color: color,
				borderColor: color,
			}}
		>
			<div>
				{/* 显示当前日期 */}
				<div className="text-3xl font-semibold tabular-nums">
					{renderDate()}
				</div>

				{/* 显示当前时间 */}
				<div className="text-5xl font-bold tabular-nums">
					{hour < 10 ? `0${hour}` : hour}
					<span>:</span>
					{time.minute < 10 ? `0${time.minute}` : time.minute}
					<span>:</span>
					{time.second < 10 ? `0${time.second}` : time.second}

					{/* 显示AM/PM，仅当为12小时制时 */}
					<span>{is24Hour ? "" : time.hour12 >= 12 ? "PM" : "AM"}</span>
				</div>
			</div>
		</div>
	);
}

export default TimeThree;
