import { BlogApi } from "@/api";
import { isValidQQ } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Select, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const INITIALIZATION = "1185314934";

enum Category {
	/**
	 *  QQ号查询绑定手机
	 */
	QQ_QUERY_PHONE = 0,

	/**
	 *  手机号查询绑定QQ
	 */
	PHONE_QUERY_QQ = 1,

	/**
	 *  QQ号查询LOL信息
	 */
	QQ_QUERY_LOL = 2,

	/**
	 *  LOL查询QQ信息
	 */
	LOL_QUERY_QQ = 3,

	/**
	 *  QQ号查询老密
	 */
	QQ_QUERY_OLD_PASSWORD = 4,

	/**
	 *  微博号查询手机号
	 */
	WEIBO_QUERY_PHONE = 5,

	/**
	 *  手机号查询微博
	 */
	PHONE_QUERY_WEIBO = 6,
}

function Hok() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [data, setData] = useState({
		[Category.QQ_QUERY_PHONE]: {
			/**
			 *  QQ号
			 */
			qq: "",

			/**
			 *  手机号
			 */
			phone: "",
			/**
			 *  手机号的地区
			 */
			phonediqu: "",
		},
		[Category.PHONE_QUERY_QQ]: { phone: "", qq: "", phonediqu: "" },
		[Category.QQ_QUERY_LOL]: { qq: "", name: "", daqu: "" },

		[Category.LOL_QUERY_QQ]: { qq: "", name: "", daqu: "" },

		[Category.QQ_QUERY_OLD_PASSWORD]: { qq: "", qqlm: "" },

		[Category.WEIBO_QUERY_PHONE]: { weiboId: "", phone: "" },
		[Category.PHONE_QUERY_WEIBO]: { phone: "", weiboId: "" },
	});

	const items = {
		[Category.QQ_QUERY_PHONE]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.QQ_QUERY_PHONE].qq,
			},
			{
				label: "手机号",
				span: 3,
				children: data[Category.QQ_QUERY_PHONE].phone,
			},
			{
				label: "手机号的地区",
				span: 3,
				children: data[Category.QQ_QUERY_PHONE].phonediqu,
			},
		],
		[Category.PHONE_QUERY_QQ]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.QQ_QUERY_PHONE].qq,
			},
			{
				label: "手机号",
				span: 3,
				children: data[Category.QQ_QUERY_PHONE].phone,
			},
			{
				label: "手机号的地区",
				span: 3,
				children: data[Category.QQ_QUERY_PHONE].phonediqu,
			},
		],
		[Category.QQ_QUERY_LOL]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.QQ_QUERY_LOL].qq,
			},
			{
				label: "名称",
				span: 3,
				children: data[Category.QQ_QUERY_LOL].name,
			},
			{
				label: "所在大区",
				span: 3,
				children: data[Category.QQ_QUERY_LOL].daqu,
			},
		],
		[Category.LOL_QUERY_QQ]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.LOL_QUERY_QQ].qq,
			},
			{
				label: "名称",
				span: 3,
				children: data[Category.LOL_QUERY_QQ].name,
			},
			{
				label: "所在大区",
				span: 3,
				children: data[Category.LOL_QUERY_QQ].daqu,
			},
		],
		[Category.QQ_QUERY_OLD_PASSWORD]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.QQ_QUERY_OLD_PASSWORD].qq,
			},
			{
				label: "密码",
				span: 3,
				children: data[Category.QQ_QUERY_OLD_PASSWORD].qqlm,
			},
		],
		[Category.WEIBO_QUERY_PHONE]: [],
		[Category.PHONE_QUERY_WEIBO]: [],
	};
	const [category, setCategory] = useState(Category.QQ_QUERY_PHONE);

	const categoryOptions = [
		{ label: "QQ号查询绑定手机", value: Category.QQ_QUERY_PHONE },
		{ label: "手机号查询绑定QQ", value: Category.PHONE_QUERY_QQ },
		{ label: "QQ号查询LOL信息", value: Category.QQ_QUERY_LOL },
		{ label: "LOL查询QQ信息", value: Category.LOL_QUERY_QQ },
		{ label: "QQ号查询老密", value: Category.QQ_QUERY_OLD_PASSWORD },
		{ label: "微博ID查询手机号", value: Category.WEIBO_QUERY_PHONE },
		{ label: "手机号查询微博ID", value: Category.PHONE_QUERY_WEIBO },
	];
	// 0 : QQ  1:手机号 , 2,lolId 3:weiBoId
	const [inputType, setInputType] = useState<number>(0);

	const inputTypeMap: { [key in Category]: string } = {
		[Category.QQ_QUERY_PHONE]: "QQ号",
		[Category.PHONE_QUERY_QQ]: "手机号",
		[Category.QQ_QUERY_LOL]: "LOL ID",
		[Category.LOL_QUERY_QQ]: "LOL查询QQ",
		[Category.QQ_QUERY_OLD_PASSWORD]: "QQ号查询老密",
		[Category.WEIBO_QUERY_PHONE]: "微博ID",
		[Category.PHONE_QUERY_WEIBO]: "手机号查询微博",
	};

	/**
	 *  选择类别
	 */
	function handleCategoryChange(value: number) {
		setCategory(value);

		// qq号
		if (
			value === Category.QQ_QUERY_PHONE ||
			value === Category.QQ_QUERY_LOL ||
			value === Category.QQ_QUERY_OLD_PASSWORD
		) {
			setInputType(0);
		}

		//  手机号
		if (
			value === Category.PHONE_QUERY_QQ ||
			value === Category.PHONE_QUERY_WEIBO
		) {
			setInputType(1);
		}

		// lolId
		if (value === Category.LOL_QUERY_QQ) {
			setInputType(2);
		}

		// weiBoId
		if (value === Category.WEIBO_QUERY_PHONE) {
			setInputType(3);
		}
	}

	const [qq, setQq] = useState("38199238");

	const [phone, setPhone] = useState("18573841819");

	const [lolName, setLolName] = useState("中路杀神");

	const [weiBoId, setWeiBoId] = useState(INITIALIZATION);

	/**
	 * 检查并获取车牌数据
	 */
	async function getData() {
		if (category === Category.QQ_QUERY_PHONE && !isValidQQ(qq)) {
			message.error("请输入正确的QQ号");
		}

		try {
			setLoading(true);
			let res = {} as any;
			if (category === Category.QQ_QUERY_PHONE) {
				res = await BlogApi.getQqQueryPhone(qq);
			} else if (category === Category.PHONE_QUERY_QQ) {
				res = await BlogApi.getPhoneQueryQq(phone);
			} else if (category === Category.QQ_QUERY_LOL) {
				res = await BlogApi.getQqQueryLol(qq);
			} else if (category === Category.LOL_QUERY_QQ) {
				res = await BlogApi.getLolQueryQq(lolName);
			} else if (category === Category.QQ_QUERY_OLD_PASSWORD) {
				res = await BlogApi.getQqQueryOldPassword(qq);
				console.log("%c Line:201 🍫 res", "color:#f5ce50", res);
			}

			setData({
				...data,
				[category]: res,
			});
		} catch (error: any) {
			message.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (category === Category.QQ_QUERY_PHONE) {
			setQq(e.target.value);
		} else if (category === Category.PHONE_QUERY_QQ) {
			setPhone(e.target.value);
		} else if (category === Category.QQ_QUERY_LOL) {
			setQq(e.target.value);
		} else if (category === Category.LOL_QUERY_QQ) {
			setLolName(e.target.value);
		} else if (category === Category.QQ_QUERY_OLD_PASSWORD) {
			setQq(e.target.value);
		}

		if (error) {
			setError("");
		}
	}

	function handleClear() {
		// if (category === Category.QQ_QUERY_PHONE) {
		// 	console.log("%c Line:229 🥐 qq", "color:#ed9ec7", qq);
		// 	setData({
		// 		...data,
		// 		[Category.QQ_QUERY_PHONE]: {
		// 			qq: "",
		// 			phone: "",
		// 			phonediqu: "",
		// 		},
		// 	});
		// } else if (category === Category.PHONE_QUERY_QQ) {
		// 	setData({
		// 		...data,
		// 		[Category.PHONE_QUERY_QQ]: {
		// 			qq: "",
		// 			phone: "",
		// 			phonediqu: "",
		// 		},
		// 	});
		// }
		// setLoading(false);
	}
	return (
		<div className="p-4  flex flex-col relative">
			<div className="">
				<Select
					className="w-52"
					showSearch
					allowClear
					placeholder="请选择视频类别"
					value={category}
					onChange={(value) => {
						handleCategoryChange(value);
					}}
					options={categoryOptions}
				/>

				<>
					{inputType === 0 && (
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入QQ号"
							value={qq}
							onChange={handleChange}
							onClear={handleClear}
							onPressEnter={getData}
							onSearch={getData}
							enterButton="搜索"
							status={error ? "error" : ""}
						/>
					)}

					{inputType === 1 && (
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入手机号"
							value={phone}
							onChange={handleChange}
							onClear={handleClear}
							onPressEnter={getData}
							onSearch={getData}
							enterButton="搜索"
							loading={loading}
							disabled={loading}
							status={error ? "error" : ""}
						/>
					)}
					{inputType === 2 && (
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入LOL 名称"
							value={lolName}
							onChange={handleChange}
							onClear={handleClear}
							onPressEnter={getData}
							onSearch={getData}
							enterButton="搜索"
							loading={loading}
							disabled={loading}
							status={error ? "error" : ""}
						/>
					)}
					{inputType === 3 && (
						<Input.Search
							className="!w-80"
							allowClear
							placeholder="请输入微博ID"
							value={weiBoId}
							onChange={handleChange}
							onClear={handleClear}
							onPressEnter={getData}
							onSearch={getData}
							enterButton="搜索"
							loading={loading}
							disabled={loading}
							status={error ? "error" : ""}
						/>
					)}
				</>
			</div>

			<div className="flex-1 mt-5">
				<Descriptions
					labelStyle={{
						width: 160,
					}}
					bordered
					items={items[category]}
				/>

				{/* 数据展示 */}
				{loading && (
					<div className="absolute inset-0 flex justify-center items-center  z-10">
						<Spin size="large" />
					</div>
				)}
			</div>
		</div>
	);
}

export default Hok;
