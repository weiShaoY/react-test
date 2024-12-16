import { Helmet } from "react-helmet-async";

// import Logo from "@/assets/images/avatar.jpg";
// import Logo from "/public/favicon.svg";
import Logo from "/favicon.ico";

import Router from "@/router/index";

import { MotionLazy } from "./components/animate/motion-lazy";

import Toast from "./components/toast";

function print() {
	console.info(
		"%cNiceToMeetYou,我是weiShaoY",
		"color: orange;background:	ivory;font-size:26px;border: 2px solid black;padding:10px;text-shadow:1px 1px grey;border-radius:11px;",
	);
}

function App() {
	print();
	return (
		<MotionLazy>
			{/* 懒加载路由 */}

			{/* 修改 HTML <head> 中的内 */}
			<Helmet>
				<title>weiShaoY</title>
				<link rel="icon" href={Logo} />
			</Helmet>

			<Toast />
			<Router />
		</MotionLazy>
	);
}

export default App;
