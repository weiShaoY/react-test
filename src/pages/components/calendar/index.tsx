
import { useState, useEffect } from 'react';

import Left from './left';
// import Right from './right';
import CalendarUtils, { StateType } from './utils';

function Calendar() {
  const [state, setState] = useState<StateType>(CalendarUtils.init());


  useEffect(() => {
    CalendarUtils.render(state);  // 重新渲染
    console.log("%c Line:13 🍖 state", "color:#4fff4B", state);
  }, [state]);  // 确保 `state` 作为依赖项

  return (
    <div
      className="h-full w-full flex items-center justify-center"
    >
      <Left state={state} setState={setState} />
      {/* <Right state={state} setState={setState} /> */}
    </div>

  );
}

export default Calendar;
