import cssSvg from "@/assets/icons/common/tech/css.svg";

import gitSvg from "@/assets/icons/common/tech/git.svg";

import htmlSvg from "@/assets/icons/common/tech/html.svg";

import javaScriptSvg from "@/assets/icons/common/tech/javaScript.svg";

import nodeSvg from "@/assets/icons/common/tech/node.svg";

import piniaSvg from "@/assets/icons/common/tech/pinia.svg";

import reactSvg from "@/assets/icons/common/tech/react.svg";

import tailwindCssSvg from "@/assets/icons/common/tech/tailwindCss.svg";

import threeJsSvg from "@/assets/icons/common/tech/threeJs.svg";

import typeScriptSvg from "@/assets/icons/common/tech/typeScript.svg";

import unocssSvg from "@/assets/icons/common/tech/unocss.svg";

import vueSvg from "@/assets/icons/common/tech/vue.svg";

/**
 *  定义每个技术栈对象的类型
 */
export type TechStackItemType = {
	/**
	 *  技术名称
	 */
	name: string; //

	/**
	 *  图标路径
	 *  @description 用于 Svg
	 */
	icon: string;
	/**
	 *  图片路径
	 *  @description 用于 image 标签的 src 属性
	 */
	image: string;
	/**
	 *  文档链接
	 */
	url: string; //
};

/**
 *  定义 技术栈 对象的类型，包含多个技术栈项s
 */
type TechStackType = {
	// 使用索引签名，允许任意键（如 html、css、node等），值为 TechItem 类型
	// [key: string]: TechStackItemType;
	html: TechStackItemType;
	css: TechStackItemType;
	javaScript: TechStackItemType;
	typeScript: TechStackItemType;
	node: TechStackItemType;
	react: TechStackItemType;
	vue: TechStackItemType;
	tailwindCss: TechStackItemType;
	unocss: TechStackItemType;
	threeJs: TechStackItemType;
	git: TechStackItemType;
	pinia: TechStackItemType;
};

export const techStack: TechStackType = {
	html: {
		name: "html",
		icon: "common-tech-html",
		image: htmlSvg,
		url: "https://developer.mozilla.org/zh-CN/docs/Web/HTML",
	},
	css: {
		name: "css",
		icon: "common-tech-css",
		image: cssSvg,
		url: "https://developer.mozilla.org/zh-CN/docs/Web/CSS",
	},
	javaScript: {
		name: "javaScript",
		icon: "common-tech-javaScript",
		image: javaScriptSvg,
		url: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
	},
	typeScript: {
		name: "typeScript",
		icon: "common-tech-typeScript",
		image: typeScriptSvg,
		url: "https://www.typescriptlang.org/zh/",
	},
	node: {
		name: "node",
		icon: "common-tech-node",
		image: nodeSvg,
		url: "https://nodejs.org/en/",
	},
	react: {
		name: "react",
		icon: "common-tech-react",
		image: reactSvg,
		url: "https://zh-hans.react.dev/",
	},
	vue: {
		name: "vue",
		icon: "common-tech-vue",
		image: vueSvg,
		url: "https://cn.vuejs.org/",
	},
	tailwindCss: {
		name: "tailwindCSS",
		icon: "common-tech-tailwindCss",
		image: tailwindCssSvg,
		url: "https://tailwindcss.com/docs/installation",
	},
	unocss: {
		name: "unocss",
		icon: "common-tech-unocss",
		image: unocssSvg,
		url: "https://unocss-cn.pages.dev/",
	},
	threeJs: {
		name: "threeJs",
		icon: "common-tech-threeJs",
		image: threeJsSvg,
		url: "https://threejs.org/",
	},
	git: {
		name: "git",
		icon: "common-tech-git",
		image: gitSvg,
		url: "https://git-scm.com/",
	},
	pinia: {
		name: "pinia",
		icon: "common-tech-pinia",
		image: piniaSvg,
		url: "https://pinia.vuejs.org/zh/",
	},
};

export default techStack;
