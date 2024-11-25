import { useState } from "react";

import Developer from "@/canvas/developer";

import icon1 from "@/assets/icons/home-about-experience-icon1.svg";
import icon2 from "@/assets/icons/home-about-experience-icon2.svg";
import icon3 from "@/assets/icons/home-about-experience-icon3.svg";
const workExperiences = [
	{
		id: 1,
		name: "Framer",
		pos: "Lead Web Developer",
		duration: "2022 - Present",
		title:
			"Framer是我创建交互式原型的首选工具。我用它来实现设计，让利益相关者在开发之前体验用户流和交互。",
		icon: icon1,
		animation: "victory",
	},
	{
		id: 2,
		name: "Figma",
		pos: "Web Developer",
		duration: "2020 - 2022",
		title:
			"Figma是我首选的协同设计平台。我利用它与团队成员和客户无缝协作，促进实时反馈和设计迭代。它基于云。",
		icon: icon2,
		animation: "clapping",
	},
	{
		id: 3,
		name: "Notion",
		pos: "Junior Web Developer",
		duration: "2019 - 2020",
		title:
			"Notion帮助我保持项目的有序性。我使用它进行项目管理、任务跟踪，并将其作为文档的中心枢纽，确保从设计说明到。",
		icon: icon3,
		animation: "salute",
	},
];

/**
 *  工作经历
 */
function Experience() {
	const [animationName, setAnimationName] = useState("idle");

	return (
		<section className="sm:px-10 px-5 my-20 " id="work">
			<div className="w-full text-[#afb0b6]">
				<p className="sm:text-4xl text-3xl font-semibold text-gray_gradient">
					我的工作经历
				</p>

				<div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-12">
					<div className="col-span-1 rounded-lg bg-[#0e0e10] border border-[#1c1c21]">
						{/* 开发者模型 */}
						<Developer
							animationName={animationName}
							scale={3}
							position-y={-3}
						/>
					</div>

					<div className="col-span-2 rounded-lg bg-[#0e0e10] border border-[#1c1c21]">
						<div className="sm:py-10 py-5 sm:px-5 px-2.5">
							{workExperiences.map((item) => (
								<div
									key={item.id}
									onClick={() => setAnimationName(item.animation.toLowerCase())}
									onPointerOver={() =>
										setAnimationName(item.animation.toLowerCase())
									}
									onPointerOut={() => setAnimationName("idle")}
									className="grid grid-cols-[auto_1fr] items-start gap-5  transition-all ease-in-out duration-500 cursor-pointer hover:bg-[#1c1c21] rounded-lg sm:px-5 px-2.5"
								>
									<div className="flex flex-col h-full justify-start items-center py-2">
										<div className="rounded-3xl w-16 h-16 p-2 bg-[#1a1a1a]">
											<img className="w-full h-full" src={item.icon} alt="" />
										</div>

										<div className="flex-1 w-0.5 mt-4 h-full bg-[#1c1c21] group-hover:bg-[#3a3a49] group-last:hidden" />
									</div>

									<div className="sm:p-5 px-2.5 py-5">
										<p className="font-bold text-[#e4e4e6]">{item.name}</p>
										<p className="text-sm mb-5">
											{item.pos} -- <span>{item.duration}</span>
										</p>
										<p className="group-hover:text-white transition-all ease-in-out duration-500">
											{item.title}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Experience;
