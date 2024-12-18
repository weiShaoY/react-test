import { Table, Modal } from "antd";
import type { TableProps } from "antd";

// 定义 Base64 数据
const base64Data = [
	{
		key: 0,
		code1: "0",
		char1: "A",
		code2: "16",
		char2: "Q",
		code3: "32",
		char3: "g",
		code4: "48",
		char4: "w",
	},
	{
		key: 1,
		code1: "1",
		char1: "B",
		code2: "17",
		char2: "R",
		code3: "33",
		char3: "h",
		code4: "49",
		char4: "x",
	},
	{
		key: 2,
		code1: "2",
		char1: "C",
		code2: "18",
		char2: "S",
		code3: "34",
		char3: "i",
		code4: "50",
		char4: "y",
	},
	{
		key: 3,
		code1: "3",
		char1: "D",
		code2: "19",
		char2: "T",
		code3: "35",
		char3: "j",
		code4: "51",
		char4: "z",
	},
	{
		key: 4,
		code1: "4",
		char1: "E",
		code2: "20",
		char2: "U",
		code3: "36",
		char3: "k",
		code4: "52",
		char4: "0",
	},
	{
		key: 5,
		code1: "5",
		char1: "F",
		code2: "21",
		char2: "V",
		code3: "37",
		char3: "l",
		code4: "53",
		char4: "1",
	},
	{
		key: 6,
		code1: "6",
		char1: "G",
		code2: "22",
		char2: "W",
		code3: "38",
		char3: "m",
		code4: "54",
		char4: "2",
	},
	{
		key: 7,
		code1: "7",
		char1: "H",
		code2: "23",
		char2: "X",
		code3: "39",
		char3: "n",
		code4: "55",
		char4: "3",
	},
	{
		key: 8,
		code1: "8",
		char1: "I",
		code2: "24",
		char2: "Y",
		code3: "40",
		char3: "o",
		code4: "56",
		char4: "4",
	},
	{
		key: 9,
		code1: "9",
		char1: "J",
		code2: "25",
		char2: "Z",
		code3: "41",
		char3: "p",
		code4: "57",
		char4: "5",
	},
	{
		key: 10,
		code1: "10",
		char1: "K",
		code2: "26",
		char2: "a",
		code3: "42",
		char3: "q",
		code4: "58",
		char4: "6",
	},
	{
		key: 11,
		code1: "11",
		char1: "L",
		code2: "27",
		char2: "b",
		code3: "43",
		char3: "r",
		code4: "59",
		char4: "7",
	},
	{
		key: 12,
		code1: "12",
		char1: "M",
		code2: "28",
		char2: "c",
		code3: "44",
		char3: "s",
		code4: "60",
		char4: "8",
	},
	{
		key: 13,
		code1: "13",
		char1: "N",
		code2: "29",
		char2: "d",
		code3: "45",
		char3: "t",
		code4: "61",
		char4: "9",
	},
	{
		key: 14,
		code1: "14",
		char1: "O",
		code2: "30",
		char2: "e",
		code3: "46",
		char3: "u",
		code4: "62",
		char4: "+",
	},
	{
		key: 15,
		code1: "15",
		char1: "P",
		code2: "31",
		char2: "f",
		code3: "47",
		char3: "v",
		code4: "63",
		char4: "/",
	},
];

// 定义列配置
const columns: TableProps<any>["columns"] = [
	{
		title: "码值",
		dataIndex: "code1",
		key: "code1",
		align: "center",
	},
	{
		title: "字符",
		dataIndex: "char1",
		key: "char1",
		align: "center",
	},
	{
		title: "码值",
		dataIndex: "code2",
		key: "code2",
		align: "center",
	},
	{
		title: "字符",
		dataIndex: "char2",
		key: "char2",
		align: "center",
	},
	{
		title: "码值",
		dataIndex: "code3",
		key: "code3",
		align: "center",
	},
	{
		title: "字符",
		dataIndex: "char3",
		key: "char3",
		align: "center",
	},
	{
		title: "码值",
		dataIndex: "code4",
		key: "code4",
		align: "center",
	},
	{
		title: "字符",
		dataIndex: "char4",
		key: "char4",
		align: "center",
	},
];

function Base64TableModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	return (
		<Modal
			title="Base64编码表"
			open={isOpen}
			onCancel={onClose}
			width="80vw"
			footer={null}
		>
			<Table
				dataSource={base64Data}
				columns={columns}
				bordered
				pagination={false}
				scroll={{ y: "60vh" }}
			/>
		</Modal>
	);
}

export default Base64TableModal;
