import { BlogApi } from "@/api";
import { isValidDomain } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin, message } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const INITIALIZATION = "baidu.com";

/**
 * 表示完整的域名信息结构
 */
type DomainInfoType = {
	/**
	 * ICP 备案信息
	 */
	icp: {
		/**
		 * 备案主体信息
		 */
		subject: {
			/**
			 * 单位名称
			 */
			name: string;

			/**
			 * 单位性质，例如“企业”或“个人”
			 */
			nature: string;

			/**
			 * 备案许可证编号
			 */
			license: string;

			/**
			 * 信息更新时间，格式为 YYYY-MM-DD HH:mm:ss
			 */
			updateTime: string;
		};

		/**
		 * 备案网站信息
		 */
		website: {
			/**
			 * 网站域名
			 */
			domain: string;

			/**
			 * 网站备案许可证编号
			 */
			license: string;
		};
	};

	/**
	 * Whois 信息
	 */
	whois: {
		/**
		 * 域名状态列表
		 */
		"Domain Status": string[];

		/**
		 * 域名的 DNS 服务器列表
		 */
		"Name Server": string[];

		/**
		 * 域名创建时间
		 */
		"Created Date": string;

		/**
		 * 域名更新时间
		 */
		"Updated Date": string;

		/**
		 * 域名到期时间
		 */
		"Expiry Date": string;

		/**
		 * 注册商名称
		 */
		Registrar: string;
	};

	/**
	 * DNS 信息
	 */
	dns: {
		/**
		 * A 记录列表
		 */
		A: string[];

		/**
		 * AAAA 记录列表
		 */
		AAAA: string[];

		/**
		 * CNAME 记录列表
		 */
		CNAME: string[];

		/**
		 * NS 记录列表
		 */
		NS: string[];

		/**
		 * 地理位置信息
		 */
		GEO: {
			/**
			 * 互联网服务提供商
			 */
			isp: string;

			/**
			 * 所在区域
			 */
			area: string;
		};
	};
};

function Hok() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	//  baidu.com
	const [domain, setDomain] = useState(INITIALIZATION);

	const [data, setData] = useState<DomainInfoType>({
		icp: {
			subject: {
				name: "",
				nature: "",
				license: "",
				updateTime: "",
			},
			website: {
				domain: "",
				license: "",
			},
		},
		whois: {
			"Domain Status": [],
			"Name Server": [],
			"Created Date": "",
			"Updated Date": "",
			"Expiry Date": "",
			Registrar: "",
		},
		dns: {
			A: [],
			AAAA: [],
			CNAME: [],
			NS: [],
			GEO: {
				isp: "",
				area: "",
			},
		},
	});

	const items = [
		{
			label: "单位名称",
			span: 2,
			children: data.icp.subject.name || "无",
		},
		{
			label: "单位性质",
			span: 1,
			children: data.icp.subject.nature || "无",
		},
		{
			label: "备案许可证编号",
			span: 1,
			children: data.icp.subject.license || "无",
		},
		{
			label: "信息更新时间",
			span: 1,
			children: data.icp.subject.updateTime || "无",
		},
		{
			label: "备案网站域名",
			span: 1,
			children: data.icp.website.domain || "无",
		},
		{
			label: "备案网站许可证编号",
			span: 1,
			children: data.icp.website.license || "无",
		},
		{
			label: "域名状态",
			span: 1,
			children: (() => {
				const domainStatusList = data.whois["Domain Status"];
				if (!domainStatusList || domainStatusList.length === 0) {
					return "无";
				}
				return domainStatusList.map((status) => {
					const [text, url] = status.split(" ");
					return (
						<a
							key={url}
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="block"
						>
							{text}
						</a>
					);
				});
			})(),
		},
		{
			label: "域名 DNS 服务器列表",
			span: 1,
			children: (() => {
				const domainNameServerList = data.whois["Name Server"];
				if (!domainNameServerList || domainNameServerList.length === 0) {
					return "无";
				}
				return domainNameServerList.map((nameServer) => (
					<span key={nameServer}>
						{nameServer} <br />
					</span>
				));
			})(),
		},
		{
			label: "域名创建时间",
			span: 1,
			children: data.whois["Created Date"]
				? dayjs(data.whois["Created Date"]).format("YYYY-MM-DD HH:mm:ss")
				: "无",
		},
		{
			label: "域名更新时间",
			span: 1,
			children: data.whois["Updated Date"]
				? dayjs(data.whois["Updated Date"]).format("YYYY-MM-DD HH:mm:ss")
				: "无",
		},
		{
			label: "域名到期时间",
			span: 1,
			children: data.whois["Expiry Date"]
				? dayjs(data.whois["Expiry Date"]).format("YYYY-MM-DD HH:mm:ss")
				: "无",
		},
		{
			label: "注册商名称",
			span: 1,
			children: data.whois.Registrar || "无",
		},
		{
			label: "DNS A 记录",
			span: 1,
			children: (() => {
				const dnsAList = data.dns.A;
				if (!dnsAList || dnsAList.length === 0) {
					return "无";
				}
				return dnsAList.map((dnsA) => (
					<span key={dnsA}>
						{dnsA} <br />
					</span>
				));
			})(),
		},
		{
			label: "DNS AAAA 记录",
			span: 1,
			children: data.dns.AAAA?.join(", ") || "无",
		},
		{
			label: "DNS CNAME 记录",
			span: 1,
			children: data.dns.CNAME?.join(", ") || "无",
		},
		{
			label: "DNS NS 记录",
			span: 1,
			children: (() => {
				const dnsNSList = data.dns.NS;
				if (!dnsNSList || dnsNSList.length === 0) {
					return "无";
				}
				return dnsNSList.map((dnsNS) => (
					<span key={dnsNS}>
						{dnsNS} <br />
					</span>
				));
			})(),
		},
		{
			label: "ISP 和区域",
			span: 1,
			children:
				data.dns.GEO.isp && data.dns.GEO.area
					? `${data.dns.GEO.isp} - ${data.dns.GEO.area}`
					: "无",
		},
	];

	const getData = useCallback(async (trimmedDomain: string) => {
		try {
			if (!trimmedDomain.trim()) throw new Error("请输入域名");

			if (!isValidDomain(trimmedDomain)) throw new Error("请输入有效的域名");

			setLoading(true);

			// const responseWhoisInfo = await BlogApi.getDomainWhoisInfo(trimmedDomain);

			const responseICPInfo = await BlogApi.getWebsiteDetails(trimmedDomain);

			setData({
				icp: {
					subject: {
						name: responseICPInfo.icp.subject.name || "", // 单位名称
						nature: responseICPInfo.icp.subject.nature || "", // 单位性质
						license: responseICPInfo.icp.subject.license || "", // 备案许可证编号
						updateTime: responseICPInfo.icp.subject.updateTime || "", // 信息更新时间
					},
					website: {
						domain: responseICPInfo.icp.website.domain || "", // 网站域名
						license: responseICPInfo.icp.website.license || "", // 网站备案许可证编号
					},
				},
				whois: {
					"Domain Status": responseICPInfo.whois["Domain Status"] || [], // 域名状态
					"Name Server": responseICPInfo.whois["Name Server"] || [], // 域名 DNS 服务器列表
					"Created Date": responseICPInfo.whois["Created Date"] || "", // 域名创建时间
					"Updated Date": responseICPInfo.whois["Updated Date"] || "", // 域名更新时间
					"Expiry Date": responseICPInfo.whois["Expiry Date"] || "", // 域名到期时间
					Registrar: responseICPInfo.whois.Registrar || "", // 注册商名称
				},
				dns: {
					A: responseICPInfo.dns.A || [], // A 记录
					AAAA: responseICPInfo.dns.AAAA || [], // AAAA 记录
					CNAME: responseICPInfo.dns.CNAME || [], // CNAME 记录
					NS: responseICPInfo.dns.NS || [], // NS 记录
					GEO: {
						isp: responseICPInfo.dns.GEO.isp || "", // 互联网服务提供商
						area: responseICPInfo.dns.GEO.area || "", // 所在区域
					},
				},
			});
		} catch (error) {
			message.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

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
			icp: {
				subject: {
					name: "",
					nature: "",
					license: "",
					updateTime: "",
				},
				website: {
					domain: "",
					license: "",
				},
			},
			whois: {
				"Domain Status": [],
				"Name Server": [],
				"Created Date": "",
				"Updated Date": "",
				"Expiry Date": "",
				Registrar: "",
			},
			dns: {
				A: [],
				AAAA: [],
				CNAME: [],
				NS: [],
				GEO: {
					isp: "",
					area: "",
				},
			},
		});
	}

	useEffect(() => {
		getData(INITIALIZATION);
	}, [getData]);

	return (
		<div className="p-4  flex flex-col relative">
			{/* 数据展示 */}
			<Descriptions
				className="w-full h-full"
				labelStyle={{
					width: 190,
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
				extra={error && <span className="text-red ">{error}</span>}
			/>

			{loading && (
				<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
					<Spin size="large" />
				</div>
			)}
		</div>
	);
}

export default Hok;
