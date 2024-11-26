import Intro from "./components/intro";

import Desktop from "@/canvas/desktop";

// import BrokenBg from "@/canvas/brokenBg";

// import Stars from "@/canvas/stars";

import Sun from "@/canvas/sun";

import Tech from "@/canvas/tech";

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

			<div className=" h-1">1</div>

			{/* 第二页 */}
			<div className="min-h-screen max-w-7xl mx-auto relative">
				<Info />
			</div>

			<div className=" h-1">1</div>

			{/* 第三页 */}
			<div className="min-h-screen flex justify-center items-center flex-col relative">
				<div className="w-full h-full relative">
					{/* 星空 */}
					<div className="w-full h-auto absolute inset-0 z-[-1]">
						{/* <Stars /> */}
					</div>

					{/* 技术栈 */}
					<div className="container bg-[#3F4146]">{/* <Tech /> */}</div>
				</div>

				{/* <div className="w-full h-[500px] "><ParticlesCanvas /></div> */}
			</div>
		</div>
	);
}
export default About;
