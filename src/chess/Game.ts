import { Board } from './board/Board';

export class Game {
    private board!: Board;
    private pieces: Piece[] = [];
    private selectedPiece: Piece | null = null;

    constructor(private container: HTMLElement) { }

    start(): void {
        this.board = new Board();
        this.container.appendChild(this.board.element);
        this.setupPieces();
    }

    reset(): void {
        if (this.board) {
            this.container.removeChild(this.board.element);
        }
        this.start();
    }

    setupPieces(): void {
        // Create a bishop as an example
        const bishop = this.board.createBishop('white', { x: 2, y: 2 });
        
        this.pieces.push(bishop);
        this.board.element.addEventListener('click', (e) => this.handleClick(e));
    }

    private handleClick(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        const square = this.board.getSquareFromElement(target);
        if (!square) return;

        const clickedPos = square.position;
        const clickedPiece = this.pieces.find(p =>
            p.position.x === clickedPos.x && p.position.y === clickedPos.y
        );

        //this.board.clear();

        if (this.selectedPiece) {
            const legalMoves = this.selectedPiece.getLegalMoves(this.pieces);
            const isLegal = legalMoves.some(m => m.x === clickedPos.x && m.y === clickedPos.y);

            if (isLegal) {
                this.pieces = this.selectedPiece.move(clickedPos, this.pieces);
                this.selectedPiece = null;
                this.renderPieces();
                return;
            }
        }

        if (clickedPiece) {
            this.selectedPiece = clickedPiece;
            this.board.highlight(clickedPiece.position, 'selected');
            for (const move of clickedPiece.getLegalMoves(this.pieces)) {
                this.board.highlight(move, 'move');
            }
        } else {
            this.selectedPiece = null;
        }
    }

    private renderPieces(): void {
        //this.board.clear();
        for (const piece of this.pieces) {
            const square = this.board.getSquare(piece.position);
            square.element.textContent = piece.symbol;
            square.element.classList.add('piece', piece.color);
        }
    }

}