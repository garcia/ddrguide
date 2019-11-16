export function makeAnchor(s: string): string {
    return (s.toLowerCase()
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .replace(/'/g, "")
    );
}