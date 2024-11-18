import Logo from "@/components/logo";

import { SvgIcon } from "@/components/icon";

import SettingButton from "../_common/setting-button";

import { Select, Dropdown, Button } from "antd";

function handleChange(value: string) {
	console.log(`selected ${value}`);
}

export default function HeaderHome() {
	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					About
				</a>
			),
		},
		{
			key: "2",
			label: (
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.aliyun.com"
				>
					Resume
				</a>
			),
		},
	];

	return (
		<header className="flex h-16 w-full  justify-center bg-yellow">
			<div className="container flex items-center justify-between">
				<Logo size={140} />
				<SettingButton />

				<Select
					defaultValue="lucy"
					style={{ width: 60 }}
					onChange={handleChange}
					options={[
						{ value: "/about", label: "About" },
						{ value: "/resume", label: "Resume" },
					]}
				/>

				<Dropdown menu={{ items }} placement="bottomLeft">
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
