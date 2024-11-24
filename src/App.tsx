import { Helmet } from "react-helmet-async";

// import Logo from "@/assets/images/avatar.jpg";
// import Logo from "/public/favicon.svg";
import Logo from "/favicon.ico";

import Router from "@/router/index";

import { MotionLazy } from "./components/animate/motion-lazy";

function App() {
	return (
		<MotionLazy>
			{/* 懒加载路由 */}

			{/* 修改 HTML <head> 中的内 */}
			<Helmet>
				<title>weiShaoY</title>

				<link rel="icon" href={Logo} />
			</Helmet>
			<Router />
		</MotionLazy>
	);
}

export default App;
