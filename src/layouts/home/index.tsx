import type React from "react";

import { useThemeToken } from "@/theme/hooks";

import HeaderHome from "./header-home";

type Props = {
	children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
	const { colorBgElevated, colorTextBase } = useThemeToken();

	const backgroundColor =
		"!bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]";

	return (
		<div
			className="flex h-screen w-full flex-col !bg-[#222325]"
			style={{
				color: colorTextBase,
				// background: colorBgElevated,
			}}
		>
			<HeaderHome />
			{children}
		</div>
	);
}
