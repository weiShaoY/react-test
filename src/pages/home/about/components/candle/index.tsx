import "./index.less";

/**
 * 蜡烛 组件
 */
function Candle() {
	return (
		<div className="absolute  bottom-0  left-2">
			<div className="holder">
				<div className="candle">
					<div className="blinking-glow" />
					<div className="thread" />
					<div className="glow" />
					<div className="flame" />
				</div>
			</div>
		</div>
	);
}

export default Candle;
