import Card from "@/components/card";
import { Col, Row } from "antd";
import Left from "./components/left";
import Right from "./components/right";

function Clock() {
	return (
		<Row gutter={[16, 16]} justify="center">
			<Col span={24} lg={12}>
				<Card>
					<Left />
				</Card>
			</Col>

			<Col span={24} lg={12}>
				<Card>
					<Right />
				</Card>
			</Col>
		</Row>
	);
}

export default Clock;
