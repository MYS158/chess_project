import { Piece } from './Piece';
import { Position } from '../Position';

export class Rook extends Piece {
    public readonly type = 'rook';
    public readonly symbol = this.color === 'white' ? '♖' : '♜';

    public getLegalMoves(boardState: Piece[]): Position[] {
        const moves: Position[] = [];
        const directions: { dx: number; dy: number }[] = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 }
        ];
        for (const { dx, dy } of directions) {
            let x = this.position.x + dx;
            let y = this.position.y + dy;
            while (this.isInsideBoard({ x, y })) {
                const target: Position = { x, y };
                if (this.isOccupied(target, boardState)) {
                    if (this.isEnemy(target, boardState)) {
                        moves.push(target);
                    }
                    break;
                }
                moves.push(target);
                x += dx;
                y += dy;
            }
        }
        return moves;
    }
}

// Castling is not implemented in this class yet.