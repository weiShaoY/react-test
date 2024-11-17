import Logo from "@/components/logo";

import SettingButton from "../_common/setting-button";

export default function HeaderHome() {
	return (
		<header className="flex h-16 w-full  justify-center bg-yellow">
			<div className="container flex items-center justify-between">
				<Logo size={140} />
				<SettingButton />
			</div>
		</header>
	);
}
