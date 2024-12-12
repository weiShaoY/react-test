import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { Alert, useAlert } from "./alert"; // 引入 Alert 和 useAlert

import { SvgIcon } from "@/components/icon";

import { sendContactEmail } from "@/utils";

// import Earth from "@/canvas/earth";

import Moon from "@/canvas/moon";

/**
 * 表单数据类型
 */
type FormType = {
	/**
	 *  用户名称
	 */
	name: string;
	/**
	 *  用户邮箱
	 */
	email: string;
	/**
	 *  用户留言
	 */
	message: string;
};

const Contact = () => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const { alert, showAlert, hideAlert } = useAlert(); // 使用 useAlert Hook 获取警告状态

	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<FormType>({
		name: "",
		email: "",
		message: "",
	});

	/**
	 * 处理表单字段变更
	 * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - 输入事件对象
	 */
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	/**
	 * 处理表单提交
	 */
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			await sendContactEmail(form);

			showAlert({
				text: "感谢您的留言 😃",
				type: "success",
			});

			setTimeout(() => {
				hideAlert();
				setForm({ name: "", email: "", message: "" });
			}, 3000);
		} catch (error) {
			console.error("邮件发送失败:", error);
			showAlert({
				text: "我没有收到你的信息😢",
				type: "danger",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-full w-full relative max-w-7xl mx-auto pt-20">
			<section className="sm:px-10 px-5 my-20" id="contact">
				{/* 显示警告组件 */}
				{alert.show && <Alert alert={alert} />}
				<div className="w-full text-[#afb0b6]">
					<p className="sm:text-4xl text-3xl font-semibold text-gray_gradient">
						联系我
					</p>

					<div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
						<div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-[#0e0e10]">
							<form
								ref={formRef}
								onSubmit={handleSubmit}
								className="mt-12 flex flex-col space-y-7"
							>
								<label className="space-y-3">
									<span className="text-lg text-[#afb0b6]">姓名</span>
									<input
										type="text"
										name="name"
										value={form.name}
										onChange={handleChange}
										required
										className="w-full bg-[#1c1c21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646c] text-lg text-[#e4e4e6] shadow-[#0E0E10]shadow-2xl focus:outline-[#DED9FC]"
										placeholder="例如, Alan Mathison Turing"
									/>
								</label>

								<label className="space-y-3">
									<span className="text-lg text-[#afb0b6]">电子邮件</span>
									<input
										type="email"
										name="email"
										value={form.email}
										onChange={handleChange}
										required
										className="w-full bg-[#1c1c21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646c] text-lg text-[#e4e4e6] shadow-[#0E0E10]shadow-2xl focus:outline-[#DED9FC]"
										placeholder="例如, turing@gmail.com"
									/>
								</label>

								<label className="space-y-3">
									<span className="text-lg text-[#afb0b6]">您的留言</span>
									<textarea
										name="message"
										value={form.message}
										onChange={handleChange}
										required
										rows={5}
										className="w-full bg-[#1c1c21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646c] text-lg text-[#e4e4e6] shadow-[#0E0E10]shadow-2xl focus:outline-[#DED9FC]"
										placeholder="分享您的想法或询问..."
									/>
								</label>

								<button
									className="p-3 bg-[#3a3a49] text-white cursor-pointer active:scale-95 transition-all rounded-lg hover:bg-opacity-70 flex items-center justify-center gap-2"
									type="submit"
									disabled={loading}
								>
									{loading ? "发送..." : "发送消息"}
									<SvgIcon icon="arrow-top-right" size={18} />
								</button>
							</form>
						</div>

						<div className="rounded-lg flex justify-center items-center">
							<div className="rounded-3xl w-full  h-fit flex justify-center items-center cursor-pointer">
								<Moon height={400} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Contact;
