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

	/**
	 *  单位名称
	 */
	unitName: string;

	/**
	 *  单位性质
	 */
	unitNature: string;

	/**
	 * 备案许可证编号
	 */
	icpLicense: string;

	/**
	 *  信息更新时间
	 */
	updateTime: string;
};

function Hok() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [domain, setDomain] = useState("");

	const [data, setData] = useState<WhoisDataType>({
		domainName: "",
		registrationTime: "",
		expirationTime: "",
		registrant: "",
		registrantContactEmail: "",
		registrarURL: "",
		sponsoringRegistrar: "",
		dnsServer: [],
		unitName: "",
		unitNature: "",
		icpLicense: "",
		updateTime: "",
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

	async function getData(trimmedDomain: string) {
		try {
			if (!trimmedDomain.trim()) throw new Error("请输入域名");

			if (!isValidDomain(trimmedDomain)) throw new Error("请输入有效的域名");

			setLoading(true);

			const responseWhoisInfo = await BlogApi.getDomainWhoisInfo(trimmedDomain);

			const responseICPInfo = await BlogApi.getWebsiteDetails(trimmedDomain);
			console.log(
				"%c Line:155 🥐 responseICPInfo",
				"color:#42b983",
				responseICPInfo,
			);

			setData({
				domainName: responseWhoisInfo["Domain Name"] || "",
				registrationTime: responseWhoisInfo["Registration Time"] || "",
				expirationTime: responseWhoisInfo["Expiration Time"] || "",
				registrant: responseWhoisInfo.Registrant || "",
				registrantContactEmail:
					responseWhoisInfo["Registrant Contact Email"] || "",
				registrarURL: responseWhoisInfo["Registrar URL"] || "",
				sponsoringRegistrar: responseWhoisInfo["Sponsoring Registrar"] || "",
				dnsServer: responseWhoisInfo["DNS Serve"] || [],
				unitName: responseICPInfo.unitName || "",
				unitNature: responseICPInfo.unitNature || "",
				icpLicense: responseICPInfo.icpLicense || "",
				updateTime: responseICPInfo.updateTime || "",
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
			getData(domain.replace(/\s+/g, ""));
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
		setDomain(e.target.value);
		setError("");
	}

	/**
	 *  清空输入框
	 */
	function handleClear() {
		setDomain("");

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
			unitName: "",
			unitNature: "",
			icpLicense: "",
			updateTime: "",
		});
	}

	return (
		<div className="p-4 h-full flex flex-col">
			{/* 数据展示 */}
			{loading ? (
				<Spin
					size="large"
					className="!absolute z-10 left-1/2 top-1/2 -translate-x-1/2
				-translate-y-1/2"
				/>
			) : (
				<Descriptions
					className="w-full h-full"
					labelStyle={{
						width: 160,
					}}
					bordered
					items={items}
					title={
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入域名"
							value={domain}
							onChange={handleInputChange}
							onPressEnter={throttledGetData}
							onSearch={throttledGetData}
							onClear={handleClear}
							loading={loading}
							enterButton="搜索"
							disabled={loading}
							status={error ? "error" : ""}
						/>
					}
					extra={error && <div className="text-red mt-1">{error}</div>}
				/>
			)}
		</div>
	);
}

export default Hok;
