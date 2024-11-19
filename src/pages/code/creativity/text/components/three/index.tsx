import styles from "./index.module.less";

function Three() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<svg>
					<symbol id="text">
						<text textAnchor="middle" x="50%" y="80%">
							weiShaoY
						</text>
					</symbol>
					<use xlinkHref="#text" className={styles.text}></use>
					<use xlinkHref="#text" className={styles.text}></use>
					<use xlinkHref="#text" className={styles.text}></use>
					<use xlinkHref="#text" className={styles.text}></use>
					<use xlinkHref="#text" className={styles.text}></use>
				</svg>
			</div>
		</div>
	);
}

export default Three;
