import { Piece } from './Piece';
import { Position } from '../Position';

export class Knight extends Piece {
    public readonly type = 'knight';
    public readonly symbol = this.color === 'white' ? '♘' : '♞';

    public getLegalMoves(boardState: Piece[]): Position[] {
        const moves: Position[] = [];
        const offsets: { dx: number; dy: number }[] = [
            { dx: 2, dy: 1 },
            { dx: 1, dy: 2 },
            { dx: -1, dy: 2 },
            { dx: -2, dy: 1 },
            { dx: -2, dy: -1 },
            { dx: -1, dy: -2 },
            { dx: 1, dy: -2 },
            { dx: 2, dy: -1 },
        ];
        for (const { dx, dy } of offsets) {
            const target: Position = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!this.isInsideBoard(target)) continue;
            if (this.isOccupied(target, boardState)) {
                if (this.isEnemy(target, boardState)) {
                    moves.push(target);
                }
            } else {
                moves.push(target);
            }
        }
        return moves;
    }
}