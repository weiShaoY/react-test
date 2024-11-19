import type React from "react";

import { useThemeToken } from "@/theme/hooks";

import Header from "./header";

type Props = {
	children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
	const themeToken = useThemeToken();

	// !bg-[#222325]
	return (
		<div
			className="flex h-screen w-full flex-col "
			style={{
				background: themeToken.colorHomeBgLayout,
			}}
		>
			<Header />
			{children}
		</div>
	);
}
