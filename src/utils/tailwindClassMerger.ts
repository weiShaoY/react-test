import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function tailwindClassMerger(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
