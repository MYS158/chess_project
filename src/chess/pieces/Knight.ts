import { Piece , BoardState } from './Piece';
import { Position } from '../Position';
import { isInsideBoard, isOccupied } from '../utilities/pieces';

export class Knight extends Piece {
    public readonly type = 'knight';
    public readonly symbol = this.color === 'white' ? '♘' : '♞';
    public static override directions = [
        { dx: 2, dy: 1 },
        { dx: 1, dy: 2 },
        { dx: -1, dy: 2 },
        { dx: -2, dy: 1 },
        { dx: -2, dy: -1 },
        { dx: -1, dy: -2 },
        { dx: 1, dy: -2 },
        { dx: 2, dy: -1 }
    ];

    public getLegalMoves(board: BoardState): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of Knight.directions) {
            const target: Position = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!isInsideBoard(target)) continue;
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
        for (const { dx, dy } of Knight.directions) {
            const target: Position = {
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