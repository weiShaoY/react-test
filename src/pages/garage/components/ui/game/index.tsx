import { useGameStore, useInteractStore } from "@/store/garage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { res } from "./res";
import { GameWrapper } from "./style";

const Game = () => {
	const controlRef = useRef<HTMLDivElement>(null);
	const gameRef = useRef<HTMLDivElement>(null);
	const aniDone = useRef(false);

	const [activeIndex, setActiveIndex] = useState(0);

	useGSAP(() => {
		gsap.set(gameRef.current, { opacity: 0 });
		gsap.to(gameRef.current, {
			opacity: 1,
			duration: 0.5,
			ease: "power2.in",
			onComplete: () => {
				aniDone.current = true;
			},
		});
	});

	useEffect(() => {
		useInteractStore.setState({ controlDom: controlRef.current! });
	}, []);

	const handlePointerEvent = (e: PointerEvent, flag: boolean) => {
		console.log(e.type, flag);
		useInteractStore.setState({ touch: flag });
	};

	return (
		<>
			<GameWrapper className="game" ref={gameRef}>
				<div
					className="control"
					ref={controlRef}
					onPointerDown={(e) => handlePointerEvent(e, true)}
					onPointerUp={(e) => handlePointerEvent(e, false)}
				/>
				<div className="container">
					{res.map((item, index) => (
						<div
							key={item.src}
							className={activeIndex === index ? "color-item" : ""}
							style={{
								backgroundImage: `url(${item.src})`,
								width: "32px",
								height: "32px",
								borderRadius: "50%",
								margin: "8px",
								backgroundSize: "100% 100%",
								cursor: "pointer",
							}}
							onClick={() => {
								if (!aniDone.current) return;
								setActiveIndex(index);
								useGameStore.setState({
									bodyColor: `${item.color}`,
								});
							}}
						/>
					))}
				</div>
			</GameWrapper>
		</>
	);
};

export default Game;
