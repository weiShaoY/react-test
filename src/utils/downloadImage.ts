import { toast } from "sonner";

/**
 * 使用 `<a>` 标签下载文件，并动态设置文件名和扩展名
 * @param url - 文件的 URL
 * @param [defaultName="downloaded_file"] - 默认文件名（无文件名时使用）
 */
export function downloadImage(url: string, defaultName = "downloaded_file") {
	try {
		// 从 URL 中解析文件名
		const urlParts = url.split("/");
		const fileNameWithExtension = urlParts[urlParts.length - 1] || defaultName;

		// 确保文件名具有有效扩展名
		const validExtensions = [".png", ".jpg", ".jpeg"];
		const lowerCaseName = fileNameWithExtension.toLowerCase();
		const hasValidExtension = validExtensions.some((ext) =>
			lowerCaseName.endsWith(ext),
		);

		// 如果没有有效扩展名，添加默认扩展名 .jpg
		const fileName = hasValidExtension
			? fileNameWithExtension
			: `${fileNameWithExtension}.jpg`;

		// 创建 a 标签并触发下载
		const link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		link.download = fileName; // 动态设置文件名
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// 成功提示
		toast.success(`文件下载成功: ${fileName}`);
	} catch (err) {
		console.error(err);

		// 失败提示
		toast.error(`文件下载失败: ${url}`);
	}
}
