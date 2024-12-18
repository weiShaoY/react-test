import { Table } from "antd";
import Card from "@/components/card";

// 数据列表
const data = [
	{
		key: "1",
		category: "紧急服务电话",
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
		category: "政府监管与投诉电话",
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
		category: "银行客户服务电话",
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
		category: "通信服务电话号码",
		numbers: [
			{
				name: "中国电信客服热线",
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
				name: "中国移动投诉电话",
				number: "4400111086",
				website: "http://www.chinamobileltd.com/",
			},
			{
				name: "中国联通投诉电话",
				number: "440017910",
				website: "http://www.chinaunicom.com/",
			},
			{
				name: "中国电信投诉电话",
				number: "440017900",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中国垃圾短信投诉号码",
				number: "10086999",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中国电信服务质量监督热线",
				number: "10080",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中国电信网络诈骗举报电话",
				number: "12369",
				website: "http://www.chinatelecom.com.cn/",
			},
			{
				name: "中华人民共和国工业和信息化部服务电话",
				number: "12381",
				website: "https://www.chinatelecom.com.cn/",
			},
		],
	},
	{
		key: "6",
		category: "保险公司客服电话",
		numbers: [
			{ name: "平安保险", number: "95511", website: "https://www.pingan.com/" },
			{
				name: "中国人寿",
				number: "95519",
				website: "https://www.chinalife.com.cn/",
			},
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
			{ name: "国寿财险", number: "12360", website: "https://www.gsxc.com/" },
			{
				name: "华泰保险",
				number: "12368",
				website: "https://www.hualicai.com/",
			},
			{ name: "国寿康泰", number: "12368", website: "https://www.gsxt.cn/" },
		],
	},
	{
		key: "7",
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
		key: "8",
		category: "环境保护热线",
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
		key: "9",
		category: "交通服务电话",
		numbers: [
			{
				name: "高速公路服务热线",
				number: "12122",
				website: "http://www .12122.gov.cn/",
			},
			{
				name: "出租车投诉电话",
				number: "12328",
				website: "http://www.mot.gov.cn/",
			},
			{
				name: "公共交通服务",
				number: "12319",
				website: "http://www.cntrc.org.cn/",
			},
			{
				name: "航空公司客户服务热线",
				number: "95338",
				website: "http://www.airchina.com.cn/",
			},
			{
				name: "铁路客户服务",
				number: "12306",
				website: "http://www.12306.cn/",
			},
			{
				name: "交通运输部交通安全热线",
				number: "12328",
				website: "http://www.mot.gov.cn/",
			},
			{
				name: "交通管理部门电话",
				number: "122",
				website: "http://www.mps.gov.cn/",
			},
		],
	},
	{
		key: "10",
		category: "健康医疗热线",
		numbers: [
			{
				name: "国家卫生健康委员会",
				number: "12320",
				website: "http://www.nhc.gov.cn/",
			},
			{
				name: "疾病预防控制中心",
				number: "12320",
				website: "http://www.chinacdc.cn/",
			},
			{
				name: "全国心理援助热线",
				number: "12355",
				website: "http://www.12355.com.cn/",
			},
			{
				name: "中国红十字会",
				number: "12333",
				website: "http://www.redcross.org.cn/",
			},
			{
				name: "全国计生热线",
				number: "12356",
				website: "http://www.npf.org.cn/",
			},
			{
				name: "老年人健康热线",
				number: "12349",
				website: "http://www.12349.com.cn/",
			},
			{
				name: "公共卫生服务中心",
				number: "12320",
				website: "http://www.chinacdc.cn/",
			},
		],
	},
	{
		key: "11",
		category: "金融监管与举报热线",
		numbers: [
			{
				name: "中国银监会",
				number: "12378",
				website: "http://www.cbrc.gov.cn/",
			},
			{
				name: "中国证监会",
				number: "12386",
				website: "http://www.csrc.gov.cn/",
			},
			{
				name: "中国人民银行",
				number: "95566",
				website: "http://www.pbc.gov.cn/",
			},
			{
				name: "金融消费者权益保护热线",
				number: "12345",
				website: "http://www.gov.cn/",
			},
		],
	},
	{
		key: "12",
		category: "食品安全与举报热线",
		numbers: [
			{
				name: "食品安全举报热线",
				number: "12331",
				website: "http://www.sfda.gov.cn/",
			},
			{
				name: "国家市场监管总局",
				number: "12315",
				website: "http://www.samr.gov.cn/",
			},
			{
				name: "质量检验举报热线",
				number: "12365",
				website: "http://www.cnca.gov.cn/",
			},
		],
	},
	{
		key: "13",
		category: "消费者权益保护",
		numbers: [
			{
				name: "消费者投诉电话",
				number: "12315",
				website: "http://www.12315.cn/",
			},
			{
				name: "全国知识产权保护电话",
				number: "12330",
				website: "http://www.sipo.gov.cn/",
			},
			{
				name: "全国广告投诉电话",
				number: "12316",
				website: "http://www.samr.gov.cn/",
			},
			{
				name: "中国消费者协会",
				number: "010-59799616",
				website: "http://www.cca.org.cn/",
			},
		],
	},
	{
		key: "14",
		category: "紧急救援与灾难响应",
		numbers: [
			{
				name: "地震应急救援",
				number: "12122",
				website: "http://www.cenc.ac.cn/",
			},
			{
				name: "灾害紧急响应",
				number: "12398",
				website: "http://www.ndrc.gov.cn/",
			},
			{
				name: "洪水灾害紧急热线",
				number: "12304",
				website: "http://www.mwr.gov.cn/",
			},
		],
	},
	{
		key: "15",
		category: "网络安全与举报热线",
		numbers: [
			{
				name: "全国网络举报热线",
				number: "12377",
				website: "http://www.cyberpolice.cn/",
			},
			{ name: "反诈骗热线", number: "12321", website: "http://www.12321.cn/" },
			{
				name: "国家互联网信息办公室",
				number: "12377",
				website: "http://www.cac.gov.cn/",
			},
		],
	},
	{
		key: "16",
		category: "环境保护与公益举报",
		numbers: [
			{
				name: "环保举报电话",
				number: "12369",
				website: "http://www.mee.gov.cn/",
			},
			{
				name: "生态环境保护热线",
				number: "12300",
				website: "http://www.mee.gov.cn/",
			},
			{
				name: "公益服务投诉热线",
				number: "12370",
				website: "http://www.ngo.cn/",
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
