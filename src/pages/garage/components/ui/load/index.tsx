import { type FC, memo, useEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { IProps } from "../types";
import { LoadWrapper } from "./style";

import { useInteractStore, useLoadedStore } from "@/store/garage";

const Load: FC<IProps> = memo(({ emit }) => {
	const panelRef = useRef<HTMLDivElement>(null);

	const ready = useLoadedStore((state) => state.ready);

	const { contextSafe } = useGSAP();

	useEffect(() => {
		ready && close();
	}, [ready]);

	const close = contextSafe(() => {
		useInteractStore.setState({ demand: false });
		gsap.to(panelRef.current, {
			opacity: 0,
			duration: 0.35,
			delay: 1,
			ease: "none",
			onComplete: () => {
				useInteractStore.setState({ audioAllowed: true });
				emit("hide-load");
				emit("show-game");
			},
		});

		useInteractStore.setState({ begin: true });
	});
	return (
		<LoadWrapper ref={panelRef}>
			<div className="loading">
				<span />
				<span />
				<span />
				<span />
			</div>
			<div className="loadstr">
				<span>L</span>
				<span>O</span>
				<span>A</span>
				<span>D</span>
				<span>I</span>
				<span>N</span>
				<span>G</span>
			</div>
		</LoadWrapper>
	);
});

export default Load;
