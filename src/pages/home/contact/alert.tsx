import { useState } from "react";

type AlertState = {
	show: boolean; // 是否显示警告
	text: string; // 警告内容文本
	type: "danger" | "success" | "info" | "warning"; // 警告类型
};

type ShowAlertParams = {
	text: string; // 警告内容文本
	type?: "danger" | "success" | "info" | "warning"; // 警告类型，可选
};

/**
 * 自定义警告 Hook，用于管理警告状态
 */
const useAlert = () => {
	const [alert, setAlert] = useState<AlertState>({
		show: false,
		text: "",
		type: "danger",
	});

	/**
	 * 显示警告信息
	 * @param {ShowAlertParams} params - 显示警告的参数
	 */
	const showAlert = ({ text, type = "danger" }: ShowAlertParams) => {
		if (!text) {
			console.warn("警告文本不能为空");
			return;
		}
		setAlert({ show: true, text, type });

		// 自动隐藏警告（5秒后自动消失）
		setTimeout(() => {
			hideAlert();
		}, 5000);
	};

	/**
	 * 隐藏警告信息
	 */
	const hideAlert = () => {
		setAlert({ show: false, text: "", type: "danger" });
	};

	return { alert, showAlert, hideAlert };
};

/**
 * 警告组件
 */
const Alert = ({ alert }: { alert: AlertState }) => {
	if (!alert.show) return null;

	return (
		<div className="fixed bottom-5 right-5 flex justify-center items-center z-50">
			<div
				className={`p-2 ${
					alert.type === "danger" ? "bg-[#991b1b]" : "bg-[#1e40af]"
				} items-center text-[#e0e7ff] leading-none lg:rounded-full flex lg:inline-flex rounded-md p-5`}
				role="alert"
			>
				<p
					className={`flex rounded-full ${
						alert.type === "danger" ? "bg-[#ef4444]" : "bg-[#3b82f6]"
					} uppercase px-2 py-1 text-xs font-semibold mr-3`}
				>
					{alert.type === "danger" ? "Failed" : "Success"}
				</p>
				<p className="mr-2 text-left">{alert.text}</p>
			</div>
		</div>
	);
};

export { useAlert, Alert };
