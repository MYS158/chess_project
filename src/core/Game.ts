import { Board } from "./board";
import { Move, Position } from "./move";
import { isInCheck, getOpponentColor } from "./utils/attackDetection";
import { Color } from "./pieces/pieceTypes";

export class Game {
    private board: Board;
    private history: Move[] = [];
    public currentPlayer: Color = "white";

    constructor(initial: Board) {
        this.board = initial.clone();
    }

    play(move: Move): void {
        this.castling(move);
        this.board.movePiece(move);
        this.history.push(move);
        this.currentPlayer = getOpponentColor(this.currentPlayer);
    }

    castling(move: Move): void {
        if (move.piece.category !== 'king' || Math.abs(move.from.x - move.to.x) !== 2) return;
        const isKingside = move.to.x > move.from.x;
        const row = move.from.y;
        const rookFrom = new Position(isKingside ? 7 : 0, row);
        const rookTo = new Position(isKingside ? 5 : 3, row);
        const rook = this.board.getPiece(rookFrom);
        this.board.movePiece({
            piece: rook!,
            from: rookFrom,
            to: rookTo
        });
    }

    getLastMove(): Move | null {
        if (this.history.length === 0) return null;
        return this.history[this.history.length - 1];
    }

    getBoard(): Board {
        return this.board.clone();
    }

    isCheck(color: Color): boolean {
        return isInCheck(this.board, color);
    }
}