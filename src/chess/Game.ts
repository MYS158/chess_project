import { Board } from './board/Board';

export class Game {
    private board!: Board;

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
    }
}