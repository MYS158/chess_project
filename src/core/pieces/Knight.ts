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
        return this.directions
            .map(s => new Position(this.position.x + s.dx, this.position.y + s.dy))
            .filter(p => {
                if (!isInsideBoard(p)) return false;
                const found = board.getState().find((q: Piece) => q.position.equals(p));
                return !found || found.color !== this.color;
            });
    }

    public getRawMoves(board: Board): Position[] {
        return this.getLegalMoves(board);
    }
}