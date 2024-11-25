import Contact from "./components/contact";
import Experience from "./components/experience";
import Project from "./components/project";
function Resume() {
	return (
		<div className="h-full w-full relative max-w-7xl mx-auto  bg-[#000000]">
			{/* 项目 */}
			<Project />
			{/* 工作经历 */}
			<Experience />

			<Contact />
			<div className="">1</div>
		</div>
	);
}
export default Resume;
