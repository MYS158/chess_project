import { SlidingPiece } from "./SlidingPiece";
import { Position } from "../move";
import { Category, Color } from "./pieceTypes";

export class Queen extends SlidingPiece {
    static directions = [
        { dx: 0, dy: 1 }, { dx: 1, dy: 1 }, { dx: 1, dy: 0 }, { dx: 1, dy: -1 },
        { dx: 0, dy: -1 }, { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 }
    ];
    public category: Category = 'queen';
    public symbol = this.color === 'white' ? '♕' : '♛';
    constructor(color: Color, pos: Position) { super(color, pos, Queen.directions); }
}