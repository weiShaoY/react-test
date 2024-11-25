const Alert = ({ type, text }: { type: string; text: string }) => {
	return (
		<div className="fixed bottom-5 right-5 flex justify-center items-center z-50">
			<div
				className={`p-2 ${
					type === "danger" ? "bg-[#991b1b]" : "bg-[#1e40af]"
				} items-center text-[#e0e7ff] leading-none lg:rounded-full flex lg:inline-flex rounded-md p-5`}
				role="alert"
			>
				<p
					className={`flex rounded-full ${
						type === "danger" ? "bg-[#ef4444]" : "bg-[#3b82f6]"
					} uppercase px-2 py-1 text-xs font-semibold mr-3`}
				>
					{type === "danger" ? "Failed" : "Success"}
				</p>
				<p className="mr-2 text-left">{text}</p>
			</div>
		</div>
	);
};

export default Alert;
