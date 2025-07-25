import { Position , positionsEqual } from '../Position';
import { Color } from './Color';
import { Move, getPieceAt, isAttacked } from '../utilities/pieces';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type BoardState = Array<Piece>;

export abstract class Piece {
    public abstract type: PieceType;
    public abstract symbol: string;
    protected static directions: { dx: number; dy: number }[] = [];

    constructor(
        public color: Color,
        public position: Position
    ) { }

    public abstract getLegalMoves(board: BoardState, last: Move | null): Position[];

    public abstract getRawMoves(board: BoardState): Position[];

    protected opponentColor(): Color {
        return this.color === 'white' ? 'black' : 'white';
    }

    protected isEnemy(pos: Position, board: BoardState): boolean {
        const p = getPieceAt(pos, board);
        return p !== null && p.color !== this.color;
    }

    protected isAttacked(pos: Position, board: BoardState): boolean {
        return isAttacked(pos, this.opponentColor(), board);
    }

    public move(target: Position, board: BoardState, lastMove: Move | null): BoardState {
        if (!this.getLegalMoves(board, lastMove).some(pos => positionsEqual(pos, target))) {
            throw new Error(`Illegal move for ${this.type} to (${target.x},${target.y})`);
        }
        let newBoard = board;
        if (this.type === 'pawn' && lastMove) {
            const dir = this.color === 'white' ? -1 : 1;
            if (
                Math.abs(target.x - this.position.x) === 1 &&
                target.y === this.position.y + dir &&
                !getPieceAt(target, board)
            ) {
                const jumpedPos = { x: target.x, y: this.position.y };
                newBoard = newBoard.filter(
                    p => p.position.x !== jumpedPos.x || p.position.y !== jumpedPos.y
                );
            }
        }
        const withoutCaptured = newBoard.filter(
            p => !positionsEqual(p.position, target) || p.color === this.color
        );
        const moved = this.cloneAt(target);
        return withoutCaptured.filter(p => p !== this).concat(moved);
    }

    protected cloneAt(newPos: Position): Piece {
        const copy = Object.create(Object.getPrototypeOf(this)) as Piece;
        copy.color = this.color;
        copy.type  = this.type;
        copy.symbol = this.symbol;
        copy.position = { x: newPos.x, y: newPos.y };
        return copy;
    }
}