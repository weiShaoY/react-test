import Experience from "./components/experience";
import Projects from "./components/projects";
function Resume() {
	return (
		<div className="h-full w-full bg-red relative max-w-7xl mx-auto ">
			<Projects />
			<Experience />
			<div className="">1</div>
		</div>
	);
}
export default Resume;
