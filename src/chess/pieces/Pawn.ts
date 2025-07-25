import { Piece, BoardState } from './Piece';
import { Position, positionsEqual } from '../Position';
import { isInsideBoard, isOccupied } from '../utilities/pieces';
import { Move } from '../utilities/pieces';

export class Pawn extends Piece {
    public readonly type = 'pawn';
    public readonly symbol = this.color === 'white' ? '♙' : '♟';

    public getLegalMoves(board: BoardState, last: Move | null): Position[] {
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
        if (last && last.piece.type === 'pawn') {
            const lm = last.piece;
            const startRank = lm.color === 'white' ? 6 : 1;
            if (positionsEqual(last.from, { x: lm.position.x, y: startRank }) &&
                Math.abs(last.to.y - last.from.y) === 2) {
                if (last.to.y === this.position.y &&
                    Math.abs(last.to.x - this.position.x) === 1) {
                    const epCapture: Position = {
                        x: last.to.x,
                        y: this.position.y + dir
                    };
                    if (isInsideBoard(epCapture)) {
                        moves.push(epCapture);
                    }
                }
            }
        }
        return moves;
    }

    public getRawMoves(board: BoardState): Position[] {
        const moves: Position[] = [];
        const dir = this.color === 'white' ? -1 : 1;
        for (const dx of [-1, 1]) {
            const diag: Position = {
                x: this.position.x + dx,
                y: this.position.y + dir
            };
            moves.push(diag);
        }
        return moves;
    }
}