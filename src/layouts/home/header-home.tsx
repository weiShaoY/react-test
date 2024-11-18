import Logo from "@/components/logo";

import { SvgIcon } from "@/components/icon";

// import SettingButton from "../_common/setting-button";

import { Button, Dropdown } from "antd";

import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

// function handleChange(value: string) {
// 	console.log(`selected ${value}`);
// }

export default function HeaderHome() {
	const navigate = useNavigate();

	const items: MenuProps["items"] = [
		{
			key: "/about",
			label: <div>About</div>,
		},
		{
			key: "/resume",
			label: <div>Resume</div>,
		},
		{
			key: "/code",
			label: <div>Code</div>,
		},
	];

	function handleClick(e: any) {
		// 使用 navigate 进行页面跳转();
		navigate(e.key);
	}

	return (
		<header className="flex h-16 w-full  justify-center bg-yellow">
			<div className="container flex items-center justify-between">
				<Logo size={60} />
				{/* <SettingButton /> */}

				<Dropdown
					menu={{ items, onClick: handleClick }}
					placement="bottomRight"
				>
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
