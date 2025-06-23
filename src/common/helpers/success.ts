import { BIZ_CODE } from "@/constants/code";
import type { Context } from "hono";

/**
 * 成功响应的辅助函数
 * @param c Hono 的上下文对象
 * @param data 成功时返回的数据
 */
export const success = <C extends Context, D>(c: C, data: D) => {
	const response = {
		code: BIZ_CODE.SUCCESS,
		message: "success",
		data,
	};
	return c.json(response, 200);
};
