import { Piece } from "./Piece";
import { Position } from "../move";
import { isInsideBoard } from "../utils/isInsideBoard";
import { Color } from "./pieceTypes";
import { Board } from "../board";
import { Move } from "../move";

export abstract class SlidingPiece extends Piece {
    constructor(
        color: Color,
        position: Position,
        protected directions: Array<{ dx: number, dy: number }>
    ) { super(color, position); }

    public getLegalMoves(board: Board): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of this.directions) {
            let pos = new Position(this.position.x + dx, this.position.y + dy);
            while (isInsideBoard(pos)) {
                const target = board.getPiece(pos);
                if (target) {
                    if (this.isEnemy(pos, board)) moves.push(pos);
                    break;
                }
                moves.push(pos);
                pos = new Position(pos.x + dx, pos.y + dy);
            }
        }
        return moves;
    }

    public getRawMoves(board: Board): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of this.directions) {
            let pos = new Position(this.position.x + dx, this.position.y + dy);
            while (isInsideBoard(pos)) {
                moves.push(pos);
                const target = board.getPiece(pos);
                if (target !== null && (target.category !== 'king' || target.color === this.color)) {
                    break;
                }
                pos = new Position(pos.x + dx, pos.y + dy);
            }
        }
        return moves;
    }       
}