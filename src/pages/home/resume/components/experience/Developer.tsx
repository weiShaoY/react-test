import { useAnimations, useFBX, useGLTF } from "@react-three/drei"; // 导入用于加载动画、FBX 和 GLTF 的钩子
import { useGraph } from "@react-three/fiber"; // 导入用于处理 Three.js 场景的 Hook
import React, { useEffect, useRef } from "react"; // 导入 React 及相关 Hook
import type * as THREE from "three"; // 导入类型定义，以便使用 Three.js 的类型
import { SkeletonUtils } from "three-stdlib"; // 导入 Three.js 的工具类，用于克隆骨架

/**
 *  开发者组件
 *  @param animationName - 动画名称
 *  @param scale - 缩放比例
 *  @param positionY - Y 轴位置
 */
const Developer = ({
	animationName = "idle",
	scale = 3,
	positionY = -3,
}: { animationName?: string; scale?: number; positionY?: number }) => {
	// 创建对 3D 模型组的引用
	const group = useRef<THREE.Group>(null);

	// 使用 useGLTF 钩子加载 GLTF 模型，返回场景数据
	const { scene } = useGLTF(
		"/models/home-resume-experience-developer/index.glb",
	);
	// 使用 useMemo 钩子确保场景仅在加载后克隆一次
	const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);

	// 使用 useGraph 钩子获取模型节点和材质
	const { nodes, materials } = useGraph(clone);

	// 使用 useFBX 钩子加载多个 FBX 动画文件

	// 加载 "idle" 动画
	const { animations: idleAnimation } = useFBX(
		"/models/home-resume-experience-developer/idle.fbx",
	);
	// 加载 "salute" 动画
	const { animations: saluteAnimation } = useFBX(
		"/models/home-resume-experience-developer/salute.fbx",
	);
	// 加载 "clapping" 动画
	const { animations: clappingAnimation } = useFBX(
		"/models/home-resume-experience-developer/clapping.fbx",
	);

	// 加载 "victory" 动画
	const { animations: victoryAnimation } = useFBX(
		"/models/home-resume-experience-developer/victory.fbx",
	);

	// 为每个动画命名，方便后续控制
	idleAnimation[0].name = "idle"; // 为 "idle" 动画设置名称
	saluteAnimation[0].name = "salute"; // 为 "salute" 动画设置名称
	clappingAnimation[0].name = "clapping"; // 为 "clapping" 动画设置名称
	victoryAnimation[0].name = "victory"; // 为 "victory" 动画设置名称

	// 使用 useAnimations 钩子管理动画动作
	const { actions } = useAnimations(
		[
			idleAnimation[0], // 加载 "idle" 动画
			saluteAnimation[0], // 加载 "salute" 动画
			clappingAnimation[0], // 加载 "clapping" 动画
			victoryAnimation[0], // 加载 "victory" 动画
		],
		group, // 将动画绑定到 3D 模型组
	);

	// 使用 useEffect 钩子，控制动画的播放和停止
	useEffect(() => {
		// 根据 animationName 选择要播放的动画动作
		const action = actions[animationName];
		if (action) {
			// 如果动画存在，先重置，淡入并播放
			action.reset().fadeIn(0.5).play();
		}

		// 返回一个清理函数，在组件卸载时停止动画
		return () => {
			if (action) {
				// 在组件卸载时，动画淡出停止
				action.fadeOut(0.5);
			}
		};
	}, [animationName, actions]); // 依赖 animationName 和 actions，当其改变时重新执行

	// 预加载 GLTF 模型
	useGLTF.preload("/models/home-resume-experience-developer/index.glb");

	// 渲染 3D 模型
	return (
		<group ref={group} scale={scale} position-y={positionY} dispose={null}>
			{/*  包裹所有模型，group 是根节点 */}
			<primitive object={nodes.Hips} />
			{/* 渲染模型的 "Hips" 部分 */}
			{/* 渲染头发部分 */}
			<skinnedMesh
				geometry={(nodes.Wolf3D_Hair as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Hair} // 设置材质
				skeleton={(nodes.Wolf3D_Hair as THREE.SkinnedMesh).skeleton} // 设置骨架
			/>
			{/* 渲染眼镜部分 */}
			<skinnedMesh
				geometry={(nodes.Wolf3D_Glasses as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Glasses} // 设置材质
				skeleton={(nodes.Wolf3D_Glasses as THREE.SkinnedMesh).skeleton} // 设置骨架
			/>
			{/* 渲染身体部分 */}
			<skinnedMesh
				geometry={(nodes.Wolf3D_Body as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Body} // 设置材质
				skeleton={(nodes.Wolf3D_Body as THREE.SkinnedMesh).skeleton} // 设置骨架
			/>
			{/* 渲染下身服装部分 */}
			<skinnedMesh
				geometry={(nodes.Wolf3D_Outfit_Bottom as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Outfit_Bottom} // 设置材质
				skeleton={(nodes.Wolf3D_Outfit_Bottom as THREE.SkinnedMesh).skeleton} // 设置骨架
			/>
			{/* 渲染鞋子部分 */}
			<skinnedMesh
				geometry={(nodes.Wolf3D_Outfit_Footwear as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Outfit_Footwear} // 设置材质
				skeleton={(nodes.Wolf3D_Outfit_Footwear as THREE.SkinnedMesh).skeleton} // 设置骨架
			/>
			{/* 渲染上身服装部分 */}
			<skinnedMesh
				geometry={(nodes.Wolf3D_Outfit_Top as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Outfit_Top} // 设置材质
				skeleton={(nodes.Wolf3D_Outfit_Top as THREE.SkinnedMesh).skeleton} // 设置骨架
			/>
			{/* 渲染左眼部分 */}
			<skinnedMesh
				name="EyeLeft"
				geometry={(nodes.EyeLeft as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Eye} // 设置材质
				skeleton={(nodes.EyeLeft as THREE.SkinnedMesh).skeleton} // 设置骨架
				morphTargetDictionary={
					(nodes.EyeLeft as THREE.SkinnedMesh).morphTargetDictionary
				} // 设置变形目标字典
				morphTargetInfluences={
					(nodes.EyeLeft as THREE.SkinnedMesh).morphTargetInfluences
				} // 设置变形目标的影响
			/>
			{/* 渲染右眼部分 */}
			<skinnedMesh
				name="EyeRight"
				geometry={(nodes.EyeRight as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Eye} // 设置材质
				skeleton={(nodes.EyeRight as THREE.SkinnedMesh).skeleton} // 设置骨架
				morphTargetDictionary={
					(nodes.EyeRight as THREE.SkinnedMesh).morphTargetDictionary
				} // 设置变形目标字典
				morphTargetInfluences={
					(nodes.EyeRight as THREE.SkinnedMesh).morphTargetInfluences
				} // 设置变形目标的影响
			/>
			{/* 渲染头部部分 */}
			<skinnedMesh
				name="Wolf3D_Head"
				geometry={(nodes.Wolf3D_Head as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Skin} // 设置材质
				skeleton={(nodes.Wolf3D_Head as THREE.SkinnedMesh).skeleton} // 设置骨架
				morphTargetDictionary={
					(nodes.Wolf3D_Head as THREE.SkinnedMesh).morphTargetDictionary
				} // 设置变形目标字典
				morphTargetInfluences={
					(nodes.Wolf3D_Head as THREE.SkinnedMesh).morphTargetInfluences
				} // 设置变形目标的影响
			/>
			{/* 渲染牙齿部分 */}
			<skinnedMesh
				name="Wolf3D_Teeth"
				geometry={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).geometry} // 设置几何体
				material={materials.Wolf3D_Teeth} // 设置材质
				skeleton={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).skeleton} // 设置骨架
				morphTargetDictionary={
					(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).morphTargetDictionary
				} // 设置变形目标字典
				morphTargetInfluences={
					(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).morphTargetInfluences
				} // 设置变形目标的影响
			/>
		</group>
	);
};

export default Developer;
