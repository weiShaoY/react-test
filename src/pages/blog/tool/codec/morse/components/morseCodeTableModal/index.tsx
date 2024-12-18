import { Table, Modal } from "antd";
import type { TableProps } from "antd";

// 定义摩斯电码数据
const morseCodeData = [
	{ key: 0, char: "A", code: ".-" },
	{ key: 1, char: "B", code: "-..." },
	{ key: 2, char: "C", code: "-.-." },
	{ key: 3, char: "D", code: "-.." },
	{ key: 4, char: "E", code: "." },
	{ key: 5, char: "F", code: "..-." },
	{ key: 6, char: "G", code: "--." },
	{ key: 7, char: "H", code: "...." },
	{ key: 8, char: "I", code: ".." },
	{ key: 9, char: "J", code: ".---" },
	{ key: 10, char: "K", code: "-.-" },
	{ key: 11, char: "L", code: ".-.." },
	{ key: 12, char: "M", code: "--" },
	{ key: 13, char: "N", code: "-." },
	{ key: 14, char: "O", code: "---" },
	{ key: 15, char: "P", code: ".--." },
	{ key: 16, char: "Q", code: "--.-" },
	{ key: 17, char: "R", code: ".-." },
	{ key: 18, char: "S", code: "..." },
	{ key: 19, char: "T", code: "-" },
	{ key: 20, char: "U", code: "..-" },
	{ key: 21, char: "V", code: "...-" },
	{ key: 22, char: "W", code: ".--" },
	{ key: 23, char: "X", code: "-..-" },
	{ key: 24, char: "Y", code: "-.--" },
	{ key: 25, char: "Z", code: "--.." },
	{ key: 26, char: "1", code: ".----" },
	{ key: 27, char: "2", code: "..---" },
	{ key: 28, char: "3", code: "...--" },
	{ key: 29, char: "4", code: "....-" },
	{ key: 30, char: "5", code: "....." },
	{ key: 31, char: "6", code: "-...." },
	{ key: 32, char: "7", code: "--..." },
	{ key: 33, char: "8", code: "---.." },
	{ key: 34, char: "9", code: "----." },
	{ key: 35, char: "0", code: "-----" },
];

// 定义列配置
const columns: TableProps<any>["columns"] = [
	{
		title: "字符",
		dataIndex: "char",
		key: "char",
		align: "center",
	},
	{
		title: "摩斯电码",
		dataIndex: "code",
		key: "code",
		align: "center",
	},
];

/**
 * MorseCodeTable 组件 - 显示摩斯电码表
 * @param {Object} props
 * @param {boolean} props.isOpen - 弹窗是否打开
 * @param {Function} props.onClose - 关闭弹窗的回调函数
 */
function MorseCodeTableModal({
	isOpen,
	onClose,
}: { isOpen: boolean; onClose: () => void }) {
	return (
		<Modal
			title="摩斯密码表"
			open={isOpen}
			onCancel={onClose}
			width="60vw"
			footer={null}
		>
			<Table
				dataSource={morseCodeData}
				columns={columns}
				bordered
				pagination={false}
				scroll={{ y: "60vh" }}
			/>
		</Modal>
	);
}

export default MorseCodeTableModal;
