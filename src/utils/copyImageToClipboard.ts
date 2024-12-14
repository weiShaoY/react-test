/**
 * 将图片 URL 转换为 Blob 并复制到剪贴板
 * @param url 图片的 URL
 * @returns {Promise<void>} 复制成功时 resolve，失败时 reject
 */
export function copyImageToClipboard(url: string): Promise<void> {
	return new Promise((resolve, reject) => {
		// 使用 fetch 获取图片的 Blob 对象
		fetch(url)
			.then((response) => response.blob()) // 获取 Blob 对象
			.then((blob) => {
				// 创建一个新的文件对象
				const file = new File([blob], "screenshot.png", { type: "image/png" });

				// 使用 Clipboard API 复制到剪贴板
				return navigator.clipboard.write([
					new ClipboardItem({ "image/png": file }),
				]);
			})
			.then(() => {
				resolve(); // 复制成功，resolve
			})
			.catch((err) => {
				console.error("复制截图到剪贴板失败:", err);
				reject(err); // 复制失败，reject
			});
	});
}
