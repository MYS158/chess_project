import { Position } from '../Position';
import { Color } from '../pieces/Color';
import { Piece , BoardState } from '../pieces/Piece';

export function isInsideBoard(pos: Position): boolean {
    return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
}

export function getPieceAt(pos: Position, board: BoardState): Piece | null {
    return board.find(p => p.position.x === pos.x && p.position.y === pos.y) || null;
}

export function isOccupied(pos: Position, board: BoardState): boolean {
    return getPieceAt(pos, board) !== null;
}

export function isEnemy(pos: Position, boardState: BoardState, color: Color): boolean {
    const piece = getPieceAt(pos, boardState);
    return piece !== null && piece.color !== color;
}

export function isOccupiedByAlly(pos: Position, boardState: BoardState, color: Color): boolean {
    const piece = getPieceAt(pos, boardState);
    return piece !== null && piece.color === color;
}



