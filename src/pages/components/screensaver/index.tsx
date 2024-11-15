import { useEffect, useRef, useState } from 'react';
import ScreensaverItem from './item';
import Card from '@/components/card';


/**
 * 获取当前时间数组
 * @param now 当前时间
 * @returns 当前时间的数字数组
 */
function getTimeArr(now: Date) {
  const h = String(now.getHours())
    .padStart(2, '0')
    .split('')
    .map(Number);

  const m = String(now.getMinutes())
    .padStart(2, '0')
    .split('')
    .map(Number);

  const s = String(now.getSeconds())
    .padStart(2, '0')
    .split('')
    .map(Number);

  return [...h, ...m, ...s];
}

function Screensaver() {
  /**
   * 当前时间数组
   */
  const [timeArr, setTimeArr] = useState<number[]>(getTimeArr(new Date()));

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 启动定时器
   */
  function startTimer() {
    stopTimer();
    timerRef.current = setTimeout(() => {
      setTimeArr(getTimeArr(new Date()));
      startTimer();
    }, 1000);
  }

  /**
   * 停止定时器
   */
  function stopTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  // 相当于 Vue 的 onMounted 和 onBeforeUnmount
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return (

    <Card
      className='h-full w-full flex items-center justify-center !bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]'
    >

      <ScreensaverItem total={2} current={timeArr[0]} />
      <ScreensaverItem total={9} current={timeArr[1]} />

      <div className="h-12 flex flex-col justify-around px-2">
        <span className="h-2.5 w-2.5 rounded-full bg-black" />
        <span className="h-2.5 w-2.5 rounded-full bg-black" />
      </div>

      <ScreensaverItem total={5} current={timeArr[2]} />
      <ScreensaverItem total={9} current={timeArr[3]} />

      <div className="h-12 flex flex-col justify-around px-2">
        <span className="h-2.5 w-2.5 rounded-full bg-black" />
        <span className="h-2.5 w-2.5 rounded-full bg-black" />
      </div>

      <ScreensaverItem total={5} current={timeArr[4]} />
      <ScreensaverItem total={9} current={timeArr[5]} />
    </Card >
  );
};

export default Screensaver;
