import ComputersCanvas from "./components/computers";
import Title from "./components/title";
import BrokenBg from "./components/BrokenBg";

function About() {
	return (
		<div className="h-full w-full">
			<div className="h-[100vh] w-full relative z-[1]">
				<Title />
				<ComputersCanvas />
				<BrokenBg />
			</div>

			<div className="h-[100vh] bg-red">222222222</div>
		</div>
	);
}
export default About;
