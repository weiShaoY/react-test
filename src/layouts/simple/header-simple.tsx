import { SvgIcon } from "@/components/icon";
import Setting from "@/components/setting";
import { NavLink } from "react-router-dom";

/**
 * 简单布局组件的头部
 *
 * @returns {JSX.Element} 渲染一个带 Logo 和设置按钮的头部
 */
export default function HeaderSimple(): JSX.Element {
	return (
		<header className="flex h-16 w-full items-center justify-between px-6">
			{/* 渲染 Logo，设置大小为 30 */}

			<NavLink to="/" className="flex items-center bg-red">
				<SvgIcon icon="common-logo" size={60} />
				<SvgIcon icon="common-weiShaoY" size="120" />
			</NavLink>

			{/* 渲染设置按钮 */}
			<Setting />
		</header>
	);
}
