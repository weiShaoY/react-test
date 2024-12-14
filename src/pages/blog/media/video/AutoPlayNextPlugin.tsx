import type Player from "xgplayer";
import type { IPlayerPlugin } from "xgplayer";

/**
 * 自动播放下一个视频插件
 */
class AutoPlayNextPlugin implements IPlayerPlugin {
	static pluginName = "AutoPlayNextPlugin";
	player: Player;
	isAutoPlayNext: boolean; // 是否启用自动播放下一个

	constructor(player: Player) {
		this.player = player;
		this.isAutoPlayNext = false; // 默认关闭自动播放下一个
		this.init();
	}

	/**
	 * 初始化插件
	 */
	init() {
		this.createToggleButton();
		this.bindEvents();
	}

	/**
	 * 创建切换按钮
	 */
	createToggleButton() {
		const button = document.createElement("button");
		button.className = "xgplayer-next-btn";
		button.innerText = this.isAutoPlayNext ? "关闭自动播放" : "开启自动播放";
		button.style.position = "absolute";
		button.style.bottom = "20px";
		button.style.right = "20px";
		button.style.zIndex = "10";
		button.style.padding = "10px";
		button.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
		button.style.color = "#fff";
		button.style.border = "none";
		button.style.cursor = "pointer";

		// 切换状态
		button.addEventListener("click", () => {
			this.isAutoPlayNext = !this.isAutoPlayNext;
			button.innerText = this.isAutoPlayNext ? "关闭自动播放" : "开启自动播放";
			this.player.emit("toggleAutoPlayNext", this.isAutoPlayNext); // 触发自定义事件
		});

		this.player.root?.appendChild(button); // 添加到播放器容器中
	}

	/**
	 * 绑定播放器事件
	 */
	bindEvents() {
		// 监听播放结束事件
		this.player.on("ended", () => {
			if (this.isAutoPlayNext) {
				this.autoPlayNext();
			}
		});
	}

	/**
	 * 自动播放下一个视频
	 */
	autoPlayNext() {
		const nextUrl = this.getNextVideoUrl();
		if (nextUrl) {
			this.player.src = nextUrl;
			this.player.play();
		} else {
			console.log("没有下一个视频可播放");
		}
	}

	/**
	 * 模拟获取下一个视频的 URL
	 * 实际项目中需要根据业务逻辑替换
	 */
	getNextVideoUrl(): string | null {
		// TODO: 替换为真实的逻辑获取下一个视频地址
		return "https://example.com/next-video.mp4";
	}

	/**
	 * 销毁插件
	 */
	destroy() {
		this.player.off("ended");
		const button = this.player.root?.querySelector(".xgplayer-next-btn");
		if (button) {
			button.remove();
		}
	}
}

export default AutoPlayNextPlugin;
