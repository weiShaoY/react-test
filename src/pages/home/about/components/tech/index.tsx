import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Float,
	Decal,
	Preload,
	useTexture,
} from "@react-three/drei";
import { Suspense } from "react"; // 如需加载器功能可取消注释

import { CanvasLoading } from "@/components/loading";

import html from "@/assets/images/home/tech/html.png";
import javascript from "@/assets/images/home/tech/javascript.png";
import typescript from "@/assets/images/home/tech/typescript.png";
import css from "@/assets/images/home/tech/css.png";
import angular from "@/assets/images/home/tech/angular.svg";

/**
 * 技术栈数据
 * @constant {Array<{name: string, icon: string}>}
 * @property {string} name - 技术名称
 * @property {string} icon - 技术对应的图标路径
 */
const technologies = [
	{
		name: "html",
		icon: html,
		url: "https://developer.mozilla.org/zh-CN/docs/Web/HTML",
	},
	{
		name: "css",
		icon: css,
		url: "https://developer.mozilla.org/zh-CN/docs/Web/CSS",
	},

	{
		name: "javaScript",
		icon: javascript,
		url: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
	},
	{
		name: "typeScript",
		icon: typescript,
		url: "https://www.typescriptlang.org/zh/",
	},
	{
		name: "react",
		icon: javascript,
		url: "https://zh-hans.react.dev/",
	},
	{
		name: "vue",
		icon: angular,
		url: "https://cn.vuejs.org/",
	},
	{
		name: "tailwindCSS",
		icon: angular,
		url: "https://tailwindcss.com/docs/installation",
	},
	{
		name: "unocss",
		icon: angular,
		url: "https://unocss-cn.pages.dev/",
	},
	{
		name: "threeJS",
		icon: angular,
		url: "https://threejs.org/",
	},
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
				onClick={(event) => {
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
				{/* <Decal position={[0, 0, 1]} map={decal} rotation={[0, 0, 0]} /> */}

				{/* 正面贴图 */}
				<Decal
					position={[0, 0, 1]}
					map={decal}
					rotation={[Math.PI * 2, 0, 0]}
				/>
				{/* 背面贴图 */}
				<Decal
					position={[0, 0, -1]}
					map={decal}
					rotation={[0, Math.PI, 0]} // 朝后旋转
				/>
				{/* 左侧贴图 */}
				<Decal
					position={[-1, 0, 0]}
					map={decal}
					rotation={[0, Math.PI / 2, 0]} // 无需修正 Z 轴
				/>
				{/* 右侧贴图 */}
				<Decal
					position={[1, 0, 0]}
					map={decal}
					rotation={[0, -Math.PI / 2, 0]} // 无需修正 Z 轴
				/>
				{/* 顶部贴图 */}
				<Decal
					position={[0, 1, 0]}
					map={decal}
					rotation={[Math.PI / 2, 0, 0]} // 朝上旋转
				/>
				{/* 底部贴图 */}
				<Decal
					position={[0, -1, 0]}
					map={decal}
					rotation={[-Math.PI / 2, 0, 0]} // 朝下旋转
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
 * 渲染技术栈列表
 * @function Tech
 * @returns  包含技术栈图标的布局
 */
function Tech() {
	return (
		<div className="flex flex-row flex-wrap justify-center gap-10">
			{technologies.map(({ name, icon, url }) => (
				<div className="w-29 h-28" key={name}>
					<BallCanvas icon={icon} url={url} />
				</div>
			))}
		</div>
	);
}

/**
 * 高阶组件：为子组件添加样式和布局
 * @function SectionWrapper
 * @param {React.ComponentType} Component - 子组件
 * @param {string} idName - 用于标识的 DOM 元素 id
 * @returns {React.FC} 包装后的高阶组件
 */
function SectionWrapper(
	Component: React.ComponentType,
	idName: string,
): React.FC {
	return function WrappedComponent() {
		return (
			<div
				className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
				id={idName}
			>
				<Component />
			</div>
		);
	};
}

export default SectionWrapper(Tech, "");
