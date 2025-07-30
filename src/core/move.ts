import { Piece } from "./pieces/Piece";

export class Position {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    equals(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

export interface Move {
    readonly piece: Piece;
    readonly from: Position;
    readonly to: Position;
}