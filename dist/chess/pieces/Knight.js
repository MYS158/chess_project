import { Piece } from './Piece';
import { isInsideBoard, isOccupied } from '../utilities/pieces';
export class Knight extends Piece {
    type = 'knight';
    symbol = this.color === 'white' ? '♘' : '♞';
    static directions = [
        { dx: 2, dy: 1 },
        { dx: 1, dy: 2 },
        { dx: -1, dy: 2 },
        { dx: -2, dy: 1 },
        { dx: -2, dy: -1 },
        { dx: -1, dy: -2 },
        { dx: 1, dy: -2 },
        { dx: 2, dy: -1 }
    ];
    getLegalMoves(board) {
        const moves = [];
        for (const { dx, dy } of Knight.directions) {
            const target = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!isInsideBoard(target))
                continue;
            if (isOccupied(target, board)) {
                if (this.isEnemy(target, board)) {
                    moves.push(target);
                }
            }
            else {
                moves.push(target);
            }
        }
        return moves;
    }
    getRawMoves(board) {
        const moves = [];
        for (const { dx, dy } of Knight.directions) {
            const target = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (isInsideBoard(target)) {
                moves.push(target);
            }
        }
        return moves;
    }
}
