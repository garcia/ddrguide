export function makeAnchor(s: string): string {
    return (s.toLowerCase()
        .replace(" ", "-")
        .replace("&", "and")
    );
}