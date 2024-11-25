import Intro from "./components/intro";

import Desktop from "./components/desktop";

// import BrokenBg from "./components/brokenBg";

// import StarsCanvas from "./components/starsCanvas";

import Sun from "./components/sun";

import Tech from "./components/tech";

// import ParticlesCanvas from "./components/particlesCanvas";

import { isMobile } from "@/utils";
console.log("%c Line:14 🍌 isMobile", "color:#ffdd4d", isMobile);
function About() {
	return (
		<div className="h-full w-full z-0 relative">
			{/* 第一页 */}
			<div className="h-[100vh] w-full relative z-[1]">
				{/* 太阳 */}
				<div className="absolute right-0 top-20 w-[20vw] aspect-square sm:flex hidden">
					<Sun />
				</div>

				{/* 个人介绍 */}
				<Intro />

				{/* 桌面模型 */}
				<Desktop />

				{/* 背景 */}
				{/* <BrokenBg /> */}
			</div>

			{/* 第二页 */}
			<div className="h-[100vh]  z-[1] relative flex justify-center  items-center flex-col">
				{/* 星空 */}
				{/* <StarsCanvas /> */}

				<div className="container bg-[#3F4146]">
					{/* 技术栈 */}
					<Tech />
				</div>

				<div className="w-full h-[500px] ">{/* <ParticlesCanvas /> */}</div>
			</div>
		</div>
	);
}
export default About;
