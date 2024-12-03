import BlogApi from "@/api/modules/blog";
import { notification } from "antd";

/**
 * 获取问候语并通过 notification 提示
 */
export async function getGreeting(): Promise<void> {
	try {
		// 调用 API 获取数据
		const data = await BlogApi.getGreeting();
		if (data) {
			// 使用 Ant Design 的 notification 显示问候语
			notification.success({
				message: data.greeting, // 主标题
				description: data.tip, // 副标题
				placement: "topRight", // 提示位置
				duration: 10, // 提示持续时间
			});
		}
	} catch (error) {
		// 捕获错误并提示
		console.error("获取问候语失败：", error);
	}
}
