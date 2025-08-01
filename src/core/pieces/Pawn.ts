import { Piece } from './Piece';
import { Position, Move } from '../move';
import { isInsideBoard } from '../utils/isInsideBoard';
import { Category } from './pieceTypes';
import { Board } from '../board';

export class Pawn extends Piece {
    public category: Category = 'pawn';
    public symbol = this.color === 'white' ? '♙' : '♟';

    public getLegalMoves(board: Board, lastMove?: Move | null): Position[] {
        const moves: Position[] = [];
        const dir = this.color === 'white' ? -1 : 1;
        const one = new Position(this.position.x, this.position.y + dir);
        if (isInsideBoard(one) && !board.getState().find(p => p.position.equals(one))) {
            moves.push(one);
            const startRank = this.color === 'white' ? 6 : 1;
            if (this.position.y === startRank) {
                const two = new Position(this.position.x, this.position.y + 2 * dir);
                if (isInsideBoard(two) && !board.getState().find(p => p.position.equals(two))) {
                    moves.push(two);
                }
            }
        }
        for (const dx of [-1, 1]) {
            const cap = new Position(this.position.x + dx, this.position.y + dir);
            const occ = board.getState().find(p => p.position.equals(cap));
            if (isInsideBoard(cap) && occ && this.isEnemy(occ)) {
                moves.push(cap);
            }
        }
        if (lastMove && lastMove.piece.category === 'pawn') {
            const fromY = lastMove.from.y;
            const toY = lastMove.to.y;
            const doubleStep = Math.abs(toY - fromY) === 2;
            if (doubleStep && lastMove.to.y === this.position.y) {
                if (Math.abs(lastMove.to.x - this.position.x) === 1) {
                    const epY = this.position.y + dir;
                    const epX = lastMove.to.x;
                    const epSquare = new Position(epX, epY);
                    if (isInsideBoard(epSquare) && !board.getState().find(p => p.position.equals(epSquare))) {
                        moves.push(epSquare);
                    }
                }
            }
        }
        return moves;
    }

    public getRawMoves(): Position[] {
        const moves: Position[] = [];
        const dir = this.color === 'white' ? -1 : 1;
        moves.push(new Position(this.position.x, this.position.y + dir));
        const start = this.color === 'white' ? 6 : 1;
        if (this.position.y === start) {
            moves.push(new Position(this.position.x, this.position.y + 2 * dir));
        }
        for (const dx of [-1, 1]) {
            moves.push(new Position(this.position.x + dx, this.position.y + dir));
        }
        return moves.filter(isInsideBoard);
    }
}