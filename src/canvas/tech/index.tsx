import {
	Decal,
	Float,
	OrbitControls,
	Preload,
	useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react"; // 如需加载器功能可取消注释

import { CanvasLoading } from "@/components/loading";

import { techStack } from "@/utils";

/**
 * 技术栈数据
 */
const technologies = [
	techStack.html,
	techStack.css,
	techStack.javaScript,
	techStack.typeScript,
	techStack.node,
	techStack.react,
	techStack.vue,
	techStack.tailwindCss,
	techStack.unocss,
	techStack.threeJs,
	techStack.git,
	techStack.pinia,
];

/**
 * 渲染 3D 球体组件
 * @param {Object} props - 组件的属性对象
 * @param {string} props.imgUrl - 用于渲染球体贴图的图片路径
 * @returns  渲染后的球体组件
 */
function Ball({ imgUrl, url }: { imgUrl: string; url: string }) {
	const [decal] = useTexture([imgUrl]);

	return (
		<Float speed={3} rotationIntensity={1} floatIntensity={2}>
			<ambientLight intensity={2} />
			<directionalLight position={[0, 0, 0.05]} />
			<mesh
				castShadow
				receiveShadow
				scale={3}
				onDoubleClick={(event) => {
					// 阻止冒泡
					event.stopPropagation();
					window.open(url, "_blank", "noopener,noreferrer");
				}}
				onPointerOver={() => {
					// 设置鼠标样式
					document.body.style.cursor = "pointer";
				}}
				onPointerOut={() => {
					// 恢复默认鼠标样式
					document.body.style.cursor = "default";
				}}
			>
				<icosahedronGeometry args={[1, 1]} />
				<meshStandardMaterial
					color="#fff8ef"
					polygonOffset
					polygonOffsetFactor={-5}
					flatShading
				/>

				{/* 正面贴图 */}
				<Decal
					position={[0, 0, 1]}
					map={decal}
					rotation={[Math.PI * 2, 0, 0]}
				/>
				{/* 背面贴图 */}
				<Decal position={[0, 0, -1]} map={decal} rotation={[0, Math.PI, 0]} />
				{/* 右侧贴图 */}
				<Decal
					position={[1, 0, 0]}
					map={decal}
					rotation={[0, Math.PI / 2, 0]}
				/>
				{/* 左侧贴图 */}
				<Decal
					position={[-1, 0, 0]}
					map={decal}
					rotation={[0, -Math.PI / 2, 0]}
				/>
				{/* 顶部贴图 */}
				<Decal
					position={[0, 1, 0]}
					map={decal}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				{/* 底部贴图 */}
				<Decal
					position={[0, -1, 0]}
					map={decal}
					rotation={[Math.PI / 2, 0, 0]}
				/>
			</mesh>
		</Float>
	);
}

/**
 * 包装 3D 球体组件到 Canvas 中
 * @param {Object} props - 组件的属性对象
 * @param {string} props.icon - 球体贴图图标路径
 * @returns  包含 3D 球体的 Canvas 组件
 */
function BallCanvas({ icon, url }: { icon: string; url: string }) {
	return (
		<Canvas gl={{ preserveDrawingBuffer: true }} dpr={[1, 2]}>
			<OrbitControls enableZoom={false} />
			<Suspense fallback={<CanvasLoading />}>
				<Ball imgUrl={icon} url={url} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
}

/**
 * 技术栈组件
 * @function Tech
 * @returns  包含技术栈图标的布局
 */
function Tech() {
	return (
		<div className="grid sm:grid-cols-6 grid-cols-3 gap-2 place-items-center h-full">
			{technologies.map(({ name, image, url }) => (
				<div className="w-20 h-20" key={name}>
					<BallCanvas icon={image} url={url} />
				</div>
			))}
		</div>
	);
}

export default Tech;
