import { BoardState } from "../board";
import { Position, Move } from "../move";
import { Piece } from "../pieces/Piece";
import { isInsideBoard } from "./isInsideBoard";
import { Color } from "../pieces/pieceTypes";

export function isAttacked(target: Position, byColor: Color, board: BoardState): boolean {
    for (const p of board) {
        if (p.color !== byColor) continue;
        const raw: Move[] = p.getRawMoves(board);
        if (raw.some(r => r.to.equals(target))) return true;
    }
    return false;
}

export function isInCheck(board: BoardState, color: Color): boolean {
    const king = board.find(p => p.type === 'king' && p.color === color);
    if (!king) throw new Error('No king');
    return isAttacked(king.position, getOpponentColor(color), board);
}

export function getOpponentColor(color: Color): Color {
    return color === 'white' ? 'black' : 'white';
}