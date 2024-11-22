import type React from "react";

import Header from "./header";

type Props = {
	children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
	return (
		<div className="bg-[#212224] ">
			<Header />
			{children}
		</div>
	);
}
