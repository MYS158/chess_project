import { Piece } from "./Piece";
import { Position } from "../move";
import { isInsideBoard } from "../utils/isInsideBoard";
import { Category } from "./pieceTypes";
import { Board } from "../board";

export class Knight extends Piece {
    public category: Category = 'knight';
    public symbol = this.color === 'white' ? '♘' : '♞';
    directions = [
        { dx: 1, dy: 2 }, { dx: 2, dy: 1 }, { dx: 2, dy: -1 }, { dx: 1, dy: -2 },
        { dx: -1, dy: -2 }, { dx: -2, dy: -1 }, { dx: -2, dy: 1 }, { dx: -1, dy: 2 }
    ];

    public getLegalMoves(board: Board): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of this.directions) {
            const pos = new Position(this.position.x + dx, this.position.y + dy);
            if (!isInsideBoard(pos)) continue;
            const occ = board.getPiece(pos);
            if (!occ || occ.color !== this.color) moves.push(pos);
        }
        return moves;
    }

    public getRawMoves(board: Board): Position[] {
        return this.getLegalMoves(board);
    }
}