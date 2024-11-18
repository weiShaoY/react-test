import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

// import CanvasLoader from "../Loader";

// 定义组件的 Props 类型
interface ComputersProps {
	/**
	 *  是否为移动端
	 */
	isMobile: boolean;
}

/**
 * 3D 电脑模型组件
 * @param {ComputersProps} props - 是否为移动端
 * @returns {JSX.Element} - 3D 电脑模型
 */
const Computers = ({ isMobile }: ComputersProps): JSX.Element => {
	/**
	 *  加载 3D 模型
	 */
	const computer = useGLTF("/models/desktop_pc/desktop_pc.gltf");

	return (
		<primitive
			object={computer.scene}
			position={isMobile ? [-1, -5, -1.5] : [0, -5, -1.5]}
			rotation={[-0.01, -0.2, -0.1]}
			scale={isMobile ? 0.6 : 1}
		/>
	);
};

/**
 * 3D 电脑模型的 Canvas 容器
 * @returns {JSX.Element} - Canvas 容器
 */
const ComputersCanvas = (): JSX.Element => {
	// 定义是否为移动端的状态
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		/**
		 *  创建媒体查询对象
		 *  @description 当窗口宽度小于等于 500px 时，设置 isMobile 为 true
		 */
		const mediaQuery = window.matchMedia("(max-width: 500px)");

		// 设置初始状态
		setMobile(mediaQuery.matches);

		/**
		 * 媒体查询变化的回调函数
		 * @param {MediaQueryListEvent} event - 媒体查询事件
		 */
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setMobile(event.matches);
		};

		// 监听宽度变化
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		// 清除监听器
		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<Canvas
			frameloop="demand"
			shadows
			camera={{ position: [20, 3, 5], fov: 45, near: 0.1, far: 1000 }}
			gl={{ preserveDrawingBuffer: true }}
			dpr={[1, 2]}
		>
			<Suspense fallback={null}>
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<hemisphereLight intensity={3} groundColor="black" />
				<pointLight intensity={1} />
				<spotLight
					position={[-20, 50, 10]}
					angle={0.12}
					penumbra={1}
					intensity={1}
					castShadow
					shadow-mapSize={1024}
				/>
				<Computers isMobile={isMobile} />
				<Preload all />
			</Suspense>
		</Canvas>
	);
};

export default ComputersCanvas;
