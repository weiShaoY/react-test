import Menu from "./components/menu";

import { isMobile } from "@/utils";

import Logo from "@/components/logo";

import Github from "@/components/github";

import { NavLink } from "react-router-dom";

export default function HomeHeader({ headerHeight = 80 }) {
	return (
		<header
			className="flex w-full  justify-center fixed top-0 z-[999] bg-[#191919]"
			style={{ height: `${headerHeight}px` }}
		>
			<div className="container flex items-center justify-between mx-5">
				<Logo />

				<div className="flex items-center gap-5 ">
					<NavLink className="!text-white font-bold" to="/home/about">
						About
					</NavLink>

					<NavLink className="!text-white font-bold" to="/home/resume">
						Resume
					</NavLink>
				</div>

				<div className="flex items-center gap-5">
					<Github iconColor="#ffffff" />

					{/* 下拉菜单,只有h5可见 */}
					{isMobile && <Menu headerHeight={headerHeight} />}
				</div>
			</div>
		</header>
	);
}
