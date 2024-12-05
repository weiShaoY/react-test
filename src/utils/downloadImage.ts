/**
 * 下载图片工具函数
 * @param {string} url 图片的URL地址
 * @param {string} [filename] 下载保存的文件名（默认取URL中的文件名）
 */
export async function downloadImage(
	url: string,
	filename?: string,
): Promise<void> {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`下载图片失败，HTTP状态码: ${response.status}`);
		}

		const blob = await response.blob();
		const objectUrl = URL.createObjectURL(blob);

		// 提取文件名或使用默认值
		const defaultFilename = url.split("/").pop() || "image";
		const finalFilename = filename || defaultFilename;

		// 创建隐藏的下载链接并触发下载
		const link = document.createElement("a");
		link.href = objectUrl;
		link.download = finalFilename;
		document.body.appendChild(link);
		link.click();

		// 清理资源
		document.body.removeChild(link);
		URL.revokeObjectURL(objectUrl);
	} catch (error) {
		console.error("图片下载失败:", error);
		throw error; // 可以根据需求决定是否抛出错误
	}
}
