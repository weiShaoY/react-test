import { tailwindClassMerger } from "@/utils";
import type { CSSProperties } from "react";

type SvgIconProps = {
	/**
	 * 图标的前缀，可选
	 */
	prefix?: string;

	/**
	 * 图标的名称，必填
	 */
	icon: string;

	/**
	 * 图标的颜色，可选
	 */
	color?: string;

	/**
	 * 图标的大小，可以是字符串或数字，可选
	 */
	size?: string | number;

	/**
	 * 额外的 CSS 类名，可选
	 */
	className?: string;

	/**
	 * 行内样式，可选
	 */
	style?: CSSProperties;
};

export default function SvgIcon({
	icon,
	prefix = "icon",
	color = "currentColor",
	size = "1em",
	className = "",
	style = {},
}: SvgIconProps) {
	const symbolId = `#${prefix}-${icon}`;
	const svgStyle: CSSProperties = {
		verticalAlign: "middle",
		width: size,
		height: size,
		color,
		...style,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			className={tailwindClassMerger(
				"anticon fill-current inline-block h-[1em] w-[1em] overflow-hidden outline-none",
				className,
			)}
			style={svgStyle}
			aria-label={icon}
		>
			<title>{icon}</title>
			<use xlinkHref={symbolId} fill="currentColor" />
		</svg>
	);
}
