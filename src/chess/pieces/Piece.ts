import { Position } from '../Position';
import { Color } from './Color';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type BoardState = ReadonlyArray<Piece>;

function positionsEqual(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
}

export abstract class Piece {
    public abstract readonly type: PieceType;
    public abstract readonly symbol: string;

    constructor(
        public color: Color,
        public position: Position
    ) { }

    public abstract getLegalMoves(board: BoardState): Position[];

    protected getPieceAt(pos: Position, board: BoardState): Piece | null {
        return board.find(p => positionsEqual(p.position, pos)) ?? null;
    }

    protected isOccupied(pos: Position, board: BoardState): boolean {
        return this.getPieceAt(pos, board) !== null;
    }

    protected isEnemy(pos: Position, board: BoardState): boolean {
        const p = this.getPieceAt(pos, board);
        return p !== null && p.color !== this.color;
    }

    protected isInsideBoard(pos: Position): boolean {
        return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
    }

    public move(target: Position, board: BoardState): BoardState {
        if (!this.getLegalMoves(board).some(pos => positionsEqual(pos, target))) {
            throw new Error(`Illegal move for ${this.type} to (${target.x},${target.y})`);
        }
        const withoutCaptured = board.filter(
            p => !positionsEqual(p.position, target) || p.color === this.color
        );
        const moved = this.cloneAt(target);
        return withoutCaptured.filter(p => p !== this).concat(moved);
    }

    protected cloneAt(newPos: Position): Piece {
        const copy = Object.create(this.constructor.prototype) as Piece;
        copy.color = this.color;
        copy.position = { x: newPos.x, y: newPos.y };
        return copy;
    }
}