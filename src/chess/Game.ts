import { Board } from './board/Board';

export class Game {
    private board!: Board;

    constructor(private container: HTMLElement) { }

    start(): void {
        this.board = new Board();
        this.container.appendChild(this.board.element);
    }
}