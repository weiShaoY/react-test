import { BlogApi } from "@/api";
import Card from "@/components/card";
import { isValidDomain } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { toast } from "sonner";

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

function Domain() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	//  baidu.com
	const [keyword, setKeyword] = useState("baidu.com");

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

	const getData = useCallback(async (keyword: string) => {
		try {
			if (!keyword) {
				throw new Error("请输入域名");
			}

			if (!isValidDomain(keyword)) {
				throw new Error("请输入有效的域名");
			}

			setLoading(true);

			const response = await BlogApi.getWebsiteDetails(keyword);

			setData({
				icp: {
					subject: {
						name: response.icp.subject.name || "", // 单位名称
						nature: response.icp.subject.nature || "", // 单位性质
						license: response.icp.subject.license || "", // 备案许可证编号
						updateTime: response.icp.subject.updateTime || "", // 信息更新时间
					},
					website: {
						domain: response.icp.website.domain || "", // 网站域名
						license: response.icp.website.license || "", // 网站备案许可证编号
					},
				},
				whois: {
					"Domain Status": response.whois["Domain Status"] || [], // 域名状态
					"Name Server": response.whois["Name Server"] || [], // 域名 DNS 服务器列表
					"Created Date": response.whois["Created Date"] || "", // 域名创建时间
					"Updated Date": response.whois["Updated Date"] || "", // 域名更新时间
					"Expiry Date": response.whois["Expiry Date"] || "", // 域名到期时间
					Registrar: response.whois.Registrar || "", // 注册商名称
				},
				dns: {
					A: response.dns.A || [], // A 记录
					AAAA: response.dns.AAAA || [], // AAAA 记录
					CNAME: response.dns.CNAME || [], // CNAME 记录
					NS: response.dns.NS || [], // NS 记录
					GEO: {
						isp: response.dns.GEO.isp || "", // 互联网服务提供商
						area: response.dns.GEO.area || "", // 所在区域
					},
				},
			});
		} catch (error) {
			toast.error(error.message || "获取数据失败，请稍后重试");

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
			getData(keyword.replace(/\s+/g, ""));
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
		setKeyword(e.target.value.trim());
		setError("");
	}

	/**
	 *  搜索
	 */
	function handleInputSearch(info?: { source?: "input" | "clear" }) {
		if (info && info.source === "clear") {
			setKeyword("");

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
			return;
		}

		throttledGetData();
	}

	return (
		<Card className="flex flex-col gap-5">
			<div className="flex gap-5 flex-wrap w-full items-center">
				<Input.Search
					className="!w-80"
					loading={loading}
					disabled={loading}
					value={keyword}
					onChange={handleInputChange}
					onSearch={(_, __, info) => handleInputSearch(info)}
					placeholder="请输入域名"
					allowClear
					status={error ? "error" : ""}
					enterButton="搜索"
				/>

				<div className="flex items-center">
					{error && <span className="text-red">{error}</span>}
				</div>
			</div>

			<div className="relative w-full">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				)}

				<Descriptions
					labelStyle={{
						width: 160,
					}}
					bordered
					items={items}
				/>
			</div>
		</Card>
	);
}

export default Domain;
