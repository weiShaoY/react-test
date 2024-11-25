import { useState } from "react";

/**
 * 警告状态类型
 */
type AlertState = {
	show: boolean; // 是否显示警告
	text: string; // 警告内容文本
	type: "danger" | "success" | "info" | "warning"; // 警告类型
};

/**
 * 显示警告的参数类型
 */
type ShowAlertParams = {
	text: string; // 警告内容文本
	type?: "danger" | "success" | "info" | "warning"; // 警告类型，可选
};

/**
 * 自定义警告 Hook，用于管理警告弹窗的状态。
 */
const useAlert = () => {
	const [alert, setAlert] = useState<AlertState>({
		show: false, // 是否显示警告
		text: "", // 警告内容文本
		type: "danger", // 默认警告类型
	});

	/**
	 * 显示警告信息
	 * @param {ShowAlertParams} params - 显示警告的参数。
	 */
	const showAlert = ({ text, type = "danger" }: ShowAlertParams) => {
		if (!text) {
			console.warn("警告文本不能为空");
			return;
		}
		setAlert({ show: true, text, type });
	};

	/**
	 * 隐藏警告信息
	 */
	const hideAlert = () => {
		setAlert({ show: false, text: "", type: "danger" });
	};

	return { alert, showAlert, hideAlert };
};

export default useAlert;
