import { Piece , BoardState } from './Piece';
import { Position, positionsEqual } from '../Position';
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
            const target: Position = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!isInsideBoard(target) || isAttacked(target, this.opponentColor(), board)) continue;
            if (isOccupied(target, board)) {
                if (this.isEnemy(target, board)) {
                    moves.push(target);
                }
            } else {
                moves.push(target);
            }
        }
        // Castling logic
        if (!this.hasMoved && !isAttacked(this.position, this.opponentColor(), board)) {
            const row = this.color === 'white' ? 7 : 0;
            const kingside = board.find(p =>
                p.type === 'rook' &&
                p.color === this.color &&
                positionsEqual({ x: 7, y: row }, p.position) &&
                !p.hasMoved
            );
            if (
                kingside &&
                !isOccupied({ x: 5, y: row }, board) &&
                !isOccupied({ x: 6, y: row }, board) &&
                !isAttacked({ x: 5, y: row }, this.opponentColor(), board) &&
                !isAttacked({ x: 6, y: row }, this.opponentColor(), board)
            ) {
                moves.push({ x: 6, y: row });
            }
            const queenside = board.find(p =>
                p.type === 'rook' &&
                p.color === this.color &&
                positionsEqual({ x: 0, y: row }, p.position) &&
                !p.hasMoved
            );
            if (
                queenside &&
                !isOccupied({ x: 1, y: row }, board) &&
                !isOccupied({ x: 2, y: row }, board) &&
                !isOccupied({ x: 3, y: row }, board) &&
                !isAttacked({ x: 2, y: row }, this.opponentColor(), board) &&
                !isAttacked({ x: 3, y: row }, this.opponentColor(), board)
            ) {
                moves.push({ x: 2, y: row });
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