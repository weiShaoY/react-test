import Logo from "@/components/logo";

import { SvgIcon } from "@/components/icon";

import SettingButton from "../_common/setting-button";

import { Button, Dropdown } from "antd";

import type { MenuProps } from "antd";

import { NavLink } from "react-router-dom";

import { useThemeToken } from "@/theme/hooks";

import type { CSSProperties } from "react";
export default function Header() {
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

	const themeToken = useThemeToken();

	/**
	 * 初始化样式对象
	 */
	const style: CSSProperties = {
		/**
		 * 设置边框颜色，使用主题中的次要边框颜色
		 */
		backgroundColor: themeToken.colorHomeHeaderBg,
	};
	// bg-[#191919]
	return (
		<header className="flex h-16 w-full  justify-center" style={style}>
			<div className="container flex items-center justify-between mx-5">
				<Logo size={60} />

				<div className="flex items-center gap-2">
					<SettingButton />

					<Dropdown menu={{ items }} placement="bottomRight">
						<Button icon={<SvgIcon icon="setting-setting" size="24" />} />
					</Dropdown>
				</div>
			</div>
		</header>
	);
}
