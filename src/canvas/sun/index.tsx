import { CanvasLoading } from "@/components/loading";
import { OrbitControls, Preload, RenderCubeTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, memo, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import fragmentAround from "./glsl/around-fragment.glsl";
import vertexAround from "./glsl/around-vertex.glsl";
import fragmentSun from "./glsl/sun-fragment.glsl";
import vertexSun from "./glsl/sun-vertex.glsl";
import textureFragment from "./glsl/texture-fragment.glsl";
import textureVertex from "./glsl/texture-vertex.glsl";

/**
 * 太阳组件
 * @returns 返回一个太阳的可视化组件
 */
const Sun = () => {
	const sunMatRef = useRef<THREE.ShaderMaterial | null>(null);
	const aroundRef = useRef<THREE.Mesh | null>(null);

	const uniforms = useMemo(
		() => ({
			// 时间 uniform
			uTime: { value: 0 },
			// Perlin 噪声纹理 uniform
			uPerlin: { value: null },
		}),
		[],
	);

	useFrame((state, delta) => {
		if (sunMatRef.current) {
			sunMatRef.current.uniforms.uTime.value += delta;
		}
		uniforms.uTime.value += delta;
		if (aroundRef.current) {
			// 光环始终朝向相机
			aroundRef.current.lookAt(state.camera.position);
		}
	});

	return (
		<>
			{/* 太阳球体 */}
			<mesh scale={1.5}>
				<sphereGeometry args={[1, 32, 32]} />
				<shaderMaterial
					ref={sunMatRef}
					vertexShader={vertexSun}
					fragmentShader={fragmentSun}
					uniforms={uniforms}
				>
					{/* 渲染立方体纹理 */}
					<RenderCubeTexture
						attach="uniforms-uPerlin-value"
						resolution={256}
						type={THREE.UnsignedByteType}
					>
						<cubeCamera position={[0, 0, 5]} />
						<mesh scale={2}>
							<sphereGeometry args={[1, 32, 32]} />
							{/* Perlin 噪声球体 */}
							<shaderMaterial
								side={THREE.DoubleSide}
								vertexShader={textureVertex}
								fragmentShader={textureFragment}
								uniforms={{
									uTime: { value: 0 }, // Perlin 噪声时间
								}}
							/>
						</mesh>
					</RenderCubeTexture>
				</shaderMaterial>
			</mesh>

			{/* 外围光环 */}
			<mesh ref={aroundRef} scale={1.5}>
				<sphereGeometry args={[1.05, 32, 32]} />
				<shaderMaterial
					side={THREE.BackSide}
					vertexShader={vertexAround}
					fragmentShader={fragmentAround}
				/>
			</mesh>

			{/* 后期处理 - 添加辉光效果 */}
			<EffectComposer>
				<Bloom
					// 控制光晕强度的参数，值越大光晕越明显
					intensity={1}
					// 亮度阈值，超过此亮度的部分会产生光晕效果
					luminanceThreshold={0.6}
					// 否启用Mipmap模糊处理，用于平滑光晕效果
					mipmapBlur
					// 制光晕的模糊半径，值越大光晕越扩散
					radius={0}
				/>
			</EffectComposer>
		</>
	);
};

/**
 * 太阳渲染 Canvas 组件
 * @description 提供一个包含太阳渲染效果的三维场景 Canvas，支持交互和性能优化。
 * @returns 一个支持自动旋转和动态性能调整的 3D Canvas 组件。
 */
const SunCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// 控制 Canvas 的渲染模式
	const [frameloop, setFrameloop] = useState<"never" | "always" | "demand">(
		"never",
	);

	// 监听 Canvas 是否在视口内以动态控制帧循环
	useEffect(() => {
		if (!canvasRef.current) return;

		const observer = new IntersectionObserver(
			([{ isIntersecting }]) => {
				// 是否启用帧循环
				setFrameloop(isIntersecting ? "always" : "never");
			},
			{
				// 阈值为 10%
				threshold: 0.1,
			},
		);

		observer.observe(canvasRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<Canvas
			className="cursor-pointer"
			ref={canvasRef}
			frameloop={frameloop}
			camera={{
				// 视野角度
				fov: 45,
				// 近裁剪面
				near: 0.1,
				// 远裁剪面
				far: 100,
				// 相机位置
				position: [-4, 3, 7],
			}}
			gl={{ preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
			// 设置像素比范围
			dpr={[1, 2]}
		>
			<OrbitControls
				autoRotate
				// 自动旋转速度
				autoRotateSpeed={0.5}
				// 禁用缩放
				enableZoom={false}
				// 禁用平移
				enablePan={false}
				// 旋转速度
				rotateSpeed={0.1}
				// 最大极角
				maxPolarAngle={Math.PI / 2}
				// 最小极角
				minPolarAngle={Math.PI / 2}
			/>
			<Suspense fallback={<CanvasLoading />}>
				{/* 加载太阳组件 */}
				<Sun />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default memo(SunCanvas);
