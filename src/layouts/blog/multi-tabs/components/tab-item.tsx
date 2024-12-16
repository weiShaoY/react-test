// components/TabItem.tsx
import { Dropdown, type MenuProps } from "antd";
import { Iconify } from "@/components/icon";
import { MultiTabOperation } from "#/enum";
import type { TabItemProps } from "../types";
import { useMultiTabsContext } from "../providers/multi-tabs-provider";
import { useTabLabelRender } from "../hooks/use-tab-label-render";

export function TabItem({
	tab,
	isActive,
	isHovering,
	style,
	onClose,
	onMouseEnter,
	onMouseLeave,
}: TabItemProps) {
	const {
		tabs,
		refreshTab,
		closeTab,
		closeOthersTab,
		closeLeft,
		closeRight,
		closeAll,
	} = useMultiTabsContext();
	const renderTabLabel = useTabLabelRender();

	const menuItems: MenuProps["items"] = [
		{
			label: "刷新",
			key: MultiTabOperation.REFRESH,
			icon: <Iconify icon="mdi:reload" size={18} />,
		},
		{
			label: "关闭标签页",
			key: MultiTabOperation.CLOSE,
			icon: <Iconify icon="material-symbols:close" size={18} />,
			disabled: tabs.length === 1,
		},
		{
			type: "divider",
		},
		{
			label: "关闭左侧标签页",
			key: MultiTabOperation.CLOSELEFT,
			icon: (
				<Iconify
					icon="material-symbols:tab-close-right-outline"
					size={18}
					className="rotate-180"
				/>
			),
			disabled: tabs.findIndex((t) => t.key === tab.key) === 0,
		},
		{
			label: "关闭右侧标签页",
			key: MultiTabOperation.CLOSERIGHT,
			icon: (
				<Iconify icon="material-symbols:tab-close-right-outline" size={18} />
			),
			disabled: tabs.findIndex((t) => t.key === tab.key) === tabs.length - 1,
		},
		{
			type: "divider",
		},
		{
			label: "关闭其它标签页",
			key: MultiTabOperation.CLOSEOTHERS,
			icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
			disabled: tabs.length === 1,
		},
		{
			label: "关闭所有标签页",
			key: MultiTabOperation.CLOSEALL,
			icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
		},
	];

	const menuClick = (menuInfo: any) => {
		const { key, domEvent } = menuInfo;
		domEvent.stopPropagation();

		switch (key) {
			case MultiTabOperation.REFRESH:
				refreshTab(tab.key);
				break;
			case MultiTabOperation.CLOSE:
				closeTab(tab.key);
				break;
			case MultiTabOperation.CLOSEOTHERS:
				closeOthersTab(tab.key);
				break;
			case MultiTabOperation.CLOSELEFT:
				closeLeft(tab.key);
				break;
			case MultiTabOperation.CLOSERIGHT:
				closeRight(tab.key);
				break;
			case MultiTabOperation.CLOSEALL:
				closeAll();
				break;
			default:
				break;
		}
	};

	return (
		<Dropdown
			trigger={["contextMenu"]}
			menu={{
				items: menuItems,
				onClick: menuClick,
			}}
		>
			<div
				className="relative mx-px flex select-none items-center px-4 py-1"
				style={style}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<div>{renderTabLabel(tab)}</div>
				{!tab.hideTab && (tabs.length > 1 || isActive || isHovering) && (
					<Iconify
						icon="ion:close-outline"
						size={18}
						className="ml-2 cursor-pointer opacity-50"
						onClick={(e) => {
							e.stopPropagation();
							onClose();
						}}
					/>
				)}
			</div>
		</Dropdown>
	);
}
