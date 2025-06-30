import type { Context } from "hono";
import type { BIZ_CODE } from "../constants";

/**
 * 业务逻辑错误的辅助函数
 * @param c Hono 的上下文对象
 * @param code 自定义的业务错误码 (来自 BIZ_CODE)
 * @param message 错误描述
 * @returns 返回 HTTP 200 OK，但在 body 中指明错误
 */
export const bizError = (
	c: Context,
	code: BIZ_CODE,
	// code:number,
	message: string,
) => {
	const response = {
		code,
		message,
		data: null,
	};
	// 业务错误总是返回 200 状态码
	return c.json(response, 200);
};
