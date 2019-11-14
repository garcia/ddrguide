export function makeTermAnchor(s: string): string {
    return "term-" + s.toLowerCase().replace(" ", "-");
}