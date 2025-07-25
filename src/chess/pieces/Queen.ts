import { Piece , BoardState } from './Piece';
import { Position } from '../Position';
import { isInsideBoard, isOccupied, getPieceAt } from '../utilities/pieces';

export class Queen extends Piece {
    public readonly type = 'queen';
    public readonly symbol = this.color === 'white' ? '♕' : '♛';
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

    public getLegalMoves(board : BoardState): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of Queen.directions) {
            let x = this.position.x + dx;
            let y = this.position.y + dy;
            while (isInsideBoard({ x, y })) {
                const target: Position = { x, y };
                if (isOccupied(target, board)) {
                    if (this.isEnemy(target, board)) {
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

    public getRawMoves(board: BoardState): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of Queen.directions) {
            let x = this.position.x + dx;
            let y = this.position.y + dy;
            while (isInsideBoard({ x, y })) {
                const target: Position = { x, y };
                moves.push(target);
                const piece = getPieceAt(target, board);
                if (piece !== null && piece.type !== "king") break;
                x += dx;
                y += dy;
            }
        }
        return moves;
    }
}