import { Select } from "antd";
import { useState, useEffect, useCallback } from "react";
import { optionData } from "./data";
import { BlogApi } from "@/api";
import { toast } from "sonner";

/**
 *  省份选择框的选项
 */
const provinceSelectOptions = optionData.map((region) => ({
	value: region.code,
	label: region.name,
}));

/**
 *  根据省份获取对应城市选项
 */
const citySelectOptions = optionData.reduce(
	(acc, region) => {
		acc[region.code] = region.children.map((city) => ({
			value: city.code,
			label: city.city,
		}));
		return acc;
	},
	{} as Record<string, { value: string; label: string }[]>,
);

function Weather() {
	const [loading, setLoading] = useState(false);

	const [state, setState] = useState({
		province: "AHN",
		city: "zOenJ",
	});

	const [citiesForSelectedProvince, setCitiesForSelectedProvince] = useState<
		{
			value: string;
			label: string;
		}[]
	>(citySelectOptions[state.province] || []);

	// 初始化默认省份和城市
	useEffect(() => {
		setCitiesForSelectedProvince(citySelectOptions[state.province]);
	}, [state.province]);

	/**
	 *  获取数据逻辑
	 */
	const getData = useCallback(async () => {
		try {
			setLoading(true);

			const response = await BlogApi.getWeather(state.city);
			console.log("%c Line:63 🥑 response", "color:#7f2b82", response);
		} catch (error) {
			toast.error(error.message || "获取数据失败，请稍后重试");
		} finally {
			setLoading(false);
		}
	}, [state.city]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<div className="h-full relative flex flex-col">
			<div className="flex items-center m-5 gap-5">
				{/* 省份选择框 */}
				<Select
					className="!w-44"
					showSearch
					placeholder="请选择省"
					value={state.province}
					onChange={(province) => {
						const firstCity = citySelectOptions[province]?.[0]?.value || "";
						setState({
							province,
							city: firstCity,
						});
					}}
					options={provinceSelectOptions}
				/>

				{/* 城市选择框 */}
				<Select
					className="!w-44"
					showSearch
					placeholder="请选择市"
					value={state.city}
					onChange={(city) => setState((prevState) => ({ ...prevState, city }))}
					options={citiesForSelectedProvince}
					disabled={!state.province} // 禁用逻辑
				/>
			</div>

			<div className="relative">
				当前选择：
				{state.province && <span>省份：{state.province}</span>}
				{state.city && <span>，城市：{state.city}</span>}
			</div>
		</div>
	);
}

export default Weather;
