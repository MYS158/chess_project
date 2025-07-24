import { Piece } from './Piece';
import { Position } from '../Position';

export class Queen extends Piece {
    public readonly type = 'queen';
    public readonly symbol = this.color === 'white' ? '♕' : '♛';

    public getLegalMoves(boardState: Piece[]): Position[] {
        const moves: Position[] = [];
        const directions: { dx: number; dy: number }[] = [
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
            { dx: 0, dy: -1 },
            { dx: -1, dy: -1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: 1 },
        ];
        for (const { dx, dy } of directions) {
            const target: Position = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            while (this.isInsideBoard(target)) {
                if (this.isOccupied(target, boardState)) {
                    if (this.isEnemy(target, boardState)) {
                        moves.push(target);
                    }
                    break;
                }
                moves.push(target);
                target.x += dx;
                target.y += dy;
            }
        }
        return moves;
    }
}