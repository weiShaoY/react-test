import { SvgIcon } from "@/components/icon";

import Setting from "@/components/setting";

import { Button, Dropdown } from "antd";

import type { MenuProps } from "antd";

import { NavLink } from "react-router-dom";

import { Layout } from "antd";

const { Header } = Layout;
export default function HomeHeader() {
	const items: MenuProps["items"] = [
		{
			key: "/home/about",
			label: <NavLink to="/home/about">About</NavLink>,
		},
		{
			key: "/home/resume",
			label: <NavLink to="/home/resume">Resume</NavLink>,
		},
		{
			key: "/code",
			label: <NavLink to="/code">Code</NavLink>,
		},
	];

	return (
		<Header className="flex h-16 w-full  justify-center fixed z-[999]">
			<div className="container flex items-center justify-between mx-5">
				{/* Logo 区域 */}
				<NavLink to="/" className="flex items-center bg-red">
					<SvgIcon icon="common-logo" size={60} />
					<SvgIcon icon="common-weiShaoY" size="120" />
				</NavLink>

				<div className="flex items-center gap-2">
					<Setting />

					<Dropdown menu={{ items }} placement="bottomRight">
						<Button
							icon={<SvgIcon icon="home-menu" size="24" />}
							variant="text"
						/>
					</Dropdown>
				</div>
			</div>
		</Header>
	);
}
