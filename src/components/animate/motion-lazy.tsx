import { LazyMotion, domMax, m } from "framer-motion";

type Props = {
	children: React.ReactNode;
};

/**
 * 通过懒加载 Motion 的功能子集来减少包的体积
 * 详情请参考: https://www.framer.com/motion/lazy-motion/
 */
export function MotionLazy({ children }: Props) {
	return (
		/**
		 * 使用 LazyMotion 包裹子组件，以懒加载 Motion 的功能，
		 * `strict` 属性用于启用严格模式，`features` 设置为 `domMax`，使用完整的 DOM 动画功能
		 */
		<LazyMotion strict features={domMax}>
			{/* 使用 Framer Motion 的 `m.div` 组件包裹子组件，提供动画支持 */}
			<m.div style={{ height: "100%" }}>{children}</m.div>
		</LazyMotion>
	);
}
