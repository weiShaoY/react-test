import { BlogApi } from "@/api";
import Card from "@/components/card";
import { isValidQQ } from "@/utils";
import { useThrottleFn } from "ahooks";
import { Descriptions, Input, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "sonner";

/**
 *  分类
 */
enum Category {
	/**
	 *  QQ号查询
	 */
	QQ = 0,

	/**
	 *  手机号查询
	 */
	PHONE = 1,

	/**
	 *  LOL查询
	 */
	LOL = 2,

	/**
	 *  微博号查询
	 */
	WEIBO = 3,
}

function Account() {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [data, setData] = useState({
		[Category.QQ]: {
			/**
			 *  查询手机号
			 */
			phone: {
				/**
				 *  QQ号
				 */
				qq: "",

				/**
				 *  手机号
				 */
				phone: "",
				/**
				 *  手机号地区
				 */
				phonediqu: "",
			},

			/**
			 *  查询LOL
			 */
			lol: {
				/**
				 *  LOL名称
				 */
				name: "",
				/**
				 *  LOL所在大区
				 */
				daqu: "",
			},
			/**
			 *  查询QQ老密码
			 */
			oldPassword: {
				/**
				 *  QQ老密码
				 */
				qqlm: "",
			},
		},
		[Category.PHONE]: {
			qq: {
				/**
				 *  QQ号
				 */
				qq: "",

				/**
				 *  手机号
				 */
				phone: "",
				/**
				 *  手机号地区
				 */
				phonediqu: "",
			},
			weiBo: {
				/**
				 *  微博ID
				 */
				id: "",
			},
		},

		[Category.LOL]: {
			qq: {
				/**
				 *  QQ号
				 */
				qq: "",
				/**
				 *  LOL名称
				 */
				name: "",
				/**
				 *  LOL所在大区
				 */
				daqu: "",
			},
		},

		[Category.WEIBO]: {
			phone: {
				phone: "",
				phonediqu: "",
			},
		},
	});

	const items = {
		[Category.QQ]: [
			{
				label: "手机号",
				span: 3,
				children: data[Category.QQ].phone.phone,
			},
			{
				label: "手机号地区",
				span: 3,
				children: data[Category.QQ].phone.phonediqu,
			},
			{
				label: "LOL名称",
				span: 3,
				children: data[Category.QQ].lol.name,
			},
			{
				label: "LOL所在大区",
				span: 3,
				children: data[Category.QQ].lol.daqu,
			},
			{
				label: "QQ老密码",
				span: 3,
				children: data[Category.QQ].oldPassword.qqlm,
			},
		],
		[Category.PHONE]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.PHONE].qq.qq,
			},
			{
				label: "手机号地区",
				span: 3,
				children: data[Category.PHONE].qq.phonediqu,
			},
			{
				label: "微博ID",
				span: 3,
				children: data[Category.PHONE].weiBo.id,
			},
		],
		[Category.LOL]: [
			{
				label: "QQ号",
				span: 3,
				children: data[Category.LOL].qq.qq,
			},
			{
				label: "LOL名称",
				span: 3,
				children: data[Category.LOL].qq.name,
			},
			{
				label: "所在大区",
				span: 3,
				children: data[Category.LOL].qq.daqu,
			},
		],
		[Category.WEIBO]: [
			{
				label: "手机号",
				span: 3,
				children: data[Category.WEIBO].phone.phone,
			},
			{
				label: "手机号地区",
				span: 3,
				children: data[Category.WEIBO].phone.phonediqu,
			},
		],
	};

	const [category, setCategory] = useState(Category.QQ);

	const categoryOptions = [
		{ label: "QQ号查询", value: Category.QQ },
		{ label: "手机号查询", value: Category.PHONE },
		{ label: "LOL查询", value: Category.LOL },
		{ label: "微博ID查询", value: Category.WEIBO },
	];
	// 0 : QQ  1:手机号 , 2,lolId 3:weiBoId
	const [inputType, setInputType] = useState<number>(0);

	/**
	 *  选择类别
	 */
	function handleCategoryChange(value: number) {
		setCategory(value);

		// qq号
		if (value === Category.QQ) {
			setInputType(Category.QQ);
		}

		//  手机号
		if (value === Category.PHONE) {
			setInputType(Category.PHONE);
		}

		// lolId
		if (value === Category.LOL) {
			setInputType(Category.LOL);
		}

		// weiBoId
		if (value === Category.WEIBO) {
			setInputType(Category.WEIBO);
		}
	}

	const [qq, setQq] = useState("");

	const [phone, setPhone] = useState("");

	//  中路杀神
	const [lol, setLol] = useState("");

	//  6269902085
	const [weiBoId, setWeiBoId] = useState("");

	/**
	 * 检查并获取车牌数据
	 */
	async function getData() {
		try {
			if (category === Category.QQ && !isValidQQ(qq)) {
				throw new Error("请输入正确的QQ号");
			}

			setLoading(true);

			// QQ号
			if (category === Category.QQ) {
				const res_phone = await BlogApi.getQqQueryPhone(qq);

				const res_lol = await BlogApi.getQqQueryLol(qq);

				const res_oldPassword = await BlogApi.getQqQueryOldPassword(qq);

				setData({
					...data,
					[Category.QQ]: {
						...data[Category.QQ],
						phone: res_phone,
						lol: res_lol,
						oldPassword: res_oldPassword,
					},
				});
			}
			//  手机号
			else if (category === Category.PHONE) {
				const res_qq = await BlogApi.getPhoneQueryQq(phone);
				const res_weiBo = await BlogApi.getPhoneQueryWeiBo(phone);

				setData({
					...data,
					[Category.PHONE]: {
						...data[Category.PHONE],
						qq: res_qq,
						weiBo: res_weiBo,
					},
				});
			}
			//  LOL
			else if (category === Category.LOL) {
				const res_qq = await BlogApi.getLolQueryQq(lol);
				setData({
					...data,
					[Category.LOL]: {
						...data[Category.LOL],
						qq: res_qq,
					},
				});
			}
			//  微博
			else if (category === Category.WEIBO) {
				const res_phone = await BlogApi.getWeiBoIdQueryPhone(weiBoId);
				setData({
					...data,
					[Category.WEIBO]: {
						...data[Category.WEIBO],
						phone: res_phone,
					},
				});
			}
		} catch (error: any) {
			toast.error(error.message || "获取数据失败，请稍后重试");
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
			getData();
		},
		{
			wait: 1000,
			leading: false,
		},
	);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (category === Category.QQ) {
			setQq(e.target.value.trim());
		} else if (category === Category.PHONE) {
			setPhone(e.target.value.trim());
		} else if (category === Category.LOL) {
			setLol(e.target.value.trim());
		} else if (category === Category.WEIBO) {
			setWeiBoId(e.target.value.trim());
		}
		if (error) {
			setError("");
		}
	}

	/**
	 *  搜索
	 */
	function handleInputSearch(info?: { source?: "input" | "clear" }) {
		if (info && info.source === "clear") {
			setQq("");

			setPhone("");

			setLol("");

			setWeiBoId("");

			setError("");

			setData({
				[Category.QQ]: {
					phone: {
						qq: "",

						phone: "",

						phonediqu: "",
					},

					lol: {
						name: "",

						daqu: "",
					},

					oldPassword: {
						qqlm: "",
					},
				},
				[Category.PHONE]: {
					qq: {
						qq: "",

						phone: "",

						phonediqu: "",
					},
					weiBo: {
						id: "",
					},
				},

				[Category.LOL]: {
					qq: {
						qq: "",

						name: "",

						daqu: "",
					},
				},

				[Category.WEIBO]: {
					phone: {
						phone: "",
						phonediqu: "",
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
				<Select
					className="w-48"
					showSearch
					placeholder="请选择视频类别"
					value={category}
					onChange={(value) => {
						handleCategoryChange(value);
					}}
					options={categoryOptions}
				/>

				<div className="flex-1 flex items-center gap-2 flex-wrap">
					<>
						{inputType === Category.QQ && (
							<Input.Search
								className="!w-60"
								loading={loading}
								disabled={loading}
								value={qq}
								onChange={handleInputChange}
								onSearch={(_, __, info) => handleInputSearch(info)}
								placeholder="请输入QQ号"
								allowClear
								status={error ? "error" : ""}
								enterButton="搜索"
							/>
						)}

						{inputType === Category.PHONE && (
							<Input.Search
								className="!w-60"
								loading={loading}
								disabled={loading}
								value={phone}
								onChange={handleInputChange}
								onSearch={(_, __, info) => handleInputSearch(info)}
								placeholder="请输入手机号"
								allowClear
								status={error ? "error" : ""}
								enterButton="搜索"
							/>
						)}

						{inputType === Category.LOL && (
							<Input.Search
								className="!w-60"
								loading={loading}
								disabled={loading}
								value={lol}
								onChange={handleInputChange}
								onSearch={(_, __, info) => handleInputSearch(info)}
								placeholder="请输入LOL名称"
								allowClear
								status={error ? "error" : ""}
								enterButton="搜索"
							/>
						)}
						{inputType === Category.WEIBO && (
							<Input.Search
								className="!w-60"
								loading={loading}
								disabled={loading}
								value={weiBoId}
								onChange={handleInputChange}
								onSearch={(_, __, info) => handleInputSearch(info)}
								placeholder="请输入微博ID"
								allowClear
								status={error ? "error" : ""}
								enterButton="搜索"
							/>
						)}
					</>

					<div className="flex items-center">
						{error && <span className="text-red ">{error}</span>}
					</div>
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
					items={items[category]}
				/>
			</div>
		</Card>
	);
}

export default Account;
