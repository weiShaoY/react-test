import bridge from "./images/bridge.png";

/**
 * 水波效果类
 * @class WaterRipple
 */
class WaterRipple {
	boxRef: HTMLElement | null = null;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	max_amplitude = 1024;
	amplitude: number;
	background: HTMLImageElement;
	load = false;
	img_data: ImageData | null = null;
	new_img_data: ImageData = null as any;
	animation_idx: number | null = null;
	mousemove_interval: number;
	animation_interval: number;
	ripple_radius: number;
	bridge: HTMLImageElement;
	buffer_1: number[][];
	buffer_2: number[][];

	/**
	 * 初始化 WaterRipple 类实例
	 * @param {object} props - 参数对象
	 * @param {HTMLElement} props.boxRef - 包含 canvas 的 HTML 元素
	 * @param {HTMLCanvasElement} props.canvas - 渲染水波效果的 canvas 元素
	 * @param {number} [props.amplitude] - 波纹的振幅
	 * @param {number} [props.mousemove_interval] - 鼠标移动触发波纹的时间间隔
	 * @param {number} [props.animation_interval] - 动画帧的时间间隔
	 * @param {number} [props.ripple_radius] - 波纹的半径
	 * @param {boolean} [props.resize] - 是否监听窗口大小变化
	 * @param {HTMLImageElement} props.background - 背景
	 */
	constructor(props: {
		boxRef: HTMLElement;
		canvas: HTMLCanvasElement;
		amplitude?: number;
		mousemove_interval?: number;
		animation_interval?: number;
		ripple_radius?: number;
		resize?: boolean;
		background: HTMLImageElement;
	}) {
		this.canvas = props.canvas;
		this.ctx = this.canvas.getContext("2d", {
			willReadFrequently: true,
		}) as CanvasRenderingContext2D;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.amplitude = props.amplitude || 512;
		this.background = props.background;
		this.mousemove_interval = props.mousemove_interval || 50;
		this.animation_interval = props.animation_interval || 20;
		this.ripple_radius = props.ripple_radius || 3;
		this.bridge = new Image();
		this.bridge.src = bridge;

		this.buffer_1 = Array.from(
			{
				length: this.width,
			},
			() =>
				Array.from(
					{
						length: this.height,
					},
					() => 0,
				),
		);
		this.buffer_2 = Array.from(
			{
				length: this.width,
			},
			() =>
				Array.from(
					{
						length: this.height,
					},
					() => 0,
				),
		);

		if (props.resize) {
			this.setResize();
		}
	}

	/**
	 * 绘制背景图像
	 */
	drawBackground() {
		if (!this.background.complete) {
			return;
		}

		this.ctx.drawImage(this.background, 0, 0, this.width, this.height);
		this.img_data = this.ctx.getImageData(0, 0, this.width, this.height);
		this.new_img_data = this.ctx.getImageData(0, 0, this.width, this.height);
		this.load = true;
	}

	/**
	 * 渲染波纹效果
	 */
	render() {
		if (!this.load) {
			this.drawBackground();

			return;
		}

		const half_w = this.width >> 1;

		const half_h = this.height >> 1;

		const len = this.new_img_data.data.length;

		for (let i = 0; i < len; i += 4) {
			const buffer_idx = i >> 2;

			const x = buffer_idx % this.width;

			const y = (buffer_idx - x) / this.width;

			const left = Math.max(x - 1, 0);

			const right = Math.min(x + 1, this.width - 1);

			const top = Math.min(y + 1, this.height - 1);

			const bottom = Math.max(y - 1, 0);

			let next_amplitude =
				this.buffer_1[x][top] +
				this.buffer_1[x][bottom] +
				this.buffer_1[right][y] +
				this.buffer_1[left][y];

			next_amplitude = (next_amplitude >> 1) - this.buffer_2[x][y];
			next_amplitude -= next_amplitude >> 5;

			this.buffer_2[x][y] = next_amplitude;
			const ratio = (this.max_amplitude - next_amplitude) / this.max_amplitude;

			if (next_amplitude !== 0) {
				let offset_x = (((x - half_w) * ratio) << 0) + half_w;

				let offset_y = (((y - half_h) * ratio) << 0) + half_h;

				offset_x = Math.min(Math.max(offset_x, 0), this.width - 1);
				offset_y = Math.min(Math.max(offset_y, 0), this.height - 1);

				const img_data_idx = (offset_y * this.width + offset_x) << 2;

				if (this.img_data) {
					this.new_img_data.data[i] = this.img_data.data[img_data_idx];
					this.new_img_data.data[i + 1] = this.img_data.data[img_data_idx + 1];
					this.new_img_data.data[i + 2] = this.img_data.data[img_data_idx + 2];
				}
			}
		}

		this.ctx.putImageData(this.new_img_data, 0, 0);
		this.ctx.drawImage(
			this.bridge,
			0,
			this.height * 0.35,
			this.width,
			this.height * 0.65,
		);
		[this.buffer_1, this.buffer_2] = [this.buffer_2, this.buffer_1];
	}

	/**
	 * 启动动画循环
	 */
	animate() {
		let start = Date.now();

		const update = () => {
			const now = Date.now();

			if (now - start > this.animation_interval) {
				this.render();
				start = now;
			}

			this.animation_idx = requestAnimationFrame(update);
		};

		update();
	}

	/**
	 * 鼠标波纹效果
	 * @param {number} x - x 坐标
	 * @param {number} y - y 坐标
	 */
	ripple(x: number, y: number) {
		if (!this.load) {
			return;
		}

		const left = Math.max(x - this.ripple_radius, 0);

		const right = Math.min(x + this.ripple_radius, this.buffer_1.length - 1);

		const top = Math.max(y - this.ripple_radius, 0);

		const bottom = Math.min(
			y + this.ripple_radius,
			this.buffer_1[0].length - 1,
		);

		for (let i = left; i < right; i++) {
			for (let j = top; j < bottom; j++) {
				this.buffer_1[i][j] = this.amplitude;
			}
		}
	}

	/**
	 * 节流函数
	 * @param {Function} func - 需要节流的函数
	 * @param {number} time - 时间间隔
	 */
	/**
	 * 创建一个节流函数，限制函数调用频率。
	 * @param func - 要进行节流的函数
	 * @param time - 两次函数调用的最小间隔时间，单位为毫秒
	 * @returns 返回一个新的函数，应用节流效果
	 */
	throttle<T extends (...args: any[]) => void>(
		func: T,
		time: number,
	): (...args: Parameters<T>) => void {
		let start = Date.now();

		return (...args: Parameters<T>): void => {
			const now = Date.now();

			if (now - start >= time) {
				start = now;
				func(...args);
			}
		};
	}

	/**
	 * 添加鼠标移动事件监听器
	 */
	addMousemove() {
		this.canvas.addEventListener(
			"mousemove",
			this.throttle((e: MouseEvent) => {
				const { top, left } = this.canvas.getBoundingClientRect();

				this.ripple(Math.floor(e.clientX - left), Math.floor(e.clientY - top));
			}, this.mousemove_interval),
		);
	}

	/**
	 * 设置窗口大小变化的监听器
	 */
	setResize() {
		window.addEventListener("resize", () => {
			const { offsetWidth, offsetHeight } = this.boxRef as HTMLElement;

			this.canvas.width = offsetWidth;
			this.canvas.height = offsetHeight;
			this.width = this.canvas.width;
			this.height = this.canvas.height;
			this.load = false;
		});
	}

	/**
	 * 停止动画
	 */
	stop() {
		if (this.animation_idx !== null) {
			cancelAnimationFrame(this.animation_idx);
		}
	}

	/**
	 * 恢复动画
	 */
	resume() {
		this.animate();
	}
}

export default WaterRipple;
