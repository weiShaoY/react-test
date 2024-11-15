import Card from '@/components/card';


import { useMemo } from 'react';

import './right.less'

import { useGetTime } from '@/hooks';

function Right() {

  const time = useGetTime();

  // 计算指针样式
  const hourHandStyle = useMemo(() => {
    const degrees = (time.hour24 % 12) * 30 + time.minute * 0.5;
    return { transform: `rotate(${degrees}deg)` };
  }, [time.hour24, time.minute]);

  const minuteHandStyle = useMemo(() => {
    const degrees = time.minute * 6 + time.second * 0.1;
    return { transform: `rotate(${degrees}deg)` };
  }, [time.minute, time.second]);

  const secondHandStyle = useMemo(() => {
    const degrees = time.second * 6;
    return { transform: `rotate(${degrees}deg)` };
  }, [time.second]);



  return (
    <Card>

      <div className="relative aspect-square  w-full flex items-center justify-center bg-[#1e1f26] rounded-xl">
        <div className="clock relative">
          {/* 渲染表盘数字 */}
          {Array.from({ length: 12 }).map((_, num) => (
            <div
              key={num + 1}
              className="absolute h-[90%] text-6 text-[#fff] font-bold"
              style={{ transform: `rotate(${(num + 1) * 30}deg)` }}
            >
              <div style={{ transform: `rotate(${(num + 1) * -30}deg)` }}>
                {num + 1}
              </div>
            </div>
          ))}

          {/* 时钟指针 */}
          <div
            style={hourHandStyle}
            className="absolute left-1/2 top-[30%] z-0 h-[20%] w-[6px] origin-bottom rounded-full bg-[#fff] ml-[-3px]"
          />
          <div
            style={minuteHandStyle}
            className="absolute top-1/4 z-1 h-[25%] w-[3px] origin-bottom rounded-full bg-[#FFF]"
          />
          <div
            style={secondHandStyle}
            className="absolute left-1/2 top-[16.67%] h-[33%] w-[2px] origin-bottom rounded-full bg-[#FF0000] ml-[-1px]"
          />
        </div>
      </div>

    </Card>
  );
}

export default Right;
