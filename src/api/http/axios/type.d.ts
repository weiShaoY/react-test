/**
 * API 请求结果接口
 * @template T 返回数据的类型，默认为 `any`
 */
export type Result<T = any> = {
	/**
	 * 状态码
	 */
	status: number;
	/**
	 * 响应消息
	 */
	message: string;
	/**
	 * 响应数据（可选）
	 */
	data?: T;
};

/**
 * @enum {number} ResultEnum
 * @description 请求结果枚举，用于表示请求的返回状态
 */
export enum ResultEnum {
	/**
	 * 成功
	 */
	SUCCESS = 0,
	/**
	 * 错误
	 */
	ERROR = -1,
	/**
	 * 超时（未授权或登录失效）
	 */
	TIMEOUT = 401,
}
