import styles from "./index.module.less";

/**
 * 蜡烛 组件
 */
function Candle() {
	return (
		<div className="h-full w-full flex items-center justify-center">
			<div className={styles.holder}>
				<div className={styles.candle}>
					<div className={styles["blinking-glow"]} />
					<div className={styles.thread} />
					<div className={styles.glow} />
					<div className={styles.flame} />
				</div>
			</div>
		</div>
	);
}

export default Candle;
