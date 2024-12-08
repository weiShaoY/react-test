import { useState } from "react";
import { message, Descriptions, Input, Spin } from "antd";
import { BlogApi } from "@/api";
import { isValidDomain } from "@/utils";
import { useThrottleFn } from "ahooks";
import dayjs from "dayjs";

/**
 * 表示域名的 Whois 数据结构
 */
type WhoisDataType = {
	/**
	 * 域名名称
	 */
	domainName: string;

	/**
	 * 域名注册时间
	 */
	registrationTime: string;

	/**
	 * 域名到期时间
	 */
	expirationTime: string;

	/**
	 * 注册人名称
	 */
	registrant: string;

	/**
	 * 注册人联系邮箱
	 */
	registrantContactEmail: string;

	/**
	 * 注册商网站 URL
	 */
	registrarURL: string;

	/**
	 * 赞助注册商名称
	 */
	sponsoringRegistrar: string;

	/**
	 * DNS 服务器列表
	 */
	dnsServer: string[];
};

function Hok() {
	const [whois, setWhois] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<WhoisDataType>({
		domainName: "",
		registrationTime: "",
		expirationTime: "",
		registrant: "",
		registrantContactEmail: "",
		registrarURL: "",
		sponsoringRegistrar: "",
		dnsServer: [],
	});

	async function getData() {
		if (!isValidDomain(whois) || whois.trim() === "") {
			setError("请输入有效的域名");
			return;
		}
		try {
			setLoading(true);
			const res = await BlogApi.getWhoisInfo(whois);
			setData({
				domainName: res["Domain Name"] || "",
				registrationTime: res["Registration Time"] || "",
				expirationTime: res["Expiration Time"] || "",
				registrant: res.Registrant || "",
				registrantContactEmail: res["Registrant Contact Email"] || "",
				registrarURL: res["Registrar URL"] || "",
				sponsoringRegistrar: res["Sponsoring Registrar"] || "",
				dnsServer: res["DNS Serve"] || [],
			});
		} catch (error) {
			message.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}

	/**
	 *  使用 ahooks 的节流
	 */
	const { run } = useThrottleFn(
		() => {
			if (!whois.trim()) return; // 清空时不触发

			getData();
		},
		{
			wait: 2000,
			leading: false,
		},
	);

	/**
	 *  输入变化的处理
	 */
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setWhois(e.target.value);
		setError(""); // 清除错误提示
	}

	/**
	 *  按下回车触发的数据获取
	 */
	function handlePressEnter() {
		// 立即调用
		run();
	}

	/**
	 *  点击搜索按钮触发的数据获取
	 */
	function handleSearch() {
		// 立即调用
		run();
	}

	const items = [
		{
			label: "域名名称",
			children: data.domainName || "无",
			span: 3,
		},
		{
			label: "域名注册时间",
			children: data.registrationTime
				? dayjs(data.registrationTime).format("YYYY-MM-DD HH:mm:ss")
				: "无",
			span: 3,
		},
		{
			label: "域名到期时间",
			children: data.expirationTime
				? dayjs(data.expirationTime).format("YYYY-MM-DD HH:mm:ss")
				: "无",
			span: 3,
		},

		{
			label: "注册人名称",
			children: data.registrant || "无",
			span: 3,
		},
		{
			label: "注册人联系邮箱",
			children: data.registrantContactEmail || "无",
			span: 3,
		},
		{
			label: "注册商网站 URL",
			children: data.registrarURL || "无",
			span: 3,
		},

		{
			label: "域名赞助注册商",
			children: data.sponsoringRegistrar || "无",
			span: 3,
		},
		{
			label: "DNS 服务器列表",
			children: data.dnsServer.join(", ") || "无",
			span: 3,
		},
	];

	return (
		<div className="p-4 h-full flex flex-col">
			{/* 顶部筛选栏 */}
			<div className="flex items-center justify-between mb-4">
				<Input.Search
					allowClear
					placeholder="请输入域名"
					value={whois}
					onChange={handleInputChange} // 双向绑定
					onPressEnter={handlePressEnter}
					onSearch={handleSearch} // 点击搜索按钮时触发
					className="!w-80"
					status={error ? "error" : ""} // 如果有错误，设置输入框状态为 error
					loading={loading}
					enterButton="搜索" // 固定的搜索按钮
					disabled={loading}
				/>
				{error && <div style={{ color: "red", marginTop: "4px" }}>{error}</div>}{" "}
				{/* 错误提示 */}
			</div>

			{/* 数据展示 */}
			<div className="flex-1 flex justify-center items-center bg-gray-200 relative">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
				)}

				{!loading && (
					<Descriptions bordered items={items} className="w-full h-full" />
				)}
			</div>
		</div>
	);
}

export default Hok;
