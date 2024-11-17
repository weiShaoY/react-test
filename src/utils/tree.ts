import { chain } from "ramda";

/**
 * 扁平化包含树结构的数组
 * @template T - 树节点的类型，要求包含可选的 `children` 属性
 * @param {T[]} trees - 包含树结构的数组
 * @returns {T[]} - 扁平化后的数组
 */
export function flattenTrees<T extends { children?: T[] }>(
	trees: T[] = [],
): T[] {
	return chain((node) => {
		// 获取当前节点的子节点列表，若没有则为空数组
		const children = node.children || [];
		// 返回当前节点和其所有子节点的扁平化结果
		return [node, ...flattenTrees(children)];
	}, trees);
}
