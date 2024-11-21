import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { isMobile } from "./isMobile";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export { isMobile };
