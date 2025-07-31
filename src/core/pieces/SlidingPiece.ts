import { Piece } from "./Piece";
import { Position } from "../move";
import { isInsideBoard } from "../utils/isInsideBoard";
import { Color } from "./pieceTypes";
import { Board } from "../board";
import { Move } from "../move";

export abstract class SlidingPiece extends Piece {
    protected static directions: { dx: number, dy: number }[] = [];

    constructor(
        color: Color,
        position: Position
    ) { super(color, position); }

    public getLegalMoves(board: Board): Position[] {
        const moves: Position[] = [];
        const directions = (this.constructor as typeof SlidingPiece).directions;
        for (const { dx, dy } of directions) {
            let pos = new Position(this.position.x + dx, this.position.y + dy);
            while (isInsideBoard(pos)) {
                const occ = board.getPiece(pos);
                if (occ) {
                    if (this.isEnemy(occ)) moves.push(pos);
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
        const directions = (this.constructor as typeof SlidingPiece).directions;
        for (const { dx, dy } of directions) {
            let pos = new Position(this.position.x + dx, this.position.y + dy);
            while (isInsideBoard(pos)) {
                moves.push(pos);
                const target = board.getPiece(pos);
                if (target !== null && (target.category !== 'king' || !this.isEnemy(target))) {
                    break;
                }
                pos = new Position(pos.x + dx, pos.y + dy);
            }
        }
        return moves;
    }       
}