import { SvgIcon } from "@/components/icon";
import { Spin } from "antd";
import { Button, Tooltip } from "antd";
import { useState } from "react";
type Props = {
	src: string;
};

export default function BlogIframeLayout({ src = "" }: Props) {
	// 使用 state 来控制 iframe 是否加载完成
	const [isLoading, setIsLoading] = useState(true);

	// 当 iframe 加载完成时，更新 isLoading 状态
	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className="h-full w-full relative flex flex-col">
			{/* 加载中时显示的 loading 效果 */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-white z-10">
					{/* <p>Loading...</p> */}
					<Spin size="large" />
				</div>
			)}
			<div className="w-full flex py-2 justify-end">
				<Tooltip placement="leftTop" title="在新标签页打开">
					<Button
						onClick={() => window.open(src, "_blank")}
						icon={<SvgIcon icon="arrow-top-right" />}
					/>
				</Tooltip>
			</div>
			{/* iframe 元素 */}
			<iframe
				src={src}
				title="iframe-page"
				className="flex-1 w-full"
				onLoad={handleLoad} // 监听 iframe 加载完成事件
			/>
		</div>
	);
}
