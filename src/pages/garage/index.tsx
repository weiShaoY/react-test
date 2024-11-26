import Container from "./components/container";

import Ui from "./components/ui";
function Garage() {
	return (
		<>
			{/* 3D场景层 */}
			<Container />
			{/* UI界面层 */}
			<Ui />
		</>
	);
}
export default Garage;
