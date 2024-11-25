import emailjs from "@emailjs/browser";

type FormDataType = {
	/**
	 * 发送者名称
	 */
	name: string;
	/**
	 * 发送者邮箱
	 */
	email: string;
	/**
	 * 留言内容
	 */
	message: string;
};

/**
 * 使用 EmailJS 发送邮件
 * @param {FormDataType} formData - 表单数据，包括发送者名称、邮箱和留言内容
 * @returns {Promise<void>} - 一个 Promise，表示发送邮件的操作结果
 */
export const sendContactEmail = async (
	formData: FormDataType,
): Promise<void> => {
	try {
		// 从环境变量中获取 EmailJS 的配置
		const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID as string;
		const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID as string;
		const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY as string;

		// 检查必要的环境变量是否存在
		if (!serviceId || !templateId || !publicKey) {
			throw new Error("EmailJS 配置信息不完整，请检查环境变量。");
		}

		// 构造数据对象
		const data = {
			from_name: formData.name,
			to_name: "少爷",
			from_email: formData.email,
			to_email: "1604705673@qq.com",
			message: formData.message,
		};

		// 调用 EmailJS 的发送接口
		await emailjs.send(serviceId, templateId, data, publicKey);
		console.log("邮件发送成功！");
	} catch (error) {
		console.error("发送邮件失败:", error);
		throw error; // 将错误抛出以便调用方处理
	}
};
