import { Spin } from "antd";

export function CircleLoading() {
	return (
		<div className="flex h-full  items-center justify-center bg-yellow">
			<Spin size="large" />
		</div>
	);
}
