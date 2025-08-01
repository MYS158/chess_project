import { Board, BoardState } from "../board";
import { Position, Move } from "../move";
import { Piece } from "../pieces/Piece";
import { isInsideBoard } from "./isInsideBoard";
import { Color } from "../pieces/pieceTypes";

export function isAttacked(target: Position, byColor: Color, board: Board): boolean {
    for (const p of board.getState()) {
        if (p.color !== byColor) continue;
        const raw: Position[] = p.getLegalMoves(board, null);
        if (raw.some(r => r.equals(target))) return true;
    }
    return false;
}

export function isAttackedKing(color: Color, board: Board): boolean {
    const king = board.getState().find(p => p.category === 'king' && p.color === color);
    if (!king) throw new Error('No king');
    for (const p of board.getState()) {
        if (p.color === color) continue;
        const raw: Position[] = p.getRawMoves(board);
        if (raw.some(r => r.equals(king.position))) return true;
    }
    return false;
}

export function isInCheck(board: Board, color: Color): boolean {
    const king = board.getState().find(p => p.category === 'king' && p.color === color);
    if (!king) throw new Error('No king');
    return isAttackedKing(color, board);
}

export function getOpponentColor(color: Color): Color {
    return color === 'white' ? 'black' : 'white';
}