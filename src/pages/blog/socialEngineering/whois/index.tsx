import { BlogApi } from "@/api";
import { isValidDomain } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

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
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [whois, setWhois] = useState("");

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

	async function getData(trimmedWhois: string) {
		console.log("%c Line:121 🍇 trimmedWhois", "color:#33a5ff", trimmedWhois);
		try {
			if (!trimmedWhois.trim()) throw new Error("请输入域名");

			if (!isValidDomain(trimmedWhois)) throw new Error("请输入有效的域名");

			setLoading(true);

			const res = await BlogApi.getWhoisInfo(trimmedWhois);

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
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	/**
	 *  使用 ahooks 的节流
	 */
	const { run: throttledGetData } = useThrottleFn(
		() => {
			getData(whois.replace(/\s+/g, ""));
		},
		{
			wait: 1000,
			leading: false,
		},
	);

	/**
	 *  输入变化的处理
	 */
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setWhois(e.target.value);
		setError("");
	}

	/**
	 *  清空输入框
	 */
	function handleClear() {
		setWhois("");

		setError("");

		setData({
			domainName: "",
			registrationTime: "",
			expirationTime: "",
			registrant: "",
			registrantContactEmail: "",
			registrarURL: "",
			sponsoringRegistrar: "",
			dnsServer: [],
		});
	}

	return (
		<div className="p-4 h-full flex flex-col">
			{/* 顶部筛选栏 */}
			<div className="flex items-center justify-between mb-4">
				<Input.Search
					className="!w-80"
					allowClear
					placeholder="请输入域名"
					value={whois}
					onChange={handleInputChange}
					onPressEnter={throttledGetData}
					onSearch={throttledGetData}
					onClear={handleClear}
					loading={loading}
					enterButton="搜索"
					disabled={loading}
					status={error ? "error" : ""}
				/>{" "}
				{/* 错误提示 */}
				{error && (
					<div style={{ color: "red", marginTop: "4px" }}>{error}</div>
				)}{" "}
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
					<Descriptions
						className="w-full h-full"
						labelStyle={{
							maxWidth: 300,
						}}
						bordered
						items={items}
					/>
				)}
			</div>
		</div>
	);
}

export default Hok;
