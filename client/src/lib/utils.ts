import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeCategorySlugs(
  input?: string | string[] | null
): string[] {
  const rawValues = Array.isArray(input) ? input : [input ?? ""];

  const values = rawValues
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(values));
}

export function serializeCategorySlugs(slugs: string[]): string {
  return Array.from(new Set(slugs.map((slug) => slug.trim()).filter(Boolean))).join(",");
}
