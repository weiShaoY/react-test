import axios, {
	type AxiosRequestConfig,
	type AxiosError,
	type AxiosResponse,
} from "axios";

import type { Result } from "./type";

import { ResultEnum } from "./type";

import { toast } from "sonner";

/**
 *  创建 axios 实例
 */
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 50000,
	headers: { "Content-Type": "application/json;charset=utf-8" },
});

/**
 * 请求拦截器：在请求被发送之前执行一些操作
 * @param {AxiosRequestConfig} config - 请求配置对象
 * @returns {AxiosRequestConfig} - 修改后的请求配置对象
 */
axiosInstance.interceptors.request.use(
	(config) => {
		// 在请求被发送之前做些什么
		config.headers.Authorization = "Bearer Token";
		return config;
	},
	(error) => {
		// 请求错误时做些什么
		return Promise.reject(error);
	},
);

/**
 * 响应拦截器：处理响应数据和错误
 * @param {AxiosResponse<Result>} res - 响应对象
 * @returns {any} - 处理后的响应数据
 * @throws {Error} - 请求失败或业务逻辑错误
 */
axiosInstance.interceptors.response.use(
	(res: AxiosResponse<Result>) => {
		if (!res.data) throw new Error("请求出错,请稍后再试");

		const { status, data, message } = res.data;
		// 业务请求成功
		const hasSuccess =
			data && Reflect.has(res.data, "status") && status === ResultEnum.SUCCESS;
		if (hasSuccess) {
			return data;
		}

		// 业务请求错误
		throw new Error(message || "请求出错,请稍后再试");
	},
	/**
	 * 错误处理：处理 HTTP 错误
	 * @param {AxiosError<Result>} error - 错误对象
	 * @returns {Promise<never>} - 被拒绝的 Promise
	 */
	(error: AxiosError<Result>) => {
		const { response, message } = error || {};
		const errMsg = response?.data?.message || message || "操作失败,系统异常!";
		toast.error(errMsg, {
			position: "top-center",
		});
		const status = response?.status;
		if (status === 401) {
			// userStore.getState().actions.clearUserInfoAndToken();
		}
		return Promise.reject(error);
	},
);

/**
 * API 客户端类，封装常用的 HTTP 请求方法
 */
class AxiosHttp {
	/**
	 * 发送 GET 请求
	 * @template T - 请求响应的数据类型
	 * @param {AxiosRequestConfig} config - 请求配置对象
	 * @returns {Promise<T>} - 请求响应的 Promise
	 */
	get<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "GET" });
	}

	/**
	 * 发送 POST 请求
	 * @template T - 请求响应的数据类型
	 * @param {AxiosRequestConfig} config - 请求配置对象
	 * @returns {Promise<T>} - 请求响应的 Promise
	 */
	post<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "POST" });
	}

	/**
	 * 发送 PUT 请求
	 * @template T - 请求响应的数据类型
	 * @param {AxiosRequestConfig} config - 请求配置对象
	 * @returns {Promise<T>} - 请求响应的 Promise
	 */
	put<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "PUT" });
	}

	/**
	 * 发送 DELETE 请求
	 * @template T - 请求响应的数据类型
	 * @param {AxiosRequestConfig} config - 请求配置对象
	 * @returns {Promise<T>} - 请求响应的 Promise
	 */
	delete<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "DELETE" });
	}

	/**
	 * 发送 HTTP 请求
	 * @template T - 请求响应的数据类型
	 * @param {AxiosRequestConfig} config - 请求配置对象
	 * @returns {Promise<T>} - 请求响应的 Promise
	 */
	request<T = any>(config: AxiosRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.request<any, AxiosResponse<Result>>(config)
				.then((res: AxiosResponse<Result>) => {
					// 强制转换为 Promise<T>
					resolve(res as unknown as Promise<T>);
				})
				.catch((e: Error | AxiosError) => {
					reject(e);
				});
		});
	}
}

export default new AxiosHttp();
