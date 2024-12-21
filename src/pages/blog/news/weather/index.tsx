import { Select, Spin } from "antd";
import { useState, useEffect, useCallback } from "react";
import { optionData } from "./data";
import { BlogApi } from "@/api";
import { toast } from "sonner";
import Card from "@/components/card";
import Climate from "./components/climate";
import PassedChart from "./components/passedChart";
import Tempchart from "./components/tempchart";
import Meter from "./components/meter";
import type { WeatherType } from "./type";
import { Tabs } from "antd";

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

	const [data, setData] = useState<WeatherType>({
		real: {
			station: {
				code: "defaultCode",
				province: "defaultProvince",
				city: "defaultCity",
				url: "http://default.url",
			},
			publish_time: "2024-01-01T00:00:00Z",
			weather: {
				temperature: 0,
				temperatureDiff: 0,
				airpressure: 1013,
				humidity: 50,
				rain: 0,
				rcomfort: 0,
				icomfort: 0,
				info: "Clear",
				img: "01",
				feelst: 20,
			},
			wind: {
				direct: "North",
				degree: 0,
				power: "1级",
				speed: 0,
			},
			warn: {
				alert: "No warnings",
				pic: "",
				province: "",
				city: "",
				url: "",
				issuecontent: "",
				fmeans: "",
				signaltype: "",
				signallevel: "",
				pic2: "",
			},
			sunriseSunset: {
				sunrise: "06:00",
				sunset: "18:00",
			},
		},
		predict: {
			station: {
				code: "defaultCode",
				province: "defaultProvince",
				city: "defaultCity",
				url: "http://default.url",
			},
			publish_time: "2024-01-01T00:00:00Z",
			detail: [
				{
					date: "",
					pt: "",
					day: {
						weather: {
							info: "Clear",
							img: "01",
							temperature: "20",
						},
						wind: {
							direct: "North",
							power: "1级",
						},
					},
					night: {
						weather: {
							info: "Clear",
							img: "01",
							temperature: "15",
						},
						wind: {
							direct: "North",
							power: "1级",
						},
					},
					precipitation: 0,
				},
			],
		},
		air: {
			forecasttime: "2024-12-19 15:00",
			aqi: 91,
			aq: 2,
			text: "良",
			aqiCode: "99031;99032;99033;99035;99037;99038;99039;99040",
		},
		tempchart: [
			{
				time: "2024-01-01T12:00:00Z",
				max_temp: 25,
				min_temp: 18,
				day_img: "01",
				day_text: "Clear",
				night_img: "01",
				night_text: "Clear",
			},
		],
		passedchart: [
			{
				rain1h: 0,
				rain6h: 0,
				rain12h: 0,
				rain24h: 0,
				temperature: 20,
				tempDiff: "",
				humidity: 50,
				pressure: 1013,
				windDirection: 0,
				windSpeed: 0,
				time: "2024-01-01T00:00:00Z",
			},
		],
		climate: {
			time: "",
			month: [
				{
					month: 1,
					maxTemp: 25,
					minTemp: 18,
					precipitation: 0,
				},
				{
					month: 2,
					maxTemp: 25,
					minTemp: 18,
					precipitation: 0,
				},
			],
		},
		radar: {
			title: "实时雷达数据",
			image: "",
			url: "",
		},
	});

	const [state, setState] = useState({
		province: "AHN",
		city: "pwvLl",
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

			setData(response);
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
		<Card className="flex flex-col gap-5 h-auto">
			<div className="flex gap-5 flex-wrap w-full items-center">
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

				{data.real.publish_time && (
					<div className="">{data.real.publish_time.slice(-5)} 更新</div>
				)}
			</div>

			<div className="relative w-full">
				{loading && (
					<Spin
						size="large"
						className="!absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				)}

				<Meter data={data} />

				<Tabs
					className="w-full !h-[550px]"
					defaultActiveKey="1"
					items={[
						{
							key: "1",
							label: "预报数据",
							children: <Tempchart data={data} />,
						},
						{
							key: "2",
							label: "24小时实时天气",
							children: <PassedChart data={data} />,
						},
					]}
				/>
				{data.climate && <Climate data={data} />}
			</div>
		</Card>
	);
}

export default Weather;
