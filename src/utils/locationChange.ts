// 常量定义
const X_PI = (Math.PI * 3000.0) / 180.0; // 百度坐标偏移量
const PI = Math.PI; // 圆周率
const EARTH_RADIUS = 6378245.0; // 地球半径，单位：米
const ECCENTRICITY_SQUARED = 0.006693421622965943; // 偏心率的平方

/**
 * WGS84 坐标系 转 百度坐标系 (BD-09)
 * @param longitude - WGS84经度
 * @param latitude - WGS84纬度
 * @returns 百度坐标 [经度, 纬度]
 */
export function wgs84ToBd09(
	longitude: number,
	latitude: number,
): [number, number] {
	const [gcjLongitude, gcjLatitude] = wgs84ToGcj02(longitude, latitude);
	return gcj02ToBd09(gcjLongitude, gcjLatitude);
}

/**
 * 百度坐标系 (BD-09) 转 火星坐标系 (GCJ-02)
 * @param bdLongitude - 百度经度
 * @param bdLatitude - 百度纬度
 * @returns 火星坐标 [经度, 纬度]
 */
export function bd09ToGcj02(
	bdLongitude: number,
	bdLatitude: number,
): [number, number] {
	const x = bdLongitude - 0.0065;
	const y = bdLatitude - 0.006;
	const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
	const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
	return [z * Math.cos(theta), z * Math.sin(theta)];
}

/**
 * 火星坐标系 (GCJ-02) 转 百度坐标系 (BD-09)
 * @param gcjLongitude - 火星经度
 * @param gcjLatitude - 火星纬度
 * @returns 百度坐标 [经度, 纬度]
 */
export function gcj02ToBd09(
	gcjLongitude: number,
	gcjLatitude: number,
): [number, number] {
	const z =
		Math.sqrt(gcjLongitude * gcjLongitude + gcjLatitude * gcjLatitude) +
		0.00002 * Math.sin(gcjLatitude * X_PI);
	const theta =
		Math.atan2(gcjLatitude, gcjLongitude) +
		0.000003 * Math.cos(gcjLongitude * X_PI);
	return [z * Math.cos(theta) + 0.0065, z * Math.sin(theta) + 0.006];
}

/**
 * WGS84 坐标系 转 火星坐标系 (GCJ-02)
 * @param longitude - WGS84经度
 * @param latitude - WGS84纬度
 * @returns 火星坐标 [经度, 纬度]
 */
export function wgs84ToGcj02(
	longitude: number,
	latitude: number,
): [number, number] {
	if (isOutsideChina(longitude, latitude)) {
		return [longitude, latitude];
	}
	const dLat = transformLatitude(longitude - 105.0, latitude - 35.0);
	const dLng = transformLongitude(longitude - 105.0, latitude - 35.0);
	const radLat = (latitude / 180.0) * PI;
	let magic = Math.sin(radLat);
	magic = 1 - ECCENTRICITY_SQUARED * magic * magic;
	const sqrtMagic = Math.sqrt(magic);
	const adjustedLat =
		(dLat * 180.0) /
		(((EARTH_RADIUS * (1 - ECCENTRICITY_SQUARED)) / (magic * sqrtMagic)) * PI);
	const adjustedLng =
		(dLng * 180.0) / ((EARTH_RADIUS / sqrtMagic) * Math.cos(radLat) * PI);
	return [longitude + adjustedLng, latitude + adjustedLat];
}

/**
 * 判断是否在中国境外
 * @param longitude - 经度
 * @param latitude - 纬度
 * @returns 是否在中国境外
 */
function isOutsideChina(longitude: number, latitude: number): boolean {
	return (
		longitude < 72.004 ||
		longitude > 137.8347 ||
		latitude < 0.8293 ||
		latitude > 55.8271
	);
}

/**
 * 纬度转换公式
 * @param lngDiff - 经度差值
 * @param latDiff - 纬度差值
 * @returns 纬度偏移量
 */
function transformLatitude(lngDiff: number, latDiff: number): number {
	let ret =
		-100.0 +
		2.0 * lngDiff +
		3.0 * latDiff +
		0.2 * latDiff * latDiff +
		0.1 * lngDiff * latDiff +
		0.2 * Math.sqrt(Math.abs(lngDiff));
	ret +=
		((20.0 * Math.sin(6.0 * lngDiff * PI) +
			20.0 * Math.sin(2.0 * lngDiff * PI)) *
			2.0) /
		3.0;
	ret +=
		((20.0 * Math.sin(latDiff * PI) + 40.0 * Math.sin((latDiff / 3.0) * PI)) *
			2.0) /
		3.0;
	ret +=
		((160.0 * Math.sin((latDiff / 12.0) * PI) +
			320 * Math.sin((latDiff / 30.0) * PI)) *
			2.0) /
		3.0;
	return ret;
}

/**
 * 经度转换公式
 * @param lngDiff - 经度差值
 * @param latDiff - 纬度差值
 * @returns 经度偏移量
 */
function transformLongitude(lngDiff: number, latDiff: number): number {
	let ret =
		300.0 +
		lngDiff +
		2.0 * latDiff +
		0.1 * lngDiff * lngDiff +
		0.1 * lngDiff * latDiff +
		0.1 * Math.sqrt(Math.abs(lngDiff));
	ret +=
		((20.0 * Math.sin(6.0 * lngDiff * PI) +
			20.0 * Math.sin(2.0 * lngDiff * PI)) *
			2.0) /
		3.0;
	ret +=
		((20.0 * Math.sin(lngDiff * PI) + 40.0 * Math.sin((lngDiff / 3.0) * PI)) *
			2.0) /
		3.0;
	ret +=
		((150.0 * Math.sin((lngDiff / 12.0) * PI) +
			300.0 * Math.sin((lngDiff / 30.0) * PI)) *
			2.0) /
		3.0;
	return ret;
}
