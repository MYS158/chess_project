import { SlidingPiece } from "./SlidingPiece";
import { Position } from "../move";
import { Color, Category } from "./pieceTypes";

export class Rook extends SlidingPiece {
    public static override directions = [
        { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
    ];
    public category: Category = 'rook';
    public symbol = this.color === 'white' ? '♖' : '♜';
    constructor(color: Color, pos: Position) { super(color, pos, Rook.directions); }
}