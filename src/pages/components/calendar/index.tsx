
import { useState } from 'react';

import Left from './left';
import Right from './right';
import CalendarUtils, { StateType } from './utils';

function Calendar() {
  const [state, setState] = useState<StateType>(CalendarUtils.init());

  CalendarUtils.render(state);

  return (
    <div
      className="h-full w-full flex items-center justify-center"
    >
      <Left state={state} setState={setState} />
      <Right state={state} setState={setState} />
    </div>

  );
}

export default Calendar;
