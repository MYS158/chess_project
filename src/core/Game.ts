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
        // TODO: validate legality, check, promotion, etc.
        this.board.movePiece(move);
        this.history.push(move);
        this.currentPlayer = getOpponentColor(this.currentPlayer);
    }

    getBoard(): Board {
        return this.board.clone();
    }

    isCheck(color: Color): boolean {
        return isInCheck(this.board.state, color);
    }
}