import { Divider } from "antd";
import type React from "react";

import type { StateType } from "./utils";

type LeftProps = {
	state: StateType;
	setState: React.Dispatch<React.SetStateAction<StateType>>;
};

function Right({ state }: LeftProps) {
	const { selectedDay } = state;

	return (
		<div className="h-full flex-1 rounded-xl bg-[#F5F5F5] p-5 text-center flex flex-col">
			<div className="">
				<div className="mx-auto h-20 w-20 flex items-center justify-center rounded-xl bg-primary text-3xl text-white">
					{selectedDay.day}
				</div>
				<div>
					<span>{selectedDay.ymd}</span>
					<span> 周{selectedDay.dayOfWeek}</span>
				</div>
				<div>
					<span>{selectedDay.lunarMonth}月</span>
					<span>{selectedDay.lunarDay}</span>
				</div>
				{/* 生肖 */}
				<div>
					<span>{selectedDay.yearGanZhi}年</span>
					<span>{selectedDay.shengXiao}</span>
				</div>
				<div>
					<span>{selectedDay.monthGanZhi}月</span>
					<span>{selectedDay.dayGanZhi}日</span>
				</div>
				<div>
					<span>本年第{selectedDay.weekOfYear}周</span>
					<span className="ml-3">第{selectedDay.dayOfYear}天</span>
				</div>
				{!selectedDay.isToday && (
					<>
						<Divider />
						<div className="flex">
							距离
							{selectedDay.festivalArray[0]
								? selectedDay.festivalArray[0]
								: `${selectedDay.year}年${selectedDay.month}月${selectedDay.day}日`}
							<span>{selectedDay.dayFromToday > 0 ? "还有" : "已经过去"}</span>
							<span>{Math.abs(selectedDay.dayFromToday)}</span>天
						</div>
					</>
				)}
				<Divider />
			</div>

			<div className="flex-1 overflow-y-auto">
				{/* 生肖 */}
				<div className="flex items-center">
					<div className="mr-3 min-w-10 rounded-lg text-lg bg-red text-white p-2">
						生肖
					</div>
					<div>{selectedDay.shengXiao}</div>
				</div>
				<Divider />
				{/* 星座 */}
				<div className="flex items-center ">
					<div className="mr-3 min-w-10 rounded-lg text-lg bg-[#EB7DAC] text-white p-2">
						星座
					</div>
					<div>{selectedDay.xingZuo}座</div>
				</div>
				{/* 节日 */}
				{selectedDay.festivalArray.length > 0 && (
					<>
						<Divider />
						<div className="flex items-center">
							<div className="mr-3 min-w-10 rounded-s bg-primary text-white p-2">
								节日
							</div>
							<div className="flex items-center">
								{selectedDay.festivalArray.map((festival) => (
									<span key={festival} className="mr-1">
										{festival}
									</span>
								))}
							</div>
						</div>
					</>
				)}
				<Divider />
				<div className="flex items-center">
					<div className="mr-3 w-10 rounded-lg text-lg bg-green text-white p-2 ">
						宜
					</div>
					<div className="grid grid-cols-5 max-h-40 w-full overflow-y-auto text-left">
						{selectedDay.yiArray.map((item) => (
							<span key={item}>{item}</span>
						))}
					</div>
				</div>
				<Divider />

				{/* 忌 */}
				<div className="flex items-center">
					<div className="mr-3  rounded-lg text-lg bg-red text-white p-2">
						忌
					</div>
					<div className="grid grid-cols-5 w-full text-left">
						{selectedDay.jiArray.map((item) => (
							<span key={item}>{item}</span>
						))}
					</div>
				</div>

				<Divider />

				{/* 月相、物候、福神、财神 */}
				<div className="grid grid-cols-2 w-full gap-3">
					<div className="mr-10 flex items-center">
						<div className="bg-gray mr-3   rounded-lg text-lg text-white   p-2">
							月相
						</div>
						<div>{selectedDay.yueXiang}</div>
					</div>

					<div className="flex items-center">
						<div className="bg-gray mr-3  rounded-lg text-lg text-white p-2">
							物候
						</div>
						<div>{selectedDay.wuHou}</div>
					</div>

					<div className="mr-10 flex items-center">
						<div className="bg-gray mr-3  rounded-lg text-lg text-white p-2">
							福神
						</div>
						<div>{selectedDay.fuShen}</div>
					</div>

					<div className="mr-10 flex items-center">
						<div className="bg-gray mr-3  rounded-lg text-lg text-white p-2">
							财神
						</div>
						<div>{selectedDay.caiShen}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Right;
