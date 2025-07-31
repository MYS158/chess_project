import { SlidingPiece } from "./SlidingPiece";
import { Position } from "../move";
import { Color, Category } from "./pieceTypes";

export class Bishop extends SlidingPiece {
    public static override directions = [
        { dx: 1, dy: 1 }, { dx: 1, dy: -1 }, { dx: -1, dy: 1 }, { dx: -1, dy: -1 }
    ];
    public category: Category = 'bishop';
    public symbol = this.color === 'white' ? '♗' : '♝';
    constructor(color: Color, pos: Position) { super(color, pos, Bishop.directions); }
}