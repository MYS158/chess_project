import { Move } from "../move";

export function toAlgebraic(move: Move): string {
    // example: "Nf3", implement full algebraic notation as needed
    const file = String.fromCharCode(97 + move.to.x);
    const rank = (8 - move.to.y).toString();
    return `${file}${rank}`;
}