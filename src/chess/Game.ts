import { Position, positionsEqual } from './Position';
import { Board } from './board/Board';
import { Piece, BoardState, PieceType } from './pieces/Piece';
import { Move } from './utilities/pieces';
export class Game {
    private board!: Board;
    private pieces: BoardState = [];
    private selectedPiece: Piece | null = null;
    private lastMove: Move | null = null;

    constructor(private container: HTMLElement) { }

    start(): void {
        this.board = new Board();
        this.container.appendChild(this.board.element);
        this.setupPieces();
        this.draw();
        this.board.element.addEventListener('click', e =>
            this.handleClick(e as MouseEvent)
        );
    }

    reset(): void {
        this.container.removeChild(this.board.element);
        this.start();
    }

    private setupPieces(): void {
        const wPawns = Array.from({ length: 8 }, (_, i) => {
            return this.board.createPiece('pawn', 'white', { x: i, y: 6 });
        });
        const bPawns = Array.from({ length: 8 }, (_, i) => {
            return this.board.createPiece('pawn', 'black', { x: i, y: 1 });
        });
        const wN1 = this.board.createPiece('knight', 'white', { x: 1, y: 7 });
        const wN2 = this.board.createPiece('knight', 'white', { x: 6, y: 7 });
        const bN1 = this.board.createPiece('knight', 'black', { x: 1, y: 0 });
        const bN2 = this.board.createPiece('knight', 'black', { x: 6, y: 0 });
        const wB1 = this.board.createPiece('bishop', 'white', { x: 2, y: 7 });
        const wB2 = this.board.createPiece('bishop', 'white', { x: 5, y: 7 });
        const bB1 = this.board.createPiece('bishop', 'black', { x: 2, y: 0 });
        const bB2 = this.board.createPiece('bishop', 'black', { x: 5, y: 0 });
        const wR1 = this.board.createPiece('rook', 'white', { x: 0, y: 7 });
        const wR2 = this.board.createPiece('rook', 'white', { x: 7, y: 7 });
        const bR1 = this.board.createPiece('rook', 'black', { x: 0, y: 0 });
        const bR2 = this.board.createPiece('rook', 'black', { x: 7, y: 0 });
        const wQ = this.board.createPiece('queen', 'white', { x: 3, y: 7 });
        const bQ = this.board.createPiece('queen', 'black', { x: 3, y: 0 });
        const wK = this.board.createPiece('king', 'white', { x: 4, y: 7 });
        const bK = this.board.createPiece('king', 'black', { x: 4, y: 0 });
        this.pieces = [
            wPawns[0], wPawns[1], wPawns[2], wPawns[3], wPawns[4], wPawns[5], wPawns[6], wPawns[7],
            bPawns[0], bPawns[1], bPawns[2], bPawns[3], bPawns[4], bPawns[5], bPawns[6], bPawns[7],
            wN1, wN2, bN1, bN2, wB1, wB2, bB1, bB2, wR1, wR2, bR1, bR2, wQ, bQ, wK, bK
        ];
    }

    private handleClick(e: MouseEvent): void {
        const squareEl = e.target as HTMLElement;
        const square = this.board.getSquareFromElement(squareEl);
        if (!square) return;
        const pos = square.position;
        const clicked = this.pieces.find(
            p => p.position.x === pos.x && p.position.y === pos.y
        );
        if (this.selectedPiece) {
            const moves = this.selectedPiece.getLegalMoves(this.pieces, this.lastMove);
            const legal = moves.some(m => m.x === pos.x && m.y === pos.y);
            if (legal) {
                const from = { ...this.selectedPiece.position };
                const movedPieces = this.selectedPiece.move(pos, this.pieces, this.lastMove);
                const movedPiece = movedPieces.find(
                    p =>
                        positionsEqual(p.position, pos) &&
                        p.color === this.selectedPiece!.color &&
                        p.type === this.selectedPiece!.type
                )!;
                this.lastMove = { piece: movedPiece, from, to: pos };
                this.selectedPiece = movedPiece;
                this.pieces = movedPieces;
                this.checkPromotion(this.selectedPiece);
            }
            this.selectedPiece = null;
        } else if (clicked) {
            this.selectedPiece = clicked;
        }
        this.draw();
    }

    private checkPromotion(p: Piece) {
        if (p.type !== 'pawn') return;
        const { x, y } = p.position;
        if (y !== 0 && y !== 7) return;
        this.pieces = this.pieces.filter(
            piece =>
                !(
                    piece.type === 'pawn' &&
                    piece.color === p.color &&
                    piece.position.x === x &&
                    piece.position.y === y
                )
        );
        let choice: number | null = null;
        do {
            const input = window.prompt(
                'Promotion! Select piece:\n' +
                '1 = Queen\n' +
                '2 = Rook\n' +
                '3 = Bishop\n' +
                '4 = Knight',
                '1'
            );
            if (input === null) {
                choice = 1;
                break;
            }
            choice = parseInt(input, 10);
        } while (![1, 2, 3, 4].includes(choice));
        let newType: PieceType;
        switch (choice) {
            case 2: newType = 'rook'; break;
            case 3: newType = 'bishop'; break;
            case 4: newType = 'knight'; break;
            case 1:
            default: newType = 'queen'; break;
        }
        const promoted = this.board.createPiece(newType, p.color, p.position);
        this.pieces.push(promoted);
    }

    private switchPlayer(): void {
        // Perhaps implement turn logic here.
    }

    private draw(): void {
        this.board.clear();
        this.board.renderPieces(this.pieces);
        if (this.selectedPiece) {
            this.board.highlight(this.selectedPiece.position, 'selected');
            for (const m of this.selectedPiece.getLegalMoves(this.pieces, this.lastMove)) {
                this.board.highlight(m, 'move');
            }
        }
    }
}