import { useState } from "react";

import Earth from "@/canvas/earth";

import Button from "./button";

import copyImg from "./images/copy.svg";
import gridImage3 from "./images/grid3.png";
import gridImage4 from "./images/grid4.png";
import tickImg from "./images/tick.svg";

import Tech from "@/canvas/tech";

const About = () => {
	const [hasCopied, setHasCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(" adrian@jsmastery.pro");
		setHasCopied(true);

		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	};

	return (
		<section className="sm:px-10 px-5 my-20 " id="info">
			<div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
				<div className="xl:col-span-2 xl:row-span-3">
					<div className="w-full h-full border border-[#1c1c21] bg-[#0E0E10] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
						<div className="w-full sm:h-[266px] h-fit cursor-pointer">
							<Tech />
						</div>
						<div>
							<p className="text-xl font-semibold mb-2 text-white">技术栈</p>
							<p className="text-[#afb0b6] text-base">
								我擅长各种语言、框架和工具，它们让我能够构建强大且可扩展的应用程序
							</p>
						</div>
					</div>
				</div>

				<div className="col-span-1 xl:row-span-4">
					<div className="w-full h-full border border-[#1c1c21] bg-[#0E0E10] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
						<div className="rounded-3xl w-full  sm:h-[326px] h-fit  flex justify-center items-center">
							<Earth height={326} />
						</div>
						<div>
							<p className="text-xl font-semibold mb-2 text-white">
								我对时区、通讯和位置非常灵活
							</p>
							<p className="text-[#afb0b6] text-base">
								我居住在湖南长沙，愿意进行远程工作。
							</p>
							<Button name="联系我" isBeam containerClass="w-full mt-10" />
						</div>
					</div>
				</div>

				<div className="xl:col-span-2 xl:row-span-3">
					<div className="w-full h-full border border-[#1c1c21] bg-[#0E0E10] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
						<img
							src={gridImage3}
							alt="grid-3"
							className="w-full sm:h-[266px] h-fit object-contain"
						/>

						<div>
							<p className="text-xl font-semibold mb-2 text-white">
								我对编码的热情
							</p>
							<p className="text-[#afb0b6] text-base">
								我喜欢通过代码解决问题和构建事物。编程不仅仅是我的职业，更是我的激情所在。我喜欢探索新技术并提高自己的技能。
							</p>
						</div>
					</div>
				</div>

				<div className="xl:col-span-1 xl:row-span-2">
					<div className="w-full h-full border border-[#1c1c21] bg-[#0E0E10] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
						<img
							src={gridImage4}
							alt="grid-4"
							className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
						/>

						<div className="space-y-2">
							<p className="text-[#afb0b6] text-base  text-center">联系我</p>
							<div
								className="cursor-pointer flex justify-center items-center gap-2 h-10"
								onClick={handleCopy}
							>
								<img
									src={hasCopied ? tickImg : copyImg}
									alt="copy"
									className="h-8 w-8"
								/>
								<p className="lg:text-2xl md:text-xl  font-medium bg-gradient-to-r from-[#BEC1CF] from-60% via-[#D5D8EA] via-60% to-[#D5D8EA] to-100% bg-clip-text  text-white">
									1604705673@qq.com
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
