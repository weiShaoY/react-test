import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useInteractStore } from "@/store/garage";
import { Perf } from "r3f-perf";
import { Leva } from "leva";
import Sketch from "./sketch";
import { CineonToneMapping } from "three";

export default function Container() {
	const demand = useInteractStore((state) => state.demand);
	return (
		<div className="h-screen w-screen relative">
			<Leva hidden={location.hash !== "#debug"} collapsed />
			<Canvas
				frameloop={demand ? "never" : "always"}
				className="webgl"
				dpr={[1, 2]}
				camera={{
					fov: 45,
					near: 0.1,
					position: [0, 2, 5],
					far: 500,
				}}
				gl={{ toneMapping: CineonToneMapping }}
			>
				{location.hash.includes("debug") && <Perf position="top-left" />}
				<Suspense fallback={null}>
					<Sketch />
				</Suspense>
			</Canvas>
		</div>
	);
}
