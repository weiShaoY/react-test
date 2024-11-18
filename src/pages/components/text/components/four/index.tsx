import { Button } from "antd";
import { useRef } from "react";
import styles from "./index.module.less";

function Four() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const pRef = useRef<HTMLParagraphElement>(null);

	const onceAgain = () => {
		if (pRef.current) {
			Array.prototype.forEach.call(
				pRef.current.children,
				(span: HTMLSpanElement) => {
					let className = styles.span1;
					if (span.className === styles.span1) {
						className = styles.span2;
					}
					span.className = className;
				},
			);
		}
		videoRef.current?.load();
	};

	return (
		<div className={styles.container}>
			<video
				muted
				autoPlay
				preload="true"
				x5-video-player-fullscreen="true"
				x5-playsinline="true"
				playsInline
				webkit-playsinline="true"
				ref={videoRef}
			>
				<source src="public/video/smoke.mp4" />
			</video>
			<p ref={pRef}>
				<span className={styles.span1}>w</span>
				<span className={styles.span1}>e</span>
				<span className={styles.span1}>i</span>
				<span className={styles.span1}>S</span>
				<span className={styles.span1}>h</span>
				<span className={styles.span1}>a</span>
				<span className={styles.span1}>o</span>
				<span className={styles.span1}>Y</span>
			</p>
			<Button type="primary" className={styles.btn} onClick={onceAgain}>
				再一次
			</Button>
		</div>
	);
}

export default Four;
