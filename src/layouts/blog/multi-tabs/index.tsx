import { Dropdown, type MenuProps, Tabs, type TabsProps } from "antd";
import Color from "color";
import {
	type CSSProperties,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	DragDropContext,
	Draggable,
	Droppable,
	type OnDragEndResponder,
} from "react-beautiful-dnd";
import { useFullscreen, useToggle } from "react-use";
import styled from "styled-components";

import { Iconify } from "@/components/icon";
import { useRouter } from "@/router/hooks/blog";
import { replaceDynamicParams } from "@/router/hooks/blog/use-current-route-meta";
import { useSettings } from "@/store/settingStore";
import { useResponsive, useThemeToken } from "@/theme/hooks";

import dashboardConfig from "../config";

import { type KeepAliveTab, useMultiTabsContext } from "./multi-tabs-provider";

import { MultiTabOperation, ThemeLayout } from "#/enum";

type Props = {
	/**
	 *  是否偏移顶部
	 */
	offsetTop?: boolean;
};
export default function MultiTabs({ offsetTop = false }: Props) {
	const { push } = useRouter();
	const scrollContainer = useRef<HTMLDivElement>(null);
	const [hoveringTabKey, setHoveringTabKey] = useState("");
	const [openDropdownTabKey, setopenDropdownTabKey] = useState("");
	const themeToken = useThemeToken();

	const tabContentRef = useRef(null);
	const [fullScreen, toggleFullScreen] = useToggle(false);
	useFullscreen(tabContentRef, fullScreen, {
		onClose: () => toggleFullScreen(false),
	});

	const {
		tabs,
		activeTabRoutePath,
		setTabs,
		closeTab,
		refreshTab,
		closeOthersTab,
		closeAll,
		closeLeft,
		closeRight,
	} = useMultiTabsContext();

	/**
	 * tab 下拉菜单项
	 * @description 根据当前选中的 Tab 状态和标签页总数设置菜单项的禁用状态
	 */
	const menuItems = useMemo<MenuProps["items"]>(
		() => [
			{
				/** 全屏操作项 */
				label: "全屏", // 菜单项文本，通过国际化函数 `t` 获取
				key: MultiTabOperation.FULLSCREEN, // 菜单项的唯一标识符
				icon: <Iconify icon="material-symbols:fullscreen" size={18} />, // 菜单项图标
			},
			{
				/** 刷新操作项 */
				label: "刷新",
				key: MultiTabOperation.REFRESH,
				icon: <Iconify icon="mdi:reload" size={18} />,
			},
			{
				/** 关闭当前标签页操作项 */
				label: "关闭当前标签页",
				key: MultiTabOperation.CLOSE,
				icon: <Iconify icon="material-symbols:close" size={18} />,
				/**
				 * 禁用条件：
				 * - 当只有一个 Tab 时，不允许关闭
				 */
				disabled: tabs.length === 1,
			},
			{
				/** 菜单项分割线 */
				type: "divider",
			},
			{
				/** 关闭左侧标签页操作项 */
				label: "关闭左侧标签页",
				key: MultiTabOperation.CLOSELEFT,
				icon: (
					<Iconify
						icon="material-symbols:tab-close-right-outline"
						size={18}
						className="rotate-180" // 图标旋转 180 度表示关闭左侧
					/>
				),
				/**
				 * 禁用条件：
				 * - 当前选中的 Tab 为第一个时，不允许关闭左侧标签页
				 */
				disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === 0,
			},
			{
				/** 关闭右侧标签页操作项 */
				label: "关闭右侧标签页",
				key: MultiTabOperation.CLOSERIGHT,
				icon: (
					<Iconify icon="material-symbols:tab-close-right-outline" size={18} />
				),
				/**
				 * 禁用条件：
				 * - 当前选中的 Tab 为最后一个时，不允许关闭右侧标签页
				 */
				disabled:
					tabs.findIndex((tab) => tab.key === openDropdownTabKey) ===
					tabs.length - 1,
			},
			{
				/** 菜单项分割线 */
				type: "divider",
			},
			{
				/** 关闭其他标签页操作项 */
				label: "关闭其他标签页",
				key: MultiTabOperation.CLOSEOTHERS,
				icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
				/**
				 * 禁用条件：
				 * - 当只有一个 Tab 时，不允许关闭其他标签页
				 */
				disabled: tabs.length === 1,
			},
			{
				/** 关闭所有标签页操作项 */
				label: "关闭所有标签页",
				key: MultiTabOperation.CLOSEALL,
				icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
			},
		],
		/**
		 * 依赖项：
		 * - `openDropdownTabKey`: 当前打开的下拉菜单对应的 Tab 键
		 * - `t`: 国际化函数，用于获取不同语言的文本
		 * - `tabs`: 当前存在的标签页数组，用于判断菜单项的禁用状态
		 */
		[openDropdownTabKey, tabs],
	);

	/**
	 * tab 下拉菜单点击事件处理
	 *
	 * @param  menuInfo - 菜单信息
	 * @param  tab - 当前 tab
	 */
	const menuClick = useCallback(
		(menuInfo: any, tab: KeepAliveTab) => {
			const { key, domEvent } = menuInfo;

			// 阻止点击事件的冒泡，防止触发其他事件监听器
			domEvent.stopPropagation();

			switch (key) {
				/**
				 * 刷新当前 Tab
				 */
				case MultiTabOperation.REFRESH:
					refreshTab(tab.key);
					break;

				/**
				 * 关闭当前 Tab
				 */
				case MultiTabOperation.CLOSE:
					closeTab(tab.key);
					break;

				/**
				 * 关闭除当前 Tab 以外的所有 Tab
				 */
				case MultiTabOperation.CLOSEOTHERS:
					closeOthersTab(tab.key);
					break;

				/**
				 * 关闭当前 Tab 左侧的所有 Tab
				 */
				case MultiTabOperation.CLOSELEFT:
					closeLeft(tab.key);
					break;

				/**
				 * 关闭当前 Tab 右侧的所有 Tab
				 */
				case MultiTabOperation.CLOSERIGHT:
					closeRight(tab.key);
					break;

				/**
				 * 关闭所有 Tab
				 */
				case MultiTabOperation.CLOSEALL:
					closeAll();
					break;

				/**
				 * 切换全屏模式
				 */
				case MultiTabOperation.FULLSCREEN:
					toggleFullScreen();
					break;

				/**
				 * 默认情况，不执行任何操作
				 * @default - 未识别的操作标识符
				 */
				default:
					break;
			}
		},
		[
			refreshTab,
			closeTab,
			closeOthersTab,
			closeLeft,
			closeRight,
			closeAll,
			toggleFullScreen,
		],
	);

	/**
	 *  处理下拉菜单打开状态变化
	 *  @description 当下拉菜单的打开状态发生变化时，更新对应的 Tab 的下拉菜单状态。
	 *  @param  open - 是否展开
	 *  @param  tab - 当前 tab
	 */
	const onOpenChange = (open: boolean, tab: KeepAliveTab) => {
		// 如果下拉菜单打开，设置当前打开的 Tab 的 key；如果关闭，重置 key 为 ''
		if (open) {
			setopenDropdownTabKey(tab.key);
		} else {
			setopenDropdownTabKey("");
		}
	};

	/**
	 * 计算 Tab 样式
	 * @description 根据 Tab 的激活状态或悬停状态，动态计算并返回对应的 CSS 样式对象。
	 * @param  tab - 当前 Tab 对象
	 * @returns  返回应用于 Tab 的样式对象
	 */
	const calcTabStyle: (tab: KeepAliveTab) => CSSProperties = useCallback(
		(tab) => {
			/**
			 * 判断当前 Tab 是否为激活状态或悬停状态
			 */
			const isActive =
				tab.key === activeTabRoutePath || tab.key === hoveringTabKey;

			/**
			 * 初始化样式对象
			 */
			const result: CSSProperties = {
				/**
				 * 设置 Tab 的圆角样式（左上和右上圆角）
				 */
				borderRadius: "8px 8px 0 0",

				/**
				 * 设置边框宽度
				 */
				borderWidth: "1px",

				/**
				 * 设置边框样式
				 */
				borderStyle: "solid",

				/**
				 * 设置边框颜色，使用主题中的次要边框颜色
				 */
				borderColor: themeToken.colorBorderSecondary,

				/**
				 * 设置背景颜色，使用主题中的布局背景颜色
				 */
				backgroundColor: themeToken.colorBgLayout,

				/**
				 * 设置过渡效果，用于颜色和背景颜色变化的动画
				 */
				transition:
					"color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			};

			/**
			 * 如果当前 Tab 为激活状态（包括悬停状态）
			 */
			if (isActive) {
				/**
				 * 设置背景颜色为主题中的容器背景颜色
				 */
				result.backgroundColor = themeToken.colorBgContainer;

				/**
				 * 设置文字颜色为主题中的主要文字颜色
				 */
				result.color = themeToken.colorPrimaryText;
			}

			/**
			 * 返回计算后的样式对象
			 */
			return result;
		},
		/**
		 * 依赖项列表，依赖于当前激活的 Tab 路由路径、悬停的 Tab key 以及主题 token
		 */
		[activeTabRoutePath, hoveringTabKey, themeToken],
	);

	/**
	 * 渲染单个 tab 标签
	 * @param  tab - 当前 tab
	 */
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const renderTabLabel = useCallback(
		(tab: KeepAliveTab) => {
			//  如果当前 Tab 配置为隐藏，则返回 null，不进行渲染
			if (tab.hideTab) return null;

			// 使用 Dropdown 组件，为 Tab 标签添加右键菜单功能
			return (
				<Dropdown
					trigger={["contextMenu"]}
					menu={{
						items: menuItems,
						onClick: (menuInfo) => menuClick(menuInfo, tab),
					}}
					onOpenChange={(open) => onOpenChange(open, tab)}
				>
					<div
						className="relative mx-px flex select-none items-center px-4 py-1"
						style={calcTabStyle(tab)}
						onMouseEnter={() => {
							// 如果 Tab 为激活状态，不更新悬停状态
							if (tab.key === activeTabRoutePath) {
								return;
							}
							// 设置当前悬停的 Tab key
							setHoveringTabKey(tab.key);
						}}
						onMouseLeave={() => setHoveringTabKey("")}
					>
						{/* 判断是否使用特殊渲染映射表 如果在 SpecialTabRenderMap 中存在对应的渲染函数，则调用该函数渲染 否则使用默认的翻译函数 t() 进行渲染 */}
						<div>{tab.label}</div>

						{/* 关闭按钮 */}
						<Iconify
							icon="ion:close-outline"
							size={18}
							className="cursor-pointer opacity-50"
							onClick={(e) => {
								e.stopPropagation();
								// 调用关闭 Tab 的函数
								closeTab(tab.key);
							}}
							/**
							 * 动态设置关闭按钮的可见性
							 * - 如果当前 Tab 为激活状态或悬停状态，且存在多个 Tab，则按钮可见
							 * - 否则按钮隐藏
							 */
							style={{
								visibility:
									(tab.key !== activeTabRoutePath &&
										tab.key !== hoveringTabKey) ||
									tabs.length === 1
										? "hidden"
										: "visible",
							}}
						/>
					</div>
				</Dropdown>
			);
		},
		[
			menuItems,
			activeTabRoutePath,
			hoveringTabKey,
			tabs.length,
			menuClick,
			closeTab,
			calcTabStyle,
		],
	);

	/**
	 * 创建所有 Tab 项
	 * @description 使用 `useMemo` 钩子生成 Tab 项列表，以优化性能。每个 Tab 包含标签（`label`）、键（`key`）和子元素（`children`）。
	 * @returns Tab 项列表
	 */
	const tabItems = useMemo(() => {
		return tabs?.map((tab) => ({
			/**
			 *  Tab 标签
			 */
			label: renderTabLabel(tab),
			/**
			 *  Tab 键
			 */
			key: tab.key,
			/**
			 *  Tab 是否可关闭 (保证至少保留一个 Tab，不可关闭)
			 */
			closable: tabs.length > 1,

			children: (
				<div ref={tabContentRef} key={tab.timeStamp}>
					{tab.children}
				</div>
			),
		}));
	}, [tabs, renderTabLabel]);

	/**
	 * 拖拽结束事件处理函数
	 * @description 当用户拖拽 Tab 完成时，重新排列 Tab 的顺序，并更新状态。
	 */
	const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
		// 检查目标位置是否有效（未拖拽到可放置区域时直接返回）
		if (!destination) {
			return;
		}
		// 如果拖拽后位置未发生变化，直接返回
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		/**
		 *  重新排序 Tabs 数组
		 */
		const newTabs = Array.from(tabs);

		/**
		 *  移动 Tab
		 */
		const [movedTab] = newTabs.splice(source.index, 1);

		//  插入到目标位置
		newTabs.splice(destination.index, 0, movedTab);

		// 更新状态
		setTabs(newTabs);
	};

	const { themeLayout } = useSettings();

	const { colorBorder, colorBgElevated } = useThemeToken();

	const { screenMap } = useResponsive();

	/**
	 * 多标签栏样式配置
	 * @description 定义多标签栏的固定位置、尺寸、背景颜色、边框样式和过渡动画效果。
	 */
	const multiTabsStyle: CSSProperties = {
		/**
		 * 设置定位方式为固定定位，确保多标签栏始终位于视口顶部位置，不随页面滚动而移动
		 */
		position: "fixed",

		/**
		 * 根据是否有偏移量动态计算顶部位置
		 * - 如果有偏移量 `offsetTop` 为 `true`，则使用 `dashboardConfig.OFFSET_HEADER_HEIGHT - 2`
		 * - 否则使用 `dashboardConfig.HEADER_HEIGHT`
		 */
		top: offsetTop
			? dashboardConfig.OFFSET_HEADER_HEIGHT - 2
			: dashboardConfig.HEADER_HEIGHT,

		/**
		 * 设置多标签栏的左侧位置为 0，贴合页面左侧
		 */
		left: 0,

		/**
		 * 设置多标签栏的高度
		 * - 使用配置中的 `MULTI_TABS_HEIGHT` 值
		 */
		height: dashboardConfig.MULTI_TABS_HEIGHT,

		/**
		 * 背景颜色
		 * - 使用 `Color` 库调整背景颜色 `colorBgElevated`，并设置透明度为 1
		 */
		backgroundColor: Color(colorBgElevated).alpha(1).toString(),

		/**
		 * 设置下边框样式为虚线，增加 0.6 的透明度
		 */
		borderBottom: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,

		/**
		 * 顶部位置的过渡效果
		 * - 使用 `cubic-bezier(0.4, 0, 0.2, 1)` 的缓动函数
		 * - 动画时长为 200ms，延迟为 0ms
		 */
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

		width: "100%",
	};

	// 判断主题布局为水平布局时
	if (themeLayout === ThemeLayout.Horizontal) {
		/**
		 * 如果当前主题布局为水平布局（Horizontal），则调整多标签栏的顶部位置
		 * - 顶部位置为：`HEADER_HEIGHT`（页头高度） + `NAV_HORIZONTAL_HEIGHT`（水平导航栏高度） - 2 像素
		 * - 这样设置是为了避免标签栏与导航栏重叠
		 */
		multiTabsStyle.top =
			dashboardConfig.HEADER_HEIGHT + dashboardConfig.NAV_HORIZONTAL_HEIGHT - 2;
	} else if (screenMap.md) {
		// 当前屏幕宽度为中等尺寸（md）及以上时
		/**
		 * 设置多标签栏在屏幕中等尺寸（md）及以上的样式
		 * - 将多标签栏的 `right` 设置为 `0px`，使其靠近右边缘
		 * - 将 `left` 设置为 `auto`，即自动计算左侧距离
		 * - 设置 `width` 为计算宽度，具体为：
		 *   - 当主题布局为垂直布局（Vertical）时，减去导航栏宽度 `NAV_WIDTH`
		 *   - 当主题布局为折叠导航栏（Collapsed）时，减去折叠导航栏宽度 `NAV_COLLAPSED_WIDTH`
		 */
		multiTabsStyle.right = "0px";
		multiTabsStyle.left = "auto";
		multiTabsStyle.width = `calc(100% - ${
			themeLayout === ThemeLayout.Vertical
				? dashboardConfig.NAV_WIDTH
				: dashboardConfig.NAV_COLLAPSED_WIDTH
		}px`;
	}

	/**
	 * 处理 Tab 点击事件
	 * @description 在 Tab 被点击时，根据动态参数替换路由路径，并导航到目标路径。
	 */
	const handleTabClick = ({ key, params = {} }: KeepAliveTab) => {
		/**
		 *  使用动态参数替换路径中的占位符
		 */
		const tabKey = replaceDynamicParams(key, params);

		// 跳转到点击的 Tab 路由路径
		push(tabKey);
	};

	const renderTabBar: TabsProps["renderTabBar"] = () => {
		return (
			<div style={multiTabsStyle} className="z-20 w-full">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="tabsDroppable" direction="horizontal">
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className="flex w-full"
							>
								<div
									ref={scrollContainer}
									className="hide-scrollbar flex w-full px-2"
								>
									{tabs.map((tab, index) => (
										<div
											id={`tab-${index}`}
											className="flex-shrink-0"
											key={tab.key}
											onClick={() => handleTabClick(tab)}
										>
											<Draggable
												key={tab.key}
												draggableId={tab.key}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className="w-auto"
													>
														{renderTabLabel(tab)}
													</div>
												)}
											</Draggable>
										</div>
									))}
								</div>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		);
	};

	/**
	 * 路由变化时，滚动到指定tab
	 */
	useEffect(() => {
		// 如果滚动容器未初始化，直接返回
		if (!scrollContainer || !scrollContainer.current) {
			return;
		}
		/**
		 *  获取当前激活 Tab 的索引
		 */
		const index = tabs.findIndex((tab) => tab.key === activeTabRoutePath);

		/**
		 *  根据索引在滚动容器中查找对应的 Tab 元素
		 */
		const currentTabElement = scrollContainer.current.querySelector(
			`#tab-${index}`,
		);

		/**
		 *  如果找到对应的 Tab 元素，则进行滚动操作
		 */
		if (currentTabElement) {
			currentTabElement.scrollIntoView({
				/**
				 *  只滚动到视图内最近的边界
				 */
				block: "nearest",
				/**
				 *  平滑滚动
				 */
				behavior: "smooth",
			});
		}
	}, [activeTabRoutePath, tabs]);

	/**
	 * 添加鼠标滚轮事件监听，实现水平滚动
	 */
	useEffect(() => {
		/**
		 *  处理鼠标滚轮事件的回调函数
		 */
		function handleMouseWheel(event: WheelEvent) {
			// 阻止默认的垂直滚动行为
			event.preventDefault();
			// 根据 `deltaY` 值进行水平滚动
			if (scrollContainer.current) {
				scrollContainer.current.scrollLeft += event.deltaY;
			}
		}

		if (scrollContainer.current) {
			scrollContainer.current.addEventListener("mouseenter", () => {
				if (scrollContainer.current) {
					scrollContainer.current.addEventListener("wheel", handleMouseWheel);
				}
			});
			scrollContainer.current.addEventListener("mouseleave", () => {
				scrollContainer.current?.removeEventListener("wheel", handleMouseWheel);
			});
		}
	}, []);

	return (
		<StyledMultiTabs>
			<Tabs
				size="small"
				type="card"
				tabBarGutter={4}
				activeKey={activeTabRoutePath}
				items={tabItems}
				renderTabBar={renderTabBar}
			/>
		</StyledMultiTabs>
	);
}

const StyledMultiTabs = styled.div`
  height: 100%;
  margin-top: 2px;
  .anticon {
    margin: 0px !important;
  }
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tabpane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }

  /* 隐藏滚动条 */
  .hide-scrollbar {
    overflow: scroll;
    flex-shrink: 0;
    scrollbar-width: none; /* 隐藏滚动条 Firefox */
    -ms-overflow-style: none; /* 隐藏滚动条 IE/Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 Chrome/Safari/Opera */
  }
`;
