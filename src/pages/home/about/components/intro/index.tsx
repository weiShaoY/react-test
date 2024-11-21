/**
 * 个人介绍 组件
 * @description  用于展示个人介绍的组件，包括标题、描述和装饰条。
 * @returns  包含左侧装饰条和右侧标题描述的布局。
 */
function Intro() {
	return (
		<div className="absolute inset-0 top-[120px] mx-auto max-w-7xl flex flex-row items-start gap-5 px-6 sm:px-16 ">
			{/* 左侧装饰条 */}
			<div className="flex flex-col justify-center items-center mt-5">
				<div className="w-5 h-5 rounded-full bg-[#915eff]" />
				<div className="w-1 h-40 sm:h-80  bg-gradient-to-b from-[#804dee] to-[rgba(60,51,80,0)]" />
			</div>

			{/* 右侧标题和描述 */}
			<div>
				<h1 className="font-black text-white select-none mt-2 lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px]">
					<span>Hi, I'm</span>
					<span className="ml-5 text-[#915eff]">weiShaoY</span>
				</h1>
				<p className="text-[#dfd9ff] font-medium select-none mt-2 lg:text-[30px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[40px]">
					一个热爱编程的前端开发
					<br className="sm:block hidden" />
					热爱计算机科学和IT互联网事业
					<br className="sm:block hidden" />
					热爱编程、软路由、硬件、Diy等
				</p>
			</div>
		</div>
	);
}

export default Intro;
