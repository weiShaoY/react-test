import { IconButton, SvgIcon } from "@/components/icon";

import Menu from "./components/menu";
import { NavLink } from "react-router-dom";

import { isMobile } from "@/utils";

export default function HomeHeader() {
	const headerHeight = 80;
	return (
		<header
			className="flex w-full  justify-center fixed z-[999] bg-[#191919]"
			style={{ height: `${headerHeight}px` }}
		>
			<div className="container flex items-center justify-between mx-5">
				{/* Logo 区域 */}
				<NavLink to="/" className="flex items-center bg-red">
					<SvgIcon icon="common-logo" size={60} />
					<SvgIcon icon="common-weiShaoY" size="120" color="#ffffff" />
				</NavLink>

				<div className="flex items-center gap-5">
					<IconButton
						onClick={() =>
							window.open("https://github.com/d3george/slash-admin")
						}
					>
						<SvgIcon icon="common-github" size="24" />
					</IconButton>

					{/* 下拉菜单,只有h5可见 */}
					{isMobile && <Menu headerHeight={headerHeight} />}
				</div>
			</div>
		</header>
	);
}
