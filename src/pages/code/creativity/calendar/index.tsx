import { useState } from "react";

import Card from "@/components/card";
import Left from "./left";
import Right from "./right";
import CalendarUtils, { type StateType } from "./utils";

function Calendar() {
	const [state, setState] = useState<StateType>(CalendarUtils.init());

	CalendarUtils.render(state);

	return (
		<Card className="h-full w-full flex items-center justify-center">
			<Left state={state} setState={setState} />
			<Right state={state} setState={setState} />
		</Card>
	);
}

export default Calendar;
