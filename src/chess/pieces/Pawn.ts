// src/pieces/Pawn.ts
import { Piece, BoardState } from './Piece';
import { Position } from '../Position';
import { isInsideBoard, isOccupied } from '../utilities/pieces';

export class Pawn extends Piece {
    public readonly type = 'pawn';
    public readonly symbol = this.color === 'white' ? '♙' : '♟';

    public getLegalMoves(board: BoardState): Position[] {
        const moves: Position[] = [];
        const dir = this.color === 'white' ? -1 : 1;
        const oneForward: Position = {
            x: this.position.x,
            y: this.position.y + dir
        };
        if (isInsideBoard(oneForward) && !isOccupied(oneForward, board)) {
            moves.push(oneForward);
            const startRank = this.color === 'white' ? 6 : 1;
            if (this.position.y === startRank) {
                const twoForward: Position = {
                    x: this.position.x,
                    y: this.position.y + 2 * dir
                };
                if (isInsideBoard(twoForward) && !isOccupied(twoForward, board)) {
                    moves.push(twoForward);
                }
            }
        }
        for (const dx of [-1, 1]) {
            const diag: Position = {
                x: this.position.x + dx,
                y: this.position.y + dir
            };
            if (isInsideBoard(diag) && this.isEnemy(diag, board)) {
                moves.push(diag);
            }
        }
        return moves;
    }
}

// En passant and promotion are not implemented in this class yet.