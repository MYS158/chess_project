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
        // Example: single bishop at c6 (x=2, y=2)
        const bishop1 = this.board.createBishop('white', { x: 2, y: 1 });
        const bishop2 = this.board.createBishop('black', { x: 4, y: 1 });
        const bishop3 = this.board.createBishop('white', { x: 2, y: 7 });
        const bishop4 = this.board.createBishop('black', { x: 4, y: 7 });
        this.pieces = [bishop1, bishop2, bishop3, bishop4];
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