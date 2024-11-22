import Intro from "./components/intro";

import ComputersCanvas from "./components/computersCanvas";

// import BrokenBg from "./components/brokenBg";

// import StarsCanvas from "./components/starsCanvas";

import SunCanvas from "./components/sunCanvas";

import Tech from "./components/tech";

import { isMobile } from "@/utils";
console.log("%c Line:14 🍌 isMobile", "color:#ffdd4d", isMobile);
function About() {
	return (
		<div className="h-full w-full z-0 relative">
			{/* 第一页 */}
			<div className="h-[100vh] w-full relative z-[1]">
				{/* <div className="w-[500px] h-[500px]  absolute right-0 top-24">
				<SunCanvas />
					</div> */}

				{/* 太阳 */}

				{!isMobile && (
					<div className="absolute right-0 top-20 w-[20vw] aspect-square">
						<SunCanvas />
					</div>
				)}

				{/* 个人介绍 */}
				<Intro />

				{/* 电脑画面 */}
				<ComputersCanvas />

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
			</div>
		</div>
	);
}
export default About;
