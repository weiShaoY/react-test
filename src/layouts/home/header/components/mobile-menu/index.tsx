import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { SvgIcon } from "@/components/icon";

function MobileMenu({
	headerHeight = 80,
	menuList,
}: { headerHeight: number; menuList: { key: string; label: string }[] }) {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);

	// 切换菜单显示状态
	const toggleMenu = useCallback(() => {
		setIsOpen((prevState) => !prevState);
	}, []);

	// 选择菜单项
	const handleSelect = useCallback(
		(key: string) => {
			setIsOpen(false);
			// 延迟跳转，确保动画完成
			setTimeout(() => {
				navigate(key);
			}, 500); // 500ms 是关闭菜单的动画时间，可以根据实际情况调整
		},
		[navigate],
	);

	return (
		<div className="sm:hidden block">
			{/* 下拉按钮 */}
			<button
				ref={buttonRef} // 引用按钮元素
				onClick={toggleMenu}
				className={`rounded-md h-10 aspect-square hover:bg-[#333639] ${isOpen ? "bg-[#333639]" : ""}`}
				type="button"
			>
				{isOpen ? (
					<SvgIcon icon="home-menuB" size="24" color="#fff" />
				) : (
					<SvgIcon icon="home-menuA" size="24" color="#fff" />
				)}
			</button>

			{/* 弹出层 */}
			<div
				className={`fixed  left-0 right-0 bottom-0 flex flex-col bg-black bg-opacity-70 overflow-hidden  transition-max-height duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
				style={{ top: `${headerHeight}px` }}
			>
				{/* 操作组 */}
				<div className={"bg-[#333639]"}>
					{menuList.map((item) => (
						<div
							key={item.key}
							className="text-white cursor-pointer hover:bg-[#D0D2D6]  flex items-center  rounded-md font-bold text-lg p-3 m-3"
							onClick={() => handleSelect(item.key)}
						>
							{item.label}
						</div>
					))}
				</div>
				<div onClick={() => setIsOpen(false)} className={"flex-1 "} />
			</div>
		</div>
	);
}

export default MobileMenu;
