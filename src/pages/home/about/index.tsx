import Intro from "./components/intro";

import ComputersCanvas from "./components/computersCanvas";

// import BrokenBg from "./components/brokenBg";

// import StarsCanvas from "./components/starsCanvas";

import SunCanvas from "./components/sunCanvas";

import Tech from "./components/tech";
function About() {
	return (
		<div className="h-full w-full z-0">
			<div className="h-[100vh] w-full relative z-[1]">
				{/* 个人介绍 */}
				<Intro />

				{/* 电脑画面 */}
				<ComputersCanvas />

				{/* 背景 */}
				{/* <BrokenBg /> */}
			</div>

			<div className="h-[100vh]  z-[1] relative flex justify-center flex-wrap">
				{/* 星空 */}
				{/* <StarsCanvas /> */}

				<div className="container bg-red">
					111111111
					<Tech />
				</div>

				<div className="w-[500px] h-[500px] mx-auto">
					{/* 太阳 */}
					<SunCanvas />
				</div>
			</div>
		</div>
	);
}
export default About;
