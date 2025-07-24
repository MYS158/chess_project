import { Board } from './board/Board';
import { Piece } from './pieces/Piece';

export class Game {
    private board!: Board;
    private pieces: Piece[] = [];
    private selectedPiece: Piece | null = null;

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
        const wB1 = this.board.createPiece('bishop', 'white', { x: 2, y: 7 });
        const wB2 = this.board.createPiece('bishop', 'white', { x: 5, y: 7 });
        const bB1 = this.board.createPiece('bishop', 'black', { x: 2, y: 0 });
        const bB2 = this.board.createPiece('bishop', 'black', { x: 5, y: 0 });
        const wR1 = this.board.createPiece('rook', 'white', { x: 0, y: 7 });
        const wR2 = this.board.createPiece('rook', 'white', { x: 7, y: 7 });
        const bR1 = this.board.createPiece('rook', 'black', { x: 0, y: 0 });
        const bR2 = this.board.createPiece('rook', 'black', { x: 7, y: 0 });
        this.pieces = [wB1, wB2, bB1, bB2, wR1, wR2, bR1, bR2];
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
            const moves = this.selectedPiece.getLegalMoves(this.pieces);
            const legal = moves.some(m => m.x === pos.x && m.y === pos.y);
            if (legal) {
                this.pieces = this.selectedPiece.move(pos, this.pieces);
            }
            this.selectedPiece = null;
        } else if (clicked) {
            this.selectedPiece = clicked;
        }
        this.draw();
    }

    private draw(): void {
        this.board.clear();
        this.board.renderPieces(this.pieces);
        if (this.selectedPiece) {
            this.board.highlight(this.selectedPiece.position, 'selected');
            for (const m of this.selectedPiece.getLegalMoves(this.pieces)) {
                this.board.highlight(m, 'move');
            }
        }
    }
}