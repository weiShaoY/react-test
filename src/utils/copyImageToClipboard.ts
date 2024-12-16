import { toast } from "sonner";

/**
 * 将指定图片 URL 复制到剪贴板
 * @param {string} url - 图片的 URL 地址
 * @throws {Error} 如果图片获取或复制失败，将抛出错误
 */
export function copyImageToClipboard(url: string): void {
	// 使用 fetch 获取图片 Blob 对象
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				const errorMsg = `图片获取失败，状态码: ${response.status}`;
				toast.error(errorMsg);
				throw new Error(errorMsg);
			}
			return response.blob();
		})
		.then((blob) => {
			const file = new File([blob], "screenshot.png", { type: "image/png" });

			// 将图片写入剪贴板
			return navigator.clipboard.write([
				new ClipboardItem({ "image/png": file }),
			]);
		})
		.then(() => {
			// 提示用户操作成功
			toast.success("图片已成功复制到剪贴板！");
		})
		.catch((err) => {
			// 捕获错误并显示提示
			const errorMsg = `复制图片到剪贴板失败: ${(err as Error).message}`;
			toast.error(errorMsg);
			throw new Error(errorMsg);
		});
}
