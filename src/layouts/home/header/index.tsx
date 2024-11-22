import Menu from "./components/menu";

import { isMobile } from "@/utils";

import Logo from "@/components/logo";

import Github from "@/components/github";

export default function HomeHeader() {
	const headerHeight = 80;
	return (
		<header
			className="flex w-full  justify-center fixed z-[999] bg-[#191919]"
			style={{ height: `${headerHeight}px` }}
		>
			<div className="container flex items-center justify-between mx-5">
				<Logo />

				<div className="flex items-center gap-5">
					<Github iconColor="#ffffff" />

					{/* 下拉菜单,只有h5可见 */}
					{isMobile && <Menu headerHeight={headerHeight} />}
				</div>
			</div>
		</header>
	);
}
