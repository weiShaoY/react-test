import BlogApi from "@/api/modules/blog";
import { toast } from "sonner";

/**
 * 获取问候语并通过 toast 提示
 */
export async function getGreeting() {
	try {
		// 调用 API 获取数据
		const data = await BlogApi.getGreeting();
		if (data) {
			toast(data.greeting, {
				description: data.tip,
			});
		}
	} catch (error) {
		// 捕获错误并提示
		toast.error("获取问候语失败", {
			description: error,
		});
		console.error("获取问候语失败：", error);
	}
}
