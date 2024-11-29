import type React from "react";

import Header from "./header";

type Props = {
	children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
	const headerHeight = 80;

	return (
		// <div className="bg-[#212224] h-full" style={{ marginTop: `${headerHeight}px` }}>
		<div className="bg-[#212224] h-full min-h-screen">
			<Header headerHeight={headerHeight} />
			{children}
		</div>
	);
}
