import type React from "react";

import { useThemeToken } from "@/theme/hooks";

import HeaderSimple from "./header-simple";

type Props = {
	/** 子组件节点 */
	children: React.ReactNode;
};

/**
 * 简单布局组件
 *
 * @param {Props} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件节点
 * @returns {JSX.Element} 简单布局的渲染结果
 */
export default function SimpleLayout({ children }: Props): JSX.Element {
	// 使用主题 token 获取颜色
	const { colorBgElevated, colorTextBase } = useThemeToken();
	return (
		<div
			className="flex h-screen w-full flex-col"
			style={{
				color: colorTextBase,
				background: colorBgElevated,
			}}
		>
			{/* 简单头部组件 */}
			<HeaderSimple />
			{/* 渲染子组件 */}
			{children}
		</div>
	);
}
