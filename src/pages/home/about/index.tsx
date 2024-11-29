import Intro from "./components/intro";

import Desktop from "@/canvas/desktop";

// import BrokenBg from "@/canvas/brokenBg";

// import Stars from "@/canvas/stars";

import Sun from "@/canvas/sun";

// import ParticlesCanvas from "@/canvas/particlesCanvas";

import Info from "./components/info";

function About() {
	return (
		<div className="h-full w-full  relative ">
			{/* 第一页 */}
			<div className="min-h-screen w-full  relative">
				{/* 太阳 */}
				<div className="absolute right-0 top-20 w-[20vw] aspect-square sm:flex hidden">
					<Sun />
				</div>

				{/* 个人介绍 */}
				<Intro />

				{/* 桌面模型 */}
				<div className="absolute inset-0 z-1">
					<Desktop />
				</div>

				{/* 背景 */}
				{/* <BrokenBg /> */}
			</div>

			{/* 第二页 */}
			<div className="min-h-screen max-w-7xl mx-auto relative">
				<Info />
			</div>
		</div>
	);
}
export default About;
