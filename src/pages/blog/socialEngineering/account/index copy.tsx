import { BlogApi } from "@/api";
import { isValidPlateNumber } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Spin, message, Select } from "antd";
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

	const [zeroData, setZeroData] = useState({
		/**
		 *  响应码
		 */
		status: 0,

		/**
		 *  绑定的QQ
		 */
		qq: "",

		/**
		 *  绑定的号码
		 */
		phone: "",
		/**
		 *  绑定的号码的地区
		 */
		phonediqu: "",
	});

	const items = {
		Category.QQ_QUERY_PHONE: [
			{
				label: "QQ号",
				children: zeroData.qq || "无",
				span: 3,
			},
			{
				label: "手机号",
				children: zeroData.phone || "无",
				span: 3,
			},
			{
				label: "手机号地区",
				children: zeroData.phonediqu || "无",
				span: 3,
			},
		],
	};

	const [category, setCategory] = useState([Category.QQ_QUERY_PHONE]);

	const categoryOptions = [
		{
			label: "QQ号查询绑定手机",
			value: [Category.QQ_QUERY_PHONE],
		},
		{
			label: "手机号查询绑定QQ",
			value: [Category.PHONE_QUERY_QQ],
		},
		{
			label: "QQ号查询LOL信息",
			value: [Category.QQ_QUERY_LOL],
		},
		{
			label: "LOL查询QQ信息",
			value: [Category.LOL_QUERY_QQ],
		},
		{
			label: "QQ号查询老密",
			value: [Category.QQ_QUERY_OLD_PASSWORD],
		},
		{
			label: "微博ID查询手机号",
			value: [Category.WEIBO_QUERY_PHONE],
		},
		{
			label: "手机号查询微博ID",
			value: [Category.PHONE_QUERY_WEIBO],
		},
	];

	// 0 : QQ  1:手机号 , 2,lolId 3:weiBoId
	const [inputType, setInputType] = useState<number>(0);

	/**
	 *  选择类别
	 */
	function handleCategoryChange(value: number) {
		setCategory(value);

		// qq号
		if (value === 0 || value === 2 || value === 4) {
			setInputType(0);
		}

		//  手机号
		if (value === 1 || value === 6) {
			setInputType(1);
		}

		// lolId
		if (value === 3) {
			setInputType(3);
		}

		// weiBoId
		if (value === 5) {
			setInputType(4);
		}
	}

	const [qq, setQq] = useState("1604705673");

	function handleQqChange(e: React.ChangeEvent<HTMLInputElement>) {
		setQq(e.target.value);
		setError("");
	}

	function handleClearQq() {
		setQq("");
		setError("");

		if (category === 0) {
			setZeroData({
				status: 0,
				qq: "",
				phone: "",
				phonediqu: "",
			});
		}
	}

	const [phone, setPhone] = useState("1604705673");

	const [lolId, setLolId] = useState(INITIALIZATION);

	const [weiBoId, setWeiBoId] = useState(INITIALIZATION);
	/**
	 * 检查并获取车牌数据
	 */
	const getData = useCallback(async () => {
		try {
			setLoading(true);

			// setData(res);
			if (category === 0) {
				const res = await BlogApi.getQqQueryPhone(qq);
				console.log("%c Line:55 🍞 res", "color:#b03734", res);
				setZeroData(res);
			}
		} catch (error: any) {
			console.log("%c Line:50 🥒 error", "color:#93c0a4", error);
			message.error(error.message || "获取数据失败，请稍后重试");
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, [category, qq]);

	/**
	 *  使用 ahooks 的节流
	 */
	const { run: throttledGetData } = useThrottleFn(
		() => {
			getData();
		},
		{
			wait: 1000,
			leading: false,
		},
	);

	return (
		<div className="p-4  flex flex-col relative">
			<Descriptions
				className="w-full h-full"
				labelStyle={{
					width: 160,
				}}
				bordered
				items={items[category]}
				title={
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
				}
				extra={
					<>
						{inputType === 0 && (
							<Input.Search
								className="!w-80"
								allowClear
								placeholder="请输入QQ号"
								value={qq}
								onChange={handleQqChange}
								onClear={handleClearQq}
								onPressEnter={throttledGetData}
								onSearch={throttledGetData}
								enterButton="搜索"
								loading={loading}
								disabled={loading}
								status={error ? "error" : ""}
							/>
						)}

						{inputType === 1 && (
							<Input.Search
								className="!w-80"
								allowClear
								placeholder="请输入手机号"
								value={licensePlateNumber}
								onChange={handleInputChange}
								onPressEnter={throttledGetData}
								onSearch={throttledGetData}
								onClear={handleClear}
								loading={loading}
								enterButton="搜索"
								disabled={loading}
								status={error ? "error" : ""}
							/>
						)}
						{inputType === 2 && (
							<Input.Search
								className="!w-80"
								allowClear
								placeholder="请输入LOL ID"
								value={licensePlateNumber}
								onChange={handleInputChange}
								onPressEnter={throttledGetData}
								onSearch={throttledGetData}
								onClear={handleClear}
								loading={loading}
								enterButton="搜索"
								disabled={loading}
								status={error ? "error" : ""}
							/>
						)}
						{inputType === 3 && (
							<Input.Search
								className="!w-80"
								allowClear
								placeholder="请输入微博ID"
								value={licensePlateNumber}
								onChange={handleInputChange}
								onPressEnter={throttledGetData}
								onSearch={throttledGetData}
								onClear={handleClear}
								loading={loading}
								enterButton="搜索"
								disabled={loading}
								status={error ? "error" : ""}
							/>
						)}
					</>
				}
			/>

			{/* 数据展示 */}
			{loading && (
				<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
					<Spin size="large" />
				</div>
			)}
		</div>
	);
}

export default Hok;
