import { useGSAP } from "@gsap/react";

import gsap from "gsap";

import { useState } from "react";

import { myProjects } from "./data.ts";

import Computer from "@/canvas/computer";

import SvgIcon from "@/components/icon/svg-icon";

const projectCount = myProjects.length;

/**
 * Projects 组件展示了项目的轮播效果，并允许用户浏览和切换项目。
 * @returns  渲染的项目展示页面
 */
function Projects() {
	// 当前选择的项目索引
	const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

	/**
	 * 处理项目切换的逻辑，支持前进和后退
	 * @param {("previous" | "next")} direction 导航方向，"previous"表示前一个项目，"next"表示下一个项目
	 */
	const handleNavigation = (direction: "previous" | "next") => {
		setSelectedProjectIndex((prevIndex) => {
			// 处理循环切换
			if (direction === "previous") {
				return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
			}
			return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
		});
	};

	// 使用GSAP进行动画效果，控制文本的渐显
	useGSAP(() => {
		gsap.fromTo(
			".animatedText",
			{ opacity: 0 },
			{ opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" },
		);
	}, [selectedProjectIndex]);

	// 当前选中的项目
	const currentProject = myProjects[selectedProjectIndex];

	return (
		<section className="sm:px-10 px-5 my-20 ">
			<div className="w-full text-[#afb0b6]">
				<p className="sm:text-4xl text-3xl font-semibold text-gray_gradient">
					我的精选作品
				</p>
				<div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
					<div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-[#0e0e10]">
						{/* 项目展示图 */}
						<div className="absolute top-0 right-0">
							<img
								src={currentProject.spotlight}
								alt="spotlight"
								className="w-full h-96 object-cover rounded-xl"
							/>
						</div>

						{/* 项目 logo */}
						<div
							className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
							style={currentProject.logoStyle}
						>
							<img
								className="w-10 h-10 shadow-sm"
								src={currentProject.logo}
								alt="logo"
							/>
						</div>

						{/* 项目描述 */}
						<div className="flex flex-col gap-5 text-[#afb0b6] my-5">
							<p className="text-white text-2xl font-semibold animatedText">
								{currentProject.title}
							</p>

							<p className="animatedText">{currentProject.desc}</p>
							<p className="animatedText">{currentProject.subdesc}</p>
						</div>

						{/* 项目标签和链接 */}
						<div className="flex items-center justify-between flex-wrap gap-5">
							<div className="flex items-center gap-3">
								{currentProject.tags.map((tag) => (
									<button
										key={tag.name}
										className="p-2 bg-[#f5f5f5] bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg hover:bg-opacity-20 active:scale-95 transition-all"
										type="button"
										onClick={() => {
											window.open(tag.url, "_blank");
										}}
									>
										<SvgIcon icon={tag.icon} size={30} />
									</button>
								))}
							</div>

							<button
								className=" p-3 bg-[#f5f5f5] bg-opacity-10 cursor-pointer active:scale-95 transition-all rounded-lg hover:bg-opacity-20 flex items-center gap-2"
								type="button"
								onClick={() => {
									window.open(currentProject.href, "_blank");
								}}
							>
								<span>查看实时网站</span>
								<SvgIcon icon="arrow-top-right" size={22} color="#FEA67E" />
							</button>
						</div>

						{/* 导航按钮 */}
						<div className="flex justify-between items-center mt-7">
							<button
								className=" p-3 bg-[#f5f5f5] bg-opacity-10 cursor-pointer active:scale-95 transition-all rounded-full hover:bg-opacity-20"
								onClick={() => handleNavigation("next")}
								type="button"
							>
								<SvgIcon icon="arrow-left" size={30} />
							</button>

							<button
								className=" p-3 bg-[#f5f5f5] bg-opacity-10 cursor-pointer active:scale-95 transition-all rounded-full hover:bg-opacity-20"
								onClick={() => handleNavigation("previous")}
								type="button"
							>
								<SvgIcon icon="arrow-right" size={30} />
							</button>
						</div>
					</div>

					{/* 3D Canvas 部分，展示项目的 3D 电脑模型 */}
					<div className="border border-[#1c1c21] bg-[#0e0e10] rounded-lg h-96 md:h-full">
						<Computer texture={currentProject.texture} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default Projects;
