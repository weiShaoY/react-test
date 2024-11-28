import { useLayoutEffect } from "react";

import { useRouter } from "@/router/hooks/blog";

type Props = {
	src: string;
};
export default function BlogExternalLayout({ src }: Props) {
	const { back } = useRouter();
	useLayoutEffect(() => {
		window.open(src, "_black");
		back();
	});
	return <div />;
}
