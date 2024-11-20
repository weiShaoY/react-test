import ComputersCanvas from "./components/computers";
import Title from "./components/title";
import BrokenBg from "./components/BrokenBg";

import StarsCanvas from "./components/StarsCanvas";
function About() {
	return (
		<div className="h-full w-full z-0">
			<div className="h-[100vh] w-full relative z-[1]">
				<Title />
				<ComputersCanvas />
				<BrokenBg />
			</div>

			<div className="h-[100vh]  z-[1] relative">
				<StarsCanvas />
			</div>
		</div>
	);
}
export default About;
