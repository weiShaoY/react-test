import { SRGBColorSpace, TextureLoader } from "three";
import { particleTex } from "@/assets/images";
import { useEffect, useMemo, useRef } from "react";
import { BokehBackground } from "./brokenBg.js"; // 确保该文件导出了正确的类或函数

/**
 * BrokenBg 组件，用于渲染动态背景效果
 */
const BrokenBg = () => {
	// 创建 TextureLoader 并加载纹理
	const loader = useMemo(() => new TextureLoader(), []);
	const diffuseTex = useMemo(() => loader.load(particleTex), [loader]);

	// 绑定 Canvas 的 ref
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// 设置纹理属性
	useEffect(() => {
		if (diffuseTex) {
			diffuseTex.flipY = false;
			diffuseTex.colorSpace = SRGBColorSpace;
		}
	}, [diffuseTex]);

	useEffect(() => {
		if (!canvasRef.current) return;

		// 实例化 BokehBackground
		const bokehBackground = BokehBackground(canvasRef.current);

		// 绑定纹理
		bokehBackground.bindMap(diffuseTex);

		// 设置颜色
		bokehBackground.setColors([0xc18417, 0x510de5, 0xa8381f]);

		// 清理资源
		return () => {
			bokehBackground.dispose();
			diffuseTex.dispose();
		};
	}, [diffuseTex]);

	return <canvas ref={canvasRef} />;
};

/**
 * BrokenBgCanvas 组件，用于包裹 BrokenBg 并设置布局
 */
const BrokenBgCanvas = () => {
	return (
		<div className="absolute inset-0 z-[-1]">
			<BrokenBg />
		</div>
	);
};

export default BrokenBgCanvas;
