import { SvgIcon } from "@/components/icon";
import type { CSSProperties } from "react";

/**
 * Github 组件
 * @param  buttonClassName - CSS 类名
 * @param  buttonBgColor - 背景颜色
 * @param  buttonSize - 图标大小
 * @param  iconClassName - 图标类名
 * @param  iconColor - 图标颜色
 * @param  iconSize - 图标大小
 * @returns  渲染 Github 的按钮
 */
export default function Github({
	buttonClassName,
	buttonBgColor, // 背景色属性
	buttonSize = 50,
	iconClassName,
	iconColor = "",
	iconSize = 30,
}: {
	buttonClassName?: string;
	buttonBgColor?: string; // 背景颜色
	buttonSize?: string | number;
	iconClassName?: string;
	iconColor?: string;
	iconSize?: string | number;
}): JSX.Element {
	// 样式对象
	const style: CSSProperties = {
		width: typeof buttonSize === "string" ? buttonSize : `${buttonSize}px`,
		height: typeof buttonSize === "string" ? buttonSize : `${buttonSize}px`,
		...(buttonBgColor ? { backgroundColor: buttonBgColor } : {}), // 只有当 buttonBgColor 有值时才设置背景色
	};

	return (
		<button
			className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${buttonClassName}`}
			type="button"
			onClick={() => window.open("https://github.com/d3george/slash-admin")}
			style={style}
		>
			<SvgIcon
				icon="common-github"
				className={iconClassName}
				size={iconSize}
				color={iconColor}
			/>
		</button>
	);
}
