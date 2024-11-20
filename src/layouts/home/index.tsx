import type React from "react";

import Header from "./header";
import { Layout } from "antd";

type Props = {
	children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
	return (
		<Layout className=" ">
			<Header />
			{children}
		</Layout>
	);
}
