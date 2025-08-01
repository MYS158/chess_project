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
        if (isInsideBoard(one) && !board.getState().find((p: any) => p.position.equals(one))) {
            moves.push(one);
            const start = this.color === 'white' ? 6 : 1;
            if (this.position.y === start) {
                const two = new Position(this.position.x, this.position.y + 2 * dir);
                if (isInsideBoard(two) && !board.getState().find((p: any) => p.position.equals(two))) {
                    moves.push(two);
                }
            }
        }
        for (const dx of [-1, 1]) {
            const cap = new Position(this.position.x + dx, this.position.y + dir);
            const occ = board.getState().find((p: any) => p.position.equals(cap));
            if (isInsideBoard(cap) && occ && this.isEnemy(occ)) {
                moves.push(cap);
            }
        }
        if (lastMove && lastMove.piece.category === 'pawn' && Math.abs(lastMove.from.y - lastMove.to.y) === 2) {
            const epY = this.position.y;
            const epX = lastMove.to.x;
            if (Math.abs(this.position.x - epX) === 1 && epY === (this.color === 'white' ? 3 : 4)) {
                const epTarget = new Position(epX, epY + dir);
                if (isInsideBoard(epTarget) && !board.getState().find((p: any) => p.position.equals(epTarget))) {
                    moves.push(epTarget);
                }
            }
        }
        return moves;
    }

    public getRawMoves(board: Board): Position[] {
        const moves: Position[] = [];
        const dir = this.color === 'white' ? -1 : 1;
        for (const dx of [-1, 1]) {
            moves.push(new Position(this.position.x + dx, this.position.y + dir));
        }
        return moves.filter(isInsideBoard);
    }
}