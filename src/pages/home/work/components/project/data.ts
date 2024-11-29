import { techStack } from "@/utils";

import type { TechStackItemType } from "@/utils";

import logo1 from "@/assets/images/home-about-project-logo1.png";
import logo2 from "@/assets/images/home-about-project-logo2.png";
import logo3 from "@/assets/images/home-about-project-logo3.png";
import logo4 from "@/assets/images/home-about-project-logo4.png";
import logo5 from "@/assets/images/home-about-project-logo5.png";

import video1 from "@/assets/video/home-about-project-texture1.mp4";
import video2 from "@/assets/video/home-about-project-texture2.mp4";
import video3 from "@/assets/video/home-about-project-texture3.mp4";
import video4 from "@/assets/video/home-about-project-texture4.mp4";
import video5 from "@/assets/video/home-about-project-texture5.mp4";

import spotlight1 from "@/assets/images/home-about-project-spotlight1.png";
import spotlight2 from "@/assets/images/home-about-project-spotlight2.png";
import spotlight3 from "@/assets/images/home-about-project-spotlight3.png";
import spotlight4 from "@/assets/images/home-about-project-spotlight4.png";
import spotlight5 from "@/assets/images/home-about-project-spotlight5.png";

/**
 * 项目 Logo 样式类型
 */
type ProjectLogoStyle = {
	/**
	 *  项目 Logo 背景颜色
	 */
	backgroundColor: string;

	/**
	 *  项目 Logo 边框样式
	 */
	border: string;

	/**
	 *  项目 Logo 阴影样式
	 */
	boxShadow: string;
};

/**
 *  项目类型
 */
type Project = {
	/**
	 * 项目名称
	 */
	title: string;

	/**
	 *  项目描述
	 */
	desc: string;

	/**
	 *  项目副描述
	 */
	subdesc: string;

	/**
	 *  项目链接（如 YouTube）
	 */
	href: string;

	/**
	 * 项目纹理或视频文件路径
	 */
	texture: string;

	/**
	 * 项目的 Logo 图标路径
	 */
	logo: string;

	/**
	 *  项目的 Logo 样式
	 */
	logoStyle: ProjectLogoStyle;

	/**
	 *  项目的聚光图像路径
	 */
	spotlight: string;

	/**
	 *  项目相关的技术标签
	 */
	tags: TechStackItemType[];
};

export const myProjects: Project[] = [
	{
		title: "Podcastr-人工智能播客平台",
		desc: "Podcastr是一个革命性的软件即服务平台，它改变了播客的创建方式。凭借先进的人工智能功能，如文本到多个语音功能，它允许创作者从单个文本输入中生成不同的配音。",
		subdesc:
			"Podcastr是一款独特的软件即服务应用程序，采用Next.js 14、Tailwind CSS、TypeScript、Framer Motion和Converx构建，旨在实现最佳性能和可扩展性。",
		href: "https://www.youtube.com/watch?v=zfAb95tJvZQ",
		texture: video1,
		logo: logo1,
		logoStyle: {
			backgroundColor: "#2A1816",
			border: "0.2px solid #36201D",
			boxShadow: "0px 0px 60px 0px #AA3C304D",
		},
		spotlight: spotlight1,
		tags: [
			techStack.react,
			techStack.tailwindCss,
			techStack.typeScript,
			techStack.threeJs,
		],
	},
	{
		title: "LiveDoc-实时谷歌文档克隆",
		desc: "LiveDoc是一款功能强大的协作应用程序，可提高实时文档编辑的能力。作为Google Docs的增强版，它同时支持数百万名协作者，确保每一个更改都能被即时准确地捕获。",
		subdesc:
			"有了LiveDoc，用户可以通过使用Nextjs和Liveblocks的最新功能，体验协作的未来，多个贡献者实时协同工作，没有任何延迟。",
		href: "https://www.youtube.com/watch?v=y5vE8y_f_OM",
		texture: video2,
		logo: logo2,
		logoStyle: {
			backgroundColor: "#13202F",
			border: "0.2px solid #17293E",
			boxShadow: "0px 0px 60px 0px #2F6DB54D",
		},
		spotlight: spotlight2,
		tags: [
			techStack.vue,
			techStack.tailwindCss,
			techStack.typeScript,
			techStack.unocss,
		],
	},
	{
		title: "CarePulse-健康管理系统",
		desc: "一个创新的医疗保健平台，旨在简化基本医疗流程。它简化了患者注册、预约安排和病历管理，为医疗服务提供者和患者提供了无缝的体验。",
		subdesc:
			"CarePulse注重效率，通过使用Nextjs、Appwrite、Twillio和Sentry来整合复杂的表单和短信通知，从而增强了运营工作流程。",
		href: "https://www.youtube.com/watch?v=lEflo_sc82g",
		texture: video3,
		logo: logo3,
		logoStyle: {
			backgroundColor: "#60f5a1",
			// background:
			// 	"linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
			border: "0.2px solid rgba(208, 213, 221, 1)",
			boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
		},
		spotlight: spotlight3,
		tags: [
			techStack.react,
			techStack.tailwindCss,
			techStack.javaScript,
			techStack.threeJs,
		],
	},
	{
		title: "地平线-网上银行平台",
		desc: "Horizon是一个全面的网上银行平台，为用户提供集中的财务管理仪表板。它允许用户连接多个银行账户，监控实时交易，并无缝地向其他用户转账。",
		subdesc:
			"Horizon采用Next.js 14 Appwrite、Dwolla和Plaid构建，可确保流畅安全的银行体验，量身定制以满足现代消费者的需求。",
		href: "https://www.youtube.com/watch?v=PuOVqP_cjkE",
		texture: video4,
		logo: logo4,
		logoStyle: {
			backgroundColor: "#0E1F38",
			border: "0.2px solid #0E2D58",
			boxShadow: "0px 0px 60px 0px #2F67B64D",
		},
		spotlight: spotlight4,
		tags: [
			techStack.react,
			techStack.tailwindCss,
			techStack.typeScript,
			techStack.threeJs,
		],
	},
	{
		title: "Imaginify-人工智能照片处理应用程序",
		desc: "Imaginify是一款突破性的软件即服务应用程序，它使用户能够使用人工智能技术创建令人惊叹的照片操作。具有人工智能驱动的图像编辑、支付系统和基于信用的模型等功能。",
		subdesc:
			"Imaginify基于Next.js 14、Cloudinary AI、Clerk和Stripe构建，将尖端技术与以用户为中心的方法相结合。它可以转化为额外收入，甚至是一项成熟的业务。",
		href: "https://www.youtube.com/watch?v=Ahwoks_dawU",
		texture: video5,
		logo: logo5,
		logoStyle: {
			backgroundColor: "#1C1A43",
			border: "0.2px solid #252262",
			boxShadow: "0px 0px 60px 0px #635BFF4D",
		},
		spotlight: spotlight5,
		tags: [
			techStack.react,
			techStack.tailwindCss,
			techStack.typeScript,
			techStack.threeJs,
		],
	},
];
