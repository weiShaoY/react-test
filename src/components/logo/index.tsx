import { NavLink } from "react-router-dom";

import { useThemeToken } from "@/theme/hooks";

import { SvgIcon } from "../icon";

interface Props {
	size?: number | string;
}
function Logo({ size = 80 }: Props) {
	const { colorPrimary } = useThemeToken();

	return (
		<NavLink to="/">
			<SvgIcon icon="logo" size={size} color={colorPrimary} />
		</NavLink>
	);
}

export default Logo;
