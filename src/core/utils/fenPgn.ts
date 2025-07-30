import { BoardState } from "../board";
import { Move } from "../move";

export function encodeFEN(board: BoardState): string {
    // implement FEN generation
    return '';
}

export function decodeFEN(fen: string): BoardState {
    // implement FEN parsing
    return [];
}

export function pgnFromMoves(moves: string[]): string {
    return moves.map((m, i) => `${Math.floor(i / 2) + 1}.${i % 2 === 0 ? '' : ''}${m}`).join(' ');
}