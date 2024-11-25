import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ComponentType } from "react";
/**
 * 创建一个交错动画容器的配置
 * @function staggerContainer
 * @param {number} staggerChildren - 每个子元素动画的间隔时间（秒）
 * @param {number} [delayChildren=0] - 子元素动画开始的延迟时间（秒）
 * @returns {Variants} 动画配置对象
 */
const staggerContainer = (
	staggerChildren: number,
	delayChildren = 0,
): Variants => {
	return {
		hidden: {}, // 初始隐藏状态
		show: {
			transition: {
				staggerChildren, // 子元素之间的动画间隔
				delayChildren, // 动画延迟时间
			},
		},
	};
};

/**
 * 高阶组件：为子组件添加动画和布局
 * @function SectionWrapper
 * @param {ComponentType} Component - 接收的子组件
 * @param {string} idName - 组件的 DOM 元素 id 标识
 * @returns {ComponentType} 包装后的高阶组件
 * @description className 为 "sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
 */
const SectionWrapper = (
	Component: ComponentType,
	idName: string,
): ComponentType => {
	return function HighOrderComponent() {
		return (
			<LazyMotion features={domAnimation}>
				<m.section
					// 定义动画配置
					variants={staggerContainer(0.2, 0.1)}
					// 初始动画状态
					initial="hidden"
					// 当元素进入视口时触发的状态
					whileInView="show"
					// 视口配置，动画只触发一次
					viewport={{ once: true, amount: 0.1 }}
					className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
				>
					{/* 用于定位的占位元素 */}
					<span className="mt--25 pb-25 block" id={idName}>
						&nbsp;
					</span>
					{/* 渲染传入的组件 */}
					<Component />
				</m.section>
			</LazyMotion>
		);
	};
};

export default SectionWrapper;
