import {
	type PointerEventHandler,
	useCallback,
	useReducer,
	useRef,
} from "react";

import { useInteractStore } from "@/store/garage";
import { useNavigate } from "react-router";
import Game from "./game";
import Load from "./load";
import { type PageActionType, initialState, reducer } from "./reducer";

/**
 * UI层组件
 */
export default function Ui() {
	const navigate = useNavigate();

	const [state, dispatch] = useReducer(reducer, initialState);
	const container = useRef<HTMLDivElement>(null);

	const handleEmit = useCallback((type: PageActionType, payload?: any) => {
		console.log("%c Line:21 🍅 type", "color:#e41a6a", type);
		dispatch({ type, payload });
	}, []);

	const handlePointerUp: PointerEventHandler = () => {
		useInteractStore.setState({ touch: false });
	};

	/**
	 *  返回首页
	 */
	function handleGoHome() {
		console.log("%c Line:36 🍪 handleGoHome", "color:#7f2b82", handleGoHome);
		navigate("/");
	}

	return (
		<div
			id="panel"
			className="absolute w-screen h-screen top-0 left-0"
			ref={container}
			onPointerUp={handlePointerUp}
		>
			<button
				type="button"
				className="fixed p-2 bg-yellow right-3 top-3 z-99999"
				onClick={handleGoHome}
			>
				返回首页
			</button>

			{state.game && <Game />}
			{state.load && <Load emit={handleEmit} />}
		</div>
	);
}
