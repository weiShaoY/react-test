import Logo from "@/components/logo";

/**
 * 简单布局组件的头部
 *
 * @returns {JSX.Element} 渲染一个带 Logo 和设置按钮的头部
 */
export default function HeaderSimple(): JSX.Element {
	return (
		<header className="flex h-16 w-full items-center justify-between px-6">
			{/* 渲染 Logo，设置大小为 30 */}

			<Logo />
		</header>
	);
}
