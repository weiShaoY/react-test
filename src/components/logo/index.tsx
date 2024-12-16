import { SvgIcon } from "@/components/icon";
import { NavLink } from "react-router";
/**
 * Logo 组件
 * @returns  渲染 Logo
 */
export default function Logo(): JSX.Element {
	return (
		<NavLink to="/" className="flex items-center">
			<SvgIcon icon="common-logo" size={60} />
			<SvgIcon icon="common-weiShaoY" size="120" color="#ffffff" />
		</NavLink>
	);
}
