// 引入代码高亮的样式文件
import "highlight.js/styles/base16/tomorrow-night.css";

// 引入 highlight.js 库
import hljs from "highlight.js";

// ----------------------------------------------------------------------

/**
 * 扩展全局 Window 对象，添加 `hljs` 属性，用于在全局访问 highlight.js 实例
 */
declare global {
	interface Window {
		hljs: any; // 声明 `hljs` 属性为任意类型（any）
	}
}

// 配置 highlight.js 的高亮语言
hljs.configure({
	// 指定支持的语言列表，减少不必要的语言解析，提高性能
	languages: [
		"javascript",
		"sh",
		"bash",
		"html",
		"scss",
		"less",
		"css",
		"json",
	],
});

// 检查当前环境是否为浏览器环境（即 window 对象是否存在）
if (typeof window !== "undefined") {
	// 将 highlight.js 实例挂载到全局 window 对象上
	window.hljs = hljs;
}
