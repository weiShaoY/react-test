import { useLayoutEffect } from "react";
import type {
	Material,
	Mesh,
	Object3D,
	WebGLProgramParametersWithUniforms,
} from "three";
import type CustomShaderMaterial from "three-custom-shader-material/vanilla";
import type { ObjectMap } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";

const useModifyCSM = (gltf: GLTF & ObjectMap, mat: CustomShaderMaterial) => {
	useLayoutEffect(() => {
		gltf.scene.traverse((child: Object3D) => {
			if ((child as Mesh).isMesh) {
				const mesh = child as Mesh;
				mesh.material = mat;
			}
		});
	}, []);
};

const useModifyMaterial = (
	gltf: GLTF & ObjectMap,
	onBeforeCompileFn: (shader: WebGLProgramParametersWithUniforms) => void,
) => {
	useLayoutEffect(() => {
		gltf.scene.traverse((child: Object3D) => {
			if ((child as Mesh).isMesh) {
				const mesh = child as Mesh;
				const mat = mesh.material as Material;
				mat.onBeforeCompile = onBeforeCompileFn;
			}
		});
	}, []);
};

export { useModifyCSM, useModifyMaterial };
