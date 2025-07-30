import { Position, Move } from "./move";
import { Piece } from "./pieces/Piece";

export type BoardState = Array<Piece>;

export class Board {
    public state: BoardState;

    constructor(state: BoardState = []) {
        this.state = [...state];
    }

    getPiece(pos: Position): Piece | null {
        return this.state.find(p => p.position.equals(pos)) || null;
    }

    setPiece(piece: Piece): void {
        this.state = this.state.filter(p => !p.position.equals(piece.position));
        this.state.push(piece);
    }

    removePiece(pos: Position): void {
        this.state = this.state.filter(p => p.position.equals(pos));
    }

    movePiece(move: Move): void {
        this.removePiece(move.to);
        const piece = this.getPiece(move.from);
        if (!piece) throw new Error("No piece at source");
        piece.position = { ...move.to };
        piece.hasMoved = true;
    }

    clone(): Board {
        return new Board(this.state.map(p => p.clone()));
    }
}