import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { SvgIcon } from "@/components/icon";

function DropdownMenu({ headerHeight = 80 }) {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);

	// 切换菜单显示状态
	const toggleMenu = useCallback(() => {
		setIsOpen((prevState) => !prevState);
	}, []);

	const items = [
		{
			key: "/home/about",
			label: "About",
		},
		{
			key: "/home/resume",
			label: "Resume",
		},
		{
			key: "/code",
			label: "Code",
		},
	];

	// 选择菜单项
	const handleSelect = useCallback(
		(key: string) => {
			setIsOpen(false);
			navigate(key);
		},
		[navigate],
	);

	return (
		<>
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
			{isOpen && (
				<div
					className={
						"fixed  left-0 right-0 bottom-0 flex flex-col bg-black bg-opacity-70   transition-all duration-500 ease-in-out "
					}
					style={{ top: `${headerHeight}px` }}
				>
					{/* 操作组 */}
					<div
						className={`bg-[#333639] overflow-hidden max-h-0 transition-max-height duration-500 ease-in-out   ${
							isOpen ? "max-h-64" : "max-h-0"
						}`}
					>
						{items.map((item) => (
							<div
								key={item.key}
								className="text-white cursor-pointer hover:bg-[#D0D2D6] h-16 flex items-center  font-bold text-[18px] px-5 "
								onClick={() => handleSelect(item.key)}
							>
								{item.label}
							</div>
						))}
					</div>
					<div onClick={() => setIsOpen(false)} className="flex-1 " />
				</div>
			)}
		</>
	);
}

export default DropdownMenu;
