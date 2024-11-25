import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { isMobile } from "./isMobile";

export * from "./techStack";

export function tailwindClassMerger(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export { isMobile };
