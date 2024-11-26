const Button = ({
	name,
	isBeam = false,
	containerClass,
}: {
	name: string;
	isBeam?: boolean;
	containerClass?: string;
}) => {
	return (
		<button
			className={`flex gap-4 items-center justify-center cursor-pointer p-3 rounded-md bg-[#1c1c21]  transition-all active:scale-95 text-white mx-auto ${containerClass}`}
			type="button"
		>
			{isBeam && (
				<span className="relative flex h-3 w-3">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
					<span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]" />
				</span>
			)}
			{name}
		</button>
	);
};

export default Button;
