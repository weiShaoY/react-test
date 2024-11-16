/**
 * API 请求结果接口
 * @template T 返回数据的类型，默认为 `any`
 */
export interface Result<T = any> {
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
}
