import Card from "@/components/card";

import One from "./components/one";

import Two from "./components/two";

import Three from "./components/three";

import Four from "./components/four";

import { Col, Row } from "antd";

function TextAnimation() {
	return (
		<Row gutter={[16, 16]} justify="center" align="stretch">
			<Col span={24} lg={12}>
				<Card>
					<One />
				</Card>
			</Col>

			<Col span={24} lg={12}>
				<Card>
					<Two />
				</Card>
			</Col>

			<Col span={24} lg={12}>
				<Card className="h-full">
					<Three />
				</Card>
			</Col>

			<Col span={24} lg={12}>
				<Card className="h-full">
					<Four />
				</Card>
			</Col>
		</Row>
	);
}

export default TextAnimation;
