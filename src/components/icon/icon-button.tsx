import type { ButtonProps } from "antd";
import type { CSSProperties, ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
} & ButtonProps;
export default function IconButton({
	children,
	className,
	style,
	onClick,
}: Props) {
	return (
		<button
			style={style}
			className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${className}`}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}
