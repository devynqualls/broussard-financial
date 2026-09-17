/**
 * Strips HTML tags from a string to prevent XSS when content is used in
 * non-React contexts. React's JSX escapes by default, so this is a belt-and-
 * suspenders guard for any edge cases (e.g., values stored then re-rendered).
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

export function sanitizeFormField(input: string, maxLength = 500): string {
  return sanitizeText(input).slice(0, maxLength);
}
