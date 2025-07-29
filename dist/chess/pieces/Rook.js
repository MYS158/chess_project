import { Piece } from './Piece';
import { isInsideBoard, isOccupied, getPieceAt } from '../utilities/pieces';
export class Rook extends Piece {
    type = 'rook';
    symbol = this.color === 'white' ? '♖' : '♜';
    static directions = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ];
    getLegalMoves(board) {
        const moves = [];
        for (const { dx, dy } of Rook.directions) {
            let x = this.position.x + dx;
            let y = this.position.y + dy;
            while (isInsideBoard({ x, y })) {
                const target = { x, y };
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
    getRawMoves(board) {
        const moves = [];
        for (const { dx, dy } of Rook.directions) {
            let x = this.position.x + dx;
            let y = this.position.y + dy;
            while (isInsideBoard({ x, y })) {
                const target = { x, y };
                moves.push(target);
                const piece = getPieceAt(target, board);
                if (piece !== null && (piece.type !== "king" || piece.color === this.color)) {
                    break;
                }
                x += dx;
                y += dy;
            }
        }
        return moves;
    }
}
// Castling is not implemented in this class yet.
