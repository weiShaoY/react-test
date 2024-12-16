import { useCallback } from "react";
import { useNavigate } from "react-router";

function MobileMenu({
	menuList,
}: { menuList: { key: string; label: string }[] }) {
	const navigate = useNavigate();

	// 选择菜单项
	const handleSelect = useCallback(
		(key: string) => {
			// 延迟跳转，确保动画完成
			navigate(key);
		},
		[navigate],
	);

	return (
		<div className="sm:flex hidden items-center gap-5 ">
			{menuList.map((item) => (
				<div
					key={item.key}
					className="text-[#D0D2D6] cursor-pointer hover:text-white  flex items-center   font-bold text-lg "
					onClick={() => handleSelect(item.key)}
				>
					{item.label}
				</div>
			))}
		</div>
	);
}

export default MobileMenu;
