import { Table } from "antd";
import Card from "@/components/card";

// 数据列表
const data = [
	{
		key: "1",
		category: "公众服务电话号码、常用电话、紧急电话",
		numbers: [
			{ name: "火警电话", number: "119", website: "http://www.119.gov.cn/" },
			{ name: "报警服务台", number: "110", website: "http://www.mps.gov.cn/" },
			{ name: "急救电话", number: "120", website: "http://www.120.gov.cn/" },
			{
				name: "道路交通事故报警台",
				number: "122",
				website: "http://www.mps.gov.cn/",
			},
			{
				name: "全国法律服务热线",
				number: "12348",
				website: "http://www.12348.gov.cn/",
			},
			{
				name: "全国铁路客服中心",
				number: "12306",
				website: "http://www.12306.cn/",
			},
			{
				name: "紧急呼叫中心",
				number: "112",
				website: "http://www.china-travel.com.cn/",
			},
			{
				name: "文化市场统一举报电话",
				number: "12318",
				website: "http://www.12318.gov.cn/",
			},
			{
				name: "水上遇险求救电话",
				number: "12395",
				website: "http://www.moc.gov.cn/",
			},
			{ name: "气象服务电话", number: "12121", website: "http://www.nmc.cn/" },
			{
				name: "报时服务电话",
				number: "12117",
				website: "http://www.ntsc.ac.cn/",
			},
		],
	},
	{
		key: "2",
		category: "全国国家机构监督、投诉、抢修、举报电话",
		numbers: [
			{
				name: "电力系统客服电话",
				number: "95598",
				website: "http://www.sgcc.com.cn/",
			},
			{
				name: "价格监督举报电话",
				number: "12358",
				website: "http://www.sac.gov.cn/",
			},
			{
				name: "质量监督电话",
				number: "12365",
				website: "http://www.cnca.gov.cn/",
			},
			{
				name: "环保局监督电话",
				number: "12369",
				website: "http://www.mee.gov.cn/",
			},
			{
				name: "政府公益服务接入网",
				number: "12345",
				website: "http://www.gov.cn/",
			},
			{
				name: "机构编制违规举报热线",
				number: "12310",
				website: "http://www.mia.gov.cn/",
			},
			{
				name: "民工维权热线电话",
				number: "12333",
				website: "http://www.mohrss.gov.cn/",
			},
			{
				name: "文化市场举报电话",
				number: "12318",
				website: "http://www.12318.gov.cn/",
			},
			{
				name: "消费者投诉举报专线电话",
				number: "12315",
				website: "http://www.12315.cn/",
			},
		],
	},
	{
		key: "3",
		category: "全国银行客户服务电话号码",
		numbers: [
			{
				name: "招商银行",
				number: "95555",
				website: "http://www.cmbchina.com/",
			},
			{ name: "农业银行", number: "95599", website: "http://www.abchina.com/" },
			{ name: "中国银行", number: "95566", website: "http://www.boc.cn/" },
			{ name: "工商银行", number: "95588", website: "http://www.icbc.com.cn/" },
			{
				name: "交通银行",
				number: "95559",
				website: "http://www.bankcomm.com/",
			},
			{ name: "建设银行", number: "95533", website: "http://www.ccb.com/" },
			{ name: "光大银行", number: "95595", website: "http://www.cebbank.com/" },
			{
				name: "中信银行",
				number: "95558",
				website: "http://www.citicbank.com/",
			},
			{ name: "兴业银行", number: "95561", website: "http://www.cib.com.cn/" },
			{ name: "浦发银行", number: "95528", website: "http://www.spdb.com.cn/" },
		],
	},
	{
		key: "4",
		category: "快递公司客服电话",
		numbers: [
			{ name: "申通快递", number: "95543", website: "http://www.sto.cn/" },
			{
				name: "顺丰速运",
				number: "95338",
				website: "http://www.sf-express.com/",
			},
			{ name: "圆通快递", number: "95554", website: "http://www.yto.net.cn/" },
			{ name: "中通快递", number: "95311", website: "http://www.zto.com/" },
			{ name: "德邦物流", number: "95353", website: "http://www.deppon.com/" },
			{
				name: "百世汇通",
				number: "4009565656",
				website: "http://www.800bestex.com/",
			},
			{
				name: "邮政特快专递",
				number: "11185",
				website: "http://www.ems.com.cn/",
			},
		],
	},
	{
		key: "5",
		category: "全国通信机构服务电话号码",
		numbers: [
			{
				name: "中国电信客户服务热线",
				number: "10000",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中国联通客服热线",
				number: "10010",
				website: "http://www.chinaunicom.com/",
			},
			{
				name: "中国移动客服热线",
				number: "10086",
				website: "http://www.chinamobileltd.com/",
			},
			{
				name: "中国电信IP电话卡",
				number: "17900",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中国联通IP号码",
				number: "17911",
				website: "http://www.chinaunicom.com/",
			},
			{
				name: "中国移动IP号码",
				number: "17951",
				website: "http://www.chinamobileltd.com/",
			},
			{
				name: "中国联通的“电话导航”业务",
				number: "116114",
				website: "http://www.chinaunicom.com/",
			},
			{
				name: "中国电信号码百事通",
				number: "118114",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "铁通客户服务",
				number: "10050",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中国垃圾短信投诉号码",
				number: "10086999",
				website: "http://www.chinatelecom.com.cn/",
			},
		],
	},
	{
		key: "6",
		category: "紧急救援电话",
		numbers: [
			{ name: "急救电话", number: "120", website: "http://www.120.gov.cn/" },
			{ name: "火警电话", number: "119", website: "http://www.119.gov.cn/" },
			{
				name: "水上救援电话",
				number: "12395",
				website: "http://www.moc.gov.cn/",
			},
			{
				name: "交通事故报警电话",
				number: "122",
				website: "http://www.mps.gov.cn/",
			},
			{
				name: "紧急呼叫中心",
				number: "112",
				website: "http://www.china-travel.com.cn/",
			},
		],
	},

	{
		key: "7",
		category: "保险公司客服电话",
		numbers: [
			{
				name: "中国人寿",
				number: "95519",
				website: "https://www.chinalife.com.cn/",
			},
			{ name: "平安保险", number: "95511", website: "https://www.pingan.com/" },
			{
				name: "太平洋保险",
				number: "95500",
				website: "https://www.cpic.com.cn/",
			},
			{
				name: "新华保险",
				number: "95567",
				website: "https://www.newchinalife.com/",
			},
			{ name: "人保财险", number: "95518", website: "https://www.picc.com/" },
		],
	},
	{
		key: "8",
		category: "健康服务热线",
		numbers: [
			{
				name: "国家健康热线",
				number: "12320",
				website: "http://www.12320.gov.cn/",
			},
			{
				name: "心理健康热线",
				number: "12355",
				website: "http://www.12355.com.cn/",
			},
			{
				name: "老年人健康咨询",
				number: "12349",
				website: "http://www.12349.cn/",
			},
			{
				name: "中医健康咨询",
				number: "12320",
				website: "http://www.12320.gov.cn/",
			},
			{
				name: "妇幼保健热线",
				number: "12344",
				website: "http://www.12344.cn/",
			},
		],
	},
	{
		key: "9",
		category: "儿童保护热线",
		numbers: [
			{
				name: "儿童紧急救助热线",
				number: "110",
				website: "https://www.npa.gov.cn/",
			},
			{
				name: "全国未成年人保护热线",
				number: "12355",
				website: "http://www.12355.com.cn/",
			},
			{
				name: "未成年人保护专家热线",
				number: "12315",
				website: "http://www.12315.cn/",
			},
		],
	},
	{
		key: "10",
		category: "环境保护电话",
		numbers: [
			{
				name: "环保举报电话",
				number: "12369",
				website: "http://www.12369.gov.cn/",
			},
			{
				name: "生态环境举报热线",
				number: "12300",
				website: "http://www.mee.gov.cn/",
			},
			{
				name: "野生动物保护举报热线",
				number: "12371",
				website: "http://www.forestry.gov.cn/",
			},
			{
				name: "大气污染投诉电话",
				number: "12365",
				website: "http://www.mee.gov.cn/",
			},
			{
				name: "水污染投诉电话",
				number: "12368",
				website: "http://www.mee.gov.cn/",
			},
		],
	},
	{
		key: "11",
		category: "交通服务电话号码",
		numbers: [
			{
				name: "高速公路服务热线",
				number: "12122",
				website: "http://www.china-highway.com/",
			},
			{
				name: "地铁咨询电话",
				number: "12345",
				website: "https://www.metrochina.com/",
			},
			{
				name: "铁路售票电话",
				number: "12306",
				website: "https://www.12306.cn/",
			},
			{
				name: "公共交通服务热线",
				number: "96220",
				website: "http://www.buscn.com/",
			},
			{
				name: "飞机航班服务电话",
				number: "95583",
				website: "https://www.china-airlines.com/",
			},
		],
	},
	{
		key: "12",
		category: "法律服务电话号码",
		numbers: [
			{
				name: "法律援助热线",
				number: "12348",
				website: "http://www.12348.gov.cn/",
			},
			{
				name: "法律咨询服务",
				number: "400-665-1818",
				website: "http://www.lawyer.com.cn/",
			},
			{
				name: "律师服务电话",
				number: "400-060-9056",
				website: "http://www.lawyer.com.cn/",
			},
			{
				name: "公安举报热线",
				number: "12389",
				website: "https://www.police.gov.cn/",
			},
			{
				name: "刑事案件举报电话",
				number: "12358",
				website: "http://www.ciic.cn/",
			},
		],
	},
	{
		key: "13",
		category: "全国交通管理服务热线",
		numbers: [
			{
				name: "全国交通违法举报",
				number: "12319",
				website: "http://www.12319.cn/",
			},
			{
				name: "交通事故处理咨询",
				number: "122",
				website: "http://www.mps.gov.cn/",
			},
			{
				name: "交通事故报警电话",
				number: "122",
				website: "http://www.mps.gov.cn/",
			},
			{
				name: "高速公路服务热线",
				number: "12122",
				website: "http://www.china-highway.com/",
			},
		],
	},
	{
		key: "15",
		category: "天气预报与灾害预警电话",
		numbers: [
			{
				name: "全国气象服务电话",
				number: "12121",
				website: "http://www.nmc.cn/",
			},
			{
				name: "台风预警电话",
				number: "12360",
				website: "http://www.typhoon.org.cn/",
			},
			{
				name: "天气预警电话",
				number: "12121",
				website: "http://www.nmc.cn/",
			},
			{
				name: "自然灾害报告电话",
				number: "12322",
				website: "http://www.scd.gov.cn/",
			},
		],
	},
	{
		key: "14",
		category: "全国医疗服务电话",
		numbers: [
			{
				name: "疾病预防控制中心",
				number: "12320",
				website: "http://www.chinacdc.cn/",
			},
			{
				name: "急诊救护中心",
				number: "120",
				website: "http://www.120.gov.cn/",
			},
			{
				name: "中国红十字会",
				number: "400-668-6000",
				website: "http://www.redcross.org.cn/",
			},
			{
				name: "医疗保险咨询",
				number: "12333",
				website: "http://www.nhsa.gov.cn/",
			},
		],
	},
	{
		key: "15",
		category: "全国消防服务电话",
		numbers: [
			{
				name: "火警电话",
				number: "119",
				website: "http://www.119.gov.cn/",
			},
			{
				name: "消防安全举报电话",
				number: "12345",
				website: "http://www.firechina.gov.cn/",
			},
			{
				name: "消防技术服务电话",
				number: "010-64366218",
				website: "http://www.mps.gov.cn/",
			},
		],
	},
	{
		key: "16",
		category: "全国居民生活服务电话",
		numbers: [
			{
				name: "生活垃圾分类咨询电话",
				number: "12319",
				website: "http://www.12319.gov.cn/",
			},
			{
				name: "水务热线",
				number: "12319",
				website: "http://www.waterchina.com/",
			},
			{
				name: "全国电力服务热线",
				number: "95598",
				website: "http://www.sgcc.com.cn/",
			},
			{
				name: "燃气安全热线",
				number: "12319",
				website: "http://www.china-gas.com/",
			},
		],
	},
	{
		key: "17",
		category: "全国消费者权益保护电话",
		numbers: [
			{
				name: "消费者投诉热线",
				number: "12315",
				website: "http://www.12315.cn/",
			},
			{
				name: "质量投诉电话",
				number: "12365",
				website: "http://www.cnca.gov.cn/",
			},
			{
				name: "食品安全投诉电话",
				number: "12331",
				website: "http://www.cfda.gov.cn/",
			},
		],
	},
	{
		key: "18",
		category: "全国邮政服务电话",
		numbers: [
			{
				name: "邮政快递服务电话",
				number: "11183",
				website: "http://www.ems.com.cn/",
			},
			{
				name: "邮政服务咨询电话",
				number: "11185",
				website: "http://www.china-post.com.cn/",
			},
			{
				name: "邮政储蓄银行电话",
				number: "95580",
				website: "http://www.psbc.com/",
			},
		],
	},
	{
		key: "19",
		category: "全国公路与交通安全热线",
		numbers: [
			{
				name: "公路交通安全咨询电话",
				number: "12328",
				website: "http://www.chinahighway.com/",
			},
			{
				name: "汽车保险热线",
				number: "95518",
				website: "http://www.picc.com.cn/",
			},
		],
	},
];

// Ant Design表格的列定义
const columns = [
	{
		title: "电话名称",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "电话号码",
		dataIndex: "number",
		key: "number",
	},
	{
		title: "电话官网",
		dataIndex: "website",
		key: "website",
	},
];

function Complain() {
	// 渲染表格的每一项
	const renderTableData = (data: any[]) =>
		data.map((item: any) => ({
			key: item.number,
			name: item.name,
			number: item.number,
			website: (
				<a href={item.website} target="_blank" rel="noreferrer">
					{item.website}
				</a>
			),
		}));

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
			{data.map((category) => (
				<Card key={category.key} className="mb-5 col-span-1">
					<Table
						title={() => (
							<div>
								{category.category} <span>({category.key})</span>
							</div>
						)}
						columns={columns}
						dataSource={renderTableData(category.numbers)}
						pagination={false}
						bordered
						size="middle"
						className="w-full h-full"
					/>
				</Card>
			))}
		</div>
	);
}

export default Complain;
