import { positionsEqual } from '../Position';
import { getPieceAt, isAttacked } from '../utilities/pieces';
export class Piece {
    color;
    position;
    hasMoved = false;
    static directions = [];
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }
    opponentColor() {
        return this.color === 'white' ? 'black' : 'white';
    }
    isEnemy(pos, board) {
        const p = getPieceAt(pos, board);
        return p !== null && p.color !== this.color;
    }
    isAttacked(pos, board) {
        return isAttacked(pos, this.opponentColor(), board);
    }
    move(target, board, lastMove) {
        if (!this.getLegalMoves(board, lastMove).some(pos => positionsEqual(pos, target))) {
            throw new Error(`Illegal move for ${this.type} to (${target.x},${target.y})`);
        }
        let newBoard = board;
        if (this.type === 'pawn' && lastMove) {
            const dir = this.color === 'white' ? -1 : 1;
            if (Math.abs(target.x - this.position.x) === 1 &&
                target.y === this.position.y + dir &&
                !getPieceAt(target, board)) {
                const jumpedPos = { x: target.x, y: this.position.y };
                newBoard = newBoard.filter(p => p.position.x !== jumpedPos.x || p.position.y !== jumpedPos.y);
            }
        }
        if (this.type === 'king' && Math.abs(target.x - this.position.x) === 2) {
            const isKingside = target.x > this.position.x;
            const rookX = isKingside ? 7 : 0;
            const newRookX = isKingside ? 5 : 3;
            const rookPos = { x: rookX, y: this.position.y };
            const rook = getPieceAt(rookPos, board);
            if (rook && rook.type === 'rook' && rook.color === this.color) {
                const movedRook = rook.cloneAt({ x: newRookX, y: rookPos.y });
                newBoard = newBoard.filter(p => !positionsEqual(p.position, rookPos));
                newBoard.push(movedRook);
            }
        }
        const withoutCaptured = newBoard.filter(p => !positionsEqual(p.position, target) || p.color === this.color);
        const moved = this.cloneAt(target);
        return withoutCaptured.filter(p => p !== this).concat(moved);
    }
    cloneAt(newPos) {
        const copy = Object.create(Object.getPrototypeOf(this));
        copy.color = this.color;
        copy.type = this.type;
        copy.symbol = this.symbol;
        copy.position = { x: newPos.x, y: newPos.y };
        copy.hasMoved = true;
        return copy;
    }
}
