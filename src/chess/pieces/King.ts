import { Piece } from './Piece';
import { Position } from '../Position';

export class King extends Piece {
    public readonly type = 'king';
    public readonly symbol = this.color === 'white' ? '♔' : '♚';

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

// Castling is not implemented in this class yet.