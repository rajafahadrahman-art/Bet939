/** Remove placeholder bracket/brace artifacts from display text only. */
export function cleanDisplayText(value: string): string {
  return value
    .replace(/\[([^\]]*)\]/g, "$1")
    .replace(/\{([^}]*)\}/g, "$1")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();
}
