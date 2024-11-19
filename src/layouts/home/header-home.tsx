import Logo from "@/components/logo";

import { SvgIcon } from "@/components/icon";

import SettingButton from "../_common/setting-button";

import { Button, Dropdown } from "antd";

import type { MenuProps } from "antd";

// import { IconButton } from "@/components/icon";

import { NavLink } from "react-router-dom";

export default function HeaderHome() {
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
		<header className="flex h-16 w-full  justify-center bg-yellow">
			<div className="container flex items-center justify-between">
				<Logo size={60} />
				<SettingButton />

				<Dropdown menu={{ items }} placement="bottomRight">
					{/* <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
<img className="h-8 w-8 rounded-full" src={avatar} alt="" />
</IconButton> */}
					<Button
						icon={
							<SvgIcon
								icon="menu-components"
								className="ant-menu-item-icon"
								size="24"
							/>
						}
					/>
				</Dropdown>
			</div>
		</header>
	);
}
