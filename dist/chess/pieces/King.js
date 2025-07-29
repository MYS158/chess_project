import { Piece } from './Piece';
import { positionsEqual } from '../Position';
import { isInsideBoard, isOccupied, isAttacked } from '../utilities/pieces';
export class King extends Piece {
    type = 'king';
    symbol = this.color === 'white' ? '♔' : '♚';
    static directions = [
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: 1 }
    ];
    getLegalMoves(board) {
        const moves = [];
        for (const { dx, dy } of King.directions) {
            const target = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!isInsideBoard(target) || isAttacked(target, this.opponentColor(), board))
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
        // Castling logic
        if (!this.hasMoved && !isAttacked(this.position, this.opponentColor(), board)) {
            const row = this.color === 'white' ? 7 : 0;
            const kingside = board.find(p => p.type === 'rook' &&
                p.color === this.color &&
                positionsEqual({ x: 7, y: row }, p.position) &&
                !p.hasMoved);
            if (kingside &&
                !isOccupied({ x: 5, y: row }, board) &&
                !isOccupied({ x: 6, y: row }, board) &&
                !isAttacked({ x: 5, y: row }, this.opponentColor(), board) &&
                !isAttacked({ x: 6, y: row }, this.opponentColor(), board)) {
                moves.push({ x: 6, y: row });
            }
            const queenside = board.find(p => p.type === 'rook' &&
                p.color === this.color &&
                positionsEqual({ x: 0, y: row }, p.position) &&
                !p.hasMoved);
            if (queenside &&
                !isOccupied({ x: 1, y: row }, board) &&
                !isOccupied({ x: 2, y: row }, board) &&
                !isOccupied({ x: 3, y: row }, board) &&
                !isAttacked({ x: 2, y: row }, this.opponentColor(), board) &&
                !isAttacked({ x: 3, y: row }, this.opponentColor(), board)) {
                moves.push({ x: 2, y: row });
            }
        }
        return moves;
    }
    getRawMoves(board) {
        const moves = [];
        for (const { dx, dy } of King.directions) {
            const target = {
                x: this.position.x + dx,
                y: this.position.y + dy,
            };
            if (!isInsideBoard(target))
                continue;
            moves.push(target);
        }
        return moves;
    }
}
