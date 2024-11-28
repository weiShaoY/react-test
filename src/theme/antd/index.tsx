import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";

import { useSettings } from "@/store/settingStore";

import {
	colorPrimarys,
	customComponentConfig,
	customThemeTokenConfig,
	themeModeToken,
} from "./theme";

import { ThemeMode } from "#/enum";

type Props = {
	children: React.ReactNode;
};
export default function AntdConfig({ children }: Props) {
	const { themeMode, themeColorPresets } = useSettings();

	const algorithm =
		themeMode === ThemeMode.Light
			? theme.defaultAlgorithm
			: theme.darkAlgorithm;
	const colorPrimary = colorPrimarys[themeColorPresets];

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary,
					...customThemeTokenConfig,
					...themeModeToken[themeMode].token,
					fontFamily: "'gaiLiangShouJinTi', 'Fira Blog VF', sans-serif",
				},
				components: {
					...customComponentConfig,
					...themeModeToken[themeMode].components,
				},
				algorithm,
			}}
		>
			{/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
			<StyleProvider hashPriority="high">{children}</StyleProvider>
		</ConfigProvider>
	);
}
