import type React from "react";

import Header from "./header";
import { Layout } from "antd";

type Props = {
	children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
	return (
		<Layout className="flex h-screen w-full flex-col ">
			<Header />
			{children}
		</Layout>
	);
}
