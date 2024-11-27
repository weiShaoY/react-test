import { create } from "zustand";
/**
 * 用户交互状态
 */
const useInteractStore = create(() => ({
	touch: false,
	auto: false,
	demand: true,
	isMute: false,
	audioAllowed: false,
	browserHidden: false,
	begin: false,
	//控制器的dom
	controlDom: document.createElement("div"),
	end: false,
}));

const useGameStore = create(() => ({
	time: 0,
	transfer: false,
	bodyColor: "#26d6e9",
}));

const useLoadedStore = create(() => ({
	ready: false,
}));

export { useInteractStore, useGameStore, useLoadedStore };
