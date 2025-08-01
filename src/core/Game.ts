import { Board } from "./board";
import { Move, Position } from "./move";
import { isInCheck, getOpponentColor } from "./utils/attackDetection";
import { Color } from "./pieces/pieceTypes";
import { setEnPassant, clearEnPassant, getEnPassantState } from './utils/enPassant';

export class Game {
    private board: Board;
    private history: Move[] = [];
    public currentPlayer: Color = "white";

    constructor(initial: Board) {
        this.board = initial.clone();
    }

    play(move: Move): void {
        const { piece, from, to } = move;
        const { targetSquare, eligiblePawnColor } = getEnPassantState();
        if (
            piece.category === 'pawn' &&
            targetSquare &&
            to.equals(targetSquare) &&
            eligiblePawnColor !== piece.color
        ) {
            const epPawnPos = new Position(to.x, from.y);
            this.board.removePiece(epPawnPos);
        }
        this.board.movePiece(move);
        if (piece.category === 'pawn' && Math.abs(to.y - from.y) === 2) {
            setEnPassant(from, to, getOpponentColor(piece.color));
        } else {
            clearEnPassant();
        }
        this.history.push(move);
        this.currentPlayer = getOpponentColor(this.currentPlayer);
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