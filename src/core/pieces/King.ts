import { Piece } from "./Piece";
import { Position } from "../move";
import { isInsideBoard } from "../utils/isInsideBoard";
import { isAttackedKing } from "../utils/attackDetection";
import { Color } from "./pieceTypes";
import { Board } from "../board";
import { Move } from "../move";

export class King extends Piece {
    public readonly category = 'king';
    public readonly symbol = this.color === 'white' ? '♔' : '♚';
    public static override directions = [
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: 1 }
    ];

    public getLegalMoves(board: Board): Position[] {
        const moves: Position[] = this.getCastlingMoves(board);
        for (const { dx, dy } of King.directions) {
            const target = new Position(this.position.x + dx, this.position.y + dy);
            if (!isInsideBoard(target) || !board.isValidMove({piece: this, from: this.position, to: target})) continue;
            if (board.isOccupied(target)) {
                const targetPiece = board.getPiece(target);
                if (targetPiece && this.isEnemy(targetPiece)) moves.push(target);
            } else {
                moves.push(target);
            }
        }
        return moves;
    }

    private getCastlingMoves(board: Board): Position[] {
        const moves: Position[] = [];
        if (this.hasMoved || isAttackedKing(this.color, board)) return moves;
        const row = this.color === 'white' ? 7 : 0;
        let rookPos = new Position(7, row);
        let kingTarget = new Position(6, row);
        const passThrough = new Position(5, row);
        let rook = board.getPiece(rookPos);
        const canCastleKingside =
            rook &&
            rook.category === 'rook' &&
            rook.color === this.color &&
            !rook.hasMoved &&
            !board.isOccupied(passThrough) &&
            !board.isOccupied(kingTarget) &&
            board.isValidMove({piece: this, from: this.position, to: passThrough}) &&
            board.isValidMove({piece: this, from: this.position, to: kingTarget});
        if (canCastleKingside) {
            moves.push(kingTarget);
        }
        rookPos = new Position(0, row);
        kingTarget = new Position(2, row);
        const passThrough1 = new Position(3, row);
        const passThrough2 = new Position(2, row);
        const emptyBetween = new Position(1, row);
        rook = board.getPiece(rookPos);
        const canCastleQueenside =
            rook &&
            rook.category === 'rook' &&
            rook.color === this.color &&
            !rook.hasMoved &&
            !board.isOccupied(passThrough1) &&
            !board.isOccupied(passThrough2) &&
            !board.isOccupied(emptyBetween) &&
            board.isValidMove({piece: this, from: this.position, to: passThrough1}) &&
            board.isValidMove({piece: this, from: this.position, to: passThrough2});
        if (canCastleQueenside) {
            moves.push(kingTarget);
        }
        return moves;
    }

    public getRawMoves(board: Board): Position[] {
        const moves: Position[] = [];
        for (const { dx, dy } of King.directions) {
            const target = new Position(this.position.x + dx, this.position.y + dy);
            if (!isInsideBoard(target)) continue;
            moves.push(target);
        }
        return moves;
    }
}