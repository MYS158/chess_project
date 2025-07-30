import { Move, Position } from '../move';
import { Color, Category } from './pieceTypes';
import { isAttacked, getOpponentColor } from '../utils/attackDetection';
import { Board } from '../board';

export abstract class Piece {
    public abstract type: Category;
    public abstract symbol: string;
    public hasMoved = false;
    protected static directions: { dx: number; dy: number }[] = [];

    constructor(
        public color: Color,
        public position: Position
    ) { }

    public abstract getLegalMoves(board: Board, last: Move | null): Position[];

    public abstract getPossibleCaptures(board: Board, last: Move | null): Position[];

    public abstract getRawMoves(board: Board): Position[];

    public opponentColor(): Color {
        return getOpponentColor(this.color);
    }

    protected isEnemy(pos: Position, board: Board): boolean {
        const p = board.getPiece(pos);
        return p !== null && p.color !== this.color;
    }

    protected isAttacked(pos: Position, board: Board): boolean {
        return isAttacked(pos, this.opponentColor(), board);
    }

}