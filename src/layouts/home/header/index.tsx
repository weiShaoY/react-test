import DesktopMenu from "./components/desktop-menu";
import MobileMenu from "./components/mobile-menu";

import Logo from "@/components/logo";

import Github from "@/components/github";

const menuList = [
	{
		key: "/home/about",
		label: "About",
	},
	{
		key: "/home/work",
		label: "Work",
	},
	{
		key: "/home/contact",
		label: "Contact",
	},
	{
		key: "/blog",
		label: "Blog",
	},
	{
		key: "/garage",
		label: "Garage",
	},
];

export default function HomeHeader({ headerHeight = 80 }) {
	return (
		<header
			className="flex w-full  justify-center fixed top-0 z-[999] bg-[#191919]"
			style={{ height: `${headerHeight}px` }}
		>
			<div className="container flex items-center justify-between mx-5">
				<Logo />

				<DesktopMenu menuList={menuList} />

				<div className="flex items-center gap-5">
					<Github iconColor="#ffffff" />
					{/* 下拉菜单,只有h5可见 */}
					<MobileMenu menuList={menuList} headerHeight={headerHeight} />
				</div>
			</div>
		</header>
	);
}
