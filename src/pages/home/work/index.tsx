import Experience from "./components/experience";
import Project from "./components/project";
function Resume() {
	return (
		<div className="h-full w-full relative max-w-7xl mx-auto pt-20">
			{/* 项目 */}
			<Project />
			{/* 工作经历 */}
			<Experience />

			<div className="h-20" />
		</div>
	);
}
export default Resume;
