import BallCanvas from "./ballCanvas";
import SectionWrapper from "./SectionWrapper";
import html from "@/assets/images/home/tech/html.png";
import javascript from "@/assets/images/home/tech/javascript.png";

const technologies = [
	{
		name: "HTML 5",
		icon: html,
	},
	{
		name: "javascript",
		icon: javascript,
	},
];

function Tech() {
	return (
		<div className="flex flex-row flex-wrap justify-center gap-10">
			{technologies.map((technologie, index) => {
				return (
					<div className="w-29 h-28 " key={technologie.name}>
						<BallCanvas icon={technologie.icon} />
					</div>
				);
			})}
		</div>
	);
}

export default SectionWrapper(Tech, "");
