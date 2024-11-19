import { App } from "antd";
import { useState } from "react";

/**
 * 已复制的文本类型，可能为字符串或 null
 */
type CopiedValue = string | null;

/**
 * 复制文本到剪贴板的函数类型
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} - 返回一个 Promise，表示是否成功复制
 */
type CopyFn = (text: string) => Promise<boolean>;

/**
 * 自定义 Hook 的返回类型
 */
type ReturnType = {
	/**
	 *   复制文本到剪贴板的函数
	 */
	copyFn: CopyFn;

	/**
	 *  已复制的文本
	 */
	copiedText: CopiedValue;
};

/**
 * 自定义 Hook，用于复制文本到剪贴板，并显示通知
 * @returns  返回包含复制函数和已复制文本的对象
 */
export function useCopyToClipboard(): ReturnType {
	// 定义一个状态，用于存储已复制的文本
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	// 使用 Ant Design 的 App 中的通知功能
	const { notification } = App.useApp();

	/**
	 * 复制文本到剪贴板的函数
	 * @param {string} text - 要复制的文本
	 * @returns {Promise<boolean>} - 是否复制成功
	 */
	const copyFn: CopyFn = async (text) => {
		// 检查浏览器是否支持剪贴板功能
		if (!navigator?.clipboard) {
			console.warn("浏览器不支持剪贴板功能");
			return false;
		}

		try {
			// 尝试将文本写入剪贴板，并更新状态
			await navigator.clipboard.writeText(text);
			setCopiedText(text);

			// 显示复制成功的通知
			notification.success({
				message: "已复制!",
			});
			return true;
		} catch (error) {
			// 捕获异常并输出到控制台
			console.warn("复制失败", error);
			setCopiedText(null);
			return false;
		}
	};

	// 返回复制函数和已复制文本
	return { copiedText, copyFn };
}


export default useCopyToClipboard