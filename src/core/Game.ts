import { Board } from "./board";
import { Move, Position } from "./move";
import { isInCheck, getOpponentColor } from "./utils/attackDetection";
import { Color } from "./pieces/pieceTypes";
import { setEnPassant, clearEnPassant, getEnPassantState } from './utils/enPassant';
import { InputHandler } from '../ui/InputHandler';
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";

export class Game {
    private board: Board;
    private history: Move[] = [];
    public currentPlayer: Color = "white";

    constructor(initial: Board) {
        this.board = initial.clone();
    }

    play(move: Move): void {
        this.castling(move);
        this.enPassant(move);
        this.board.movePiece(move);
        this.promotion(move);
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

    enPassant(move: Move): void {
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
        if (piece.category === 'pawn' && Math.abs(to.y - from.y) === 2) {
            setEnPassant(from, to, getOpponentColor(piece.color));
        } else {
            clearEnPassant();
        }
    }

    promotion(move: Move): void {
        const { piece, to } = move;
        if (piece.category !== 'pawn') return;
        const color = piece.color;
        const lastRank = color === 'white' ? 0 : 7;
        if (to.y !== lastRank) return;
        this.board.removePiece(to);
        const choice = InputHandler.selectPromotion();
        switch (choice) {
            case 1:
                this.board.getState().push(new Queen(color, to));
                break;
            case 2:
                this.board.getState().push(new Rook(color, to));
                break;
            case 3:
                this.board.getState().push(new Bishop(color, to));
                break;
            case 4:
                this.board.getState().push(new Knight(color, to));
                break;
            default:
                throw new Error('Promotion selection invalid!');
        }
    }
}