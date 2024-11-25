import { useEffect, useMemo, useRef } from "react";
import { SRGBColorSpace, TextureLoader } from "three";
import { BokehBackground } from "./brokenBg"; // 确保该文件导出了正确的类或函数
import particles from "./images/particles.png";

/**
 * BrokenBg 组件，用于渲染动态背景效果
 */
const BrokenBg = () => {
	// 创建 TextureLoader 并加载纹理
	const loader = useMemo(() => new TextureLoader(), []);

	const diffuseTex = useMemo(() => loader.load(particles), [loader]);

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

export default BrokenBg;
