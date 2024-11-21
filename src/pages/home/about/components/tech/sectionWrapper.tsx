import { LazyMotion, domAnimation, m } from "framer-motion";

const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => {
	return {
		hidden: {}, // 初始状态
		show: {
			transition: {
				staggerChildren,
				delayChildren,
			},
		},
	};
};

const SectionWrapper = (Component, idName) =>
	function HighOrderComponent() {
		return (
			<LazyMotion features={domAnimation}>
				<m.section
					// 替换 motion.section 为 m.section
					variants={staggerContainer(0.2, 0.1)}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.1 }}
					className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
				>
					<span className="hash-span" id={idName}>
						&nbsp;
					</span>
					<Component />
				</m.section>
			</LazyMotion>
		);
	};

export default SectionWrapper;
