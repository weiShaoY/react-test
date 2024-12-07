import { BlogApi } from "@/api";
function Workbench() {
	async function test() {
		const test = await BlogApi.test();
		console.log("%c Line:5 🧀 test", "color:#6ec1c2", test);
	}
	test();

	return <div className="p-2">22222222222</div>;
}

export default Workbench;
