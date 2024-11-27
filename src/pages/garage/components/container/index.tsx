import { useLoadedStore } from "@/store/garage";

function Container() {
	useLoadedStore.setState({ ready: true });

	return <div className="h-full w-full  relative ">2222222222222</div>;
}
export default Container;
