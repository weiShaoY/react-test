interface PageState {
	load: boolean;
	game: boolean;
}

type PageActionType =
	| "show-load"
	| "hide-load"
	| "show-game"
	| "hide-game"
	| "allow-audio"
	| "mute"
	| "unmute";

interface PageAction {
	type: PageActionType;
	payload?: unknown;
}

/**
 * 状态管理 reducer 函数
 * @param state - 当前页面状态
 * @param action - 包含操作类型及可能的负载
 * @returns 更新后的页面状态
 */
const reducer = (state: PageState, action: PageAction): PageState => {
	switch (action.type) {
		case "show-load":
			return { ...state, load: true };
		case "hide-load":
			return { ...state, load: false };
		case "show-game":
			return { ...state, game: true };
		case "hide-game":
			return { ...state, game: false };
		default:
			return state; // 对于未匹配类型，返回当前状态，确保状态管理的安全性。
	}
};

/**
 * 初始页面状态
 */
const initialState: PageState = {
	load: true,
	game: false,
};

export type { PageActionType, PageAction, PageState };
export { reducer, initialState };
