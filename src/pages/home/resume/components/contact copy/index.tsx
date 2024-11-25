import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import useAlert from "./use-alert";

import Alert from "./alert";

import { SvgIcon } from "@/components/icon";

import { sendContactEmail } from "@/utils";

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
	const { alert, showAlert, hideAlert } = useAlert();

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
		<section className="sm:px-10 px-5 my-20" id="contact">
			{alert.show && <Alert {...alert} />}

			<div className="relative min-h-screen flex items-center justify-center flex-col">
				<img
					src="/assets/terminal.png"
					alt="terminal-bg"
					className="absolute inset-0 min-h-screen"
				/>

				<div className="max-w-xl relative z-10 sm:px-10 px-5 mt-12 text-[#afb0b6]">
					<h3 className="sm:text-4xl text-3xl font-semibold">联系我</h3>
					{/* <p className="text-lg text-[#afb0b6] mt-3">
						无论您是想建立一个新网站、改进现有平台还是实现一个独特的项目，我都会为您提供帮助。
					</p> */}

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
								className="w-full bg-[#1c1c21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646c] text-lg text-[#e4e4e6] shadow-[#0E0E10]shadow-2xl focus:outline-none active:bg-opacity-30"
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
								className="w-full bg-[#1c1c21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646c] text-lg text-[#e4e4e6] shadow-[#0E0E10]shadow-2xl focus:outline-none"
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
								className="w-full bg-[#1c1c21] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646c] text-lg text-[#e4e4e6] shadow-[#0E0E10]shadow-2xl focus:outline-none"
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
			</div>
		</section>
	);
};

export default Contact;
