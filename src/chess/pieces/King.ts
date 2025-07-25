import { Piece , BoardState } from './Piece';
import { Position } from '../Position';
import { isInsideBoard, isOccupied, isAttacked } from '../utilities/pieces';

export class King extends Piece {
    public readonly type = 'king';
    public readonly symbol = this.color === 'white' ? '♔' : '♚';
    public static override directions = [
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: 1 }
    ];

    public getLegalMoves(board: BoardState): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of King.directions) {
            let x = this.position.x + dx;
            let y = this.position.y + dy;
            if (!isInsideBoard({x, y})) continue;
            let isAttacked = false;
            for (const piece of board) {
                if (piece.color === this.color) continue;
                const enemyMoves = piece.getRawMoves(board);
                if (enemyMoves.some(m => m.x === x && m.y === y)) {
                     isAttacked = true;
                     break;
                }
            }
            if (isAttacked) continue;
            const target: Position = { x, y };
            if (isOccupied(target, board)) {
                if (this.isEnemy(target, board)) {
                    moves.push(target);
                }
            } else {
                moves.push(target);
            }
        }
        return moves;
    }

    public getRawMoves(board: BoardState): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of King.directions) {
            const target: Position = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!isInsideBoard(target)) continue;
            moves.push(target);
        }
        return moves;
    }
}

// Castling is not implemented in this class yet.