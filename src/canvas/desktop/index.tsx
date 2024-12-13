import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import { CanvasLoading } from "@/components/loading";

import * as THREE from "three";

type ComputersProps = {
	/**
	 *  是否为移动端
	 */
	isMobile: boolean;
};
/**
 * 替换材质的纹理
 * @param  material - 目标材质
 * @param  textureType - 纹理类型（如 "map" 或 "emissiveMap"）
 * @param  newTextureURL - 新纹理的 URL
 */
function replaceMaterialTexture(
	material: THREE.Material & { [key: string]: any },
	textureType: string,
	newTextureURL: string,
) {
	const textureLoader = new THREE.TextureLoader();

	// 加载新纹理
	textureLoader.load(
		newTextureURL,
		(newTexture) => {
			// 禁用纹理的垂直翻转
			newTexture.flipY = false;

			// 检查旧纹理是否存在，进行清理
			if (material[textureType]) {
				material[textureType].dispose();
			}

			// 替换目标纹理
			material[textureType] = newTexture;
			material.needsUpdate = true; // 通知材质更新

			console.log(`成功替换 ${textureType}:`, newTexture);
		},
		undefined,
		(error) => {
			console.error(`加载纹理 ${textureType} 失败:`, error);
		},
	);
}

/**
 * 遍历并替换纹理
 * @param {THREE.Object3D} scene - 场景对象
 */
function replaceTexturesInScene(scene: THREE.Object3D) {
	scene.traverse((child: any) => {
		if (child.isMesh) {
			const material = child.material;

			// const imgUrl = "https://p1.toutiaoimg.com/origin/1374c00019b8293a5d654";
			const imgUrl = "https://api.lolimi.cn/API/dmtx/api.php";
			// 替换普通纹理
			if (material.map && material.map.name === "screenTex") {
				replaceMaterialTexture(material, "map", imgUrl);
			}

			// 替换发光纹理
			if (material.emissiveMap && material.emissiveMap.name === "screenTex") {
				replaceMaterialTexture(material, "emissiveMap", imgUrl);
				material.emissiveIntensity = 0.6;
			}
		}
	});
}
/**
 * 3D 电脑模型组件
 * @param  props - 是否为移动端
 * @returns  3D 电脑模型
 */
const Computers = ({ isMobile }: ComputersProps): JSX.Element => {
	/**
	 * 加载 3D 模型文件
	 * @description 使用 useGLTF Hook 加载指定路径的 GLTF 模型
	 */
	const computer = useGLTF("/models/desktop/index.gltf");

	// 遍历并替换 电脑模型的壁纸
	replaceTexturesInScene(computer.scene);

	return (
		<primitive
			// 加载的 3D 模型场景对象
			object={computer.scene}
			// 根据是否为移动端设置模型的位置
			position={isMobile ? [-2.5, -3, -1.5] : [0, -5, -1.5]}
			// 设置模型的旋转角度
			rotation={[-0.01, -0.2, -0.1]}
			// 根据是否为移动端调整模型的缩放比例
			scale={isMobile ? 0.4 : 1}
		/>
	);
};
/**
 * 桌面组件
 * @returns  返回一个3D电脑桌面组件
 */
function Desktop() {
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
		 * @param {MediaQueryListEvent} event - 媒体查询事件，包含匹配结果
		 */
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setMobile(event.matches);
		};

		// 添加媒体查询变化的监听器
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		// 清理工作：组件卸载时移除媒体查询监听器
		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	// 预加载 GLTF 模型
	useGLTF.preload("/models/desktop/index.gltf");
	return (
		<Canvas
			// 按需渲染帧，减少性能消耗
			frameloop="always"
			// 启用阴影效果
			shadows
			// 设置相机位置和视场参数
			camera={{ position: [20, 3, 5], fov: 45, near: 0.1, far: 1000 }}
			// 保持绘图缓冲区内容
			gl={{ preserveDrawingBuffer: false }}
			// 设置设备像素比，支持 Retina 显示
			dpr={[1, 2]}
		>
			{/* Suspense 组件用于处理异步加载的组件 */}
			<Suspense fallback={<CanvasLoading />}>
				{/* OrbitControls 提供用户交互控制 */}
				<OrbitControls
					// 禁用缩放
					enableZoom={false}
					// 禁用平移
					enablePan={false}
					// 最大极角，限制相机的垂直移动范围
					maxPolarAngle={Math.PI / 2}
					// 最小极角
					minPolarAngle={Math.PI / 2}
				/>

				{/* 添加一个半球光，提供环境光照 */}
				<hemisphereLight intensity={3} groundColor="black" />

				{/* 添加一个点光源 */}
				<pointLight intensity={1} />

				{/* 添加一个聚光灯，用于照亮 3D 模型 */}
				<spotLight
					// 聚光灯位置
					position={[-20, 50, 10]}
					// 光束的角度
					angle={0.12}
					// 半影强度
					penumbra={1}
					// 光强
					intensity={1}
					// 启用阴影
					castShadow
					// 设置阴影贴图的分辨率
					shadow-mapSize={1024}
				/>

				{/* 渲染 3D 电脑模型 */}
				<Computers isMobile={isMobile} />

				{/* 预加载所有模型文件 */}
				<Preload all />
			</Suspense>
		</Canvas>
	);
}

export default Desktop;
