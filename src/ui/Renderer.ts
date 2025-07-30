import { Board } from '../core/board';
import { Position } from '../core/move';

export class Renderer {
    private container: HTMLElement;
    private squareEls: HTMLElement[][] = [];

    constructor(container: HTMLElement) {
        this.container = container;
        this.buildGrid();
    }

    private buildGrid() {
        this.container.innerHTML = '';
        this.container.classList.add('board');
        for (let y = 0; y < 8; y++) {
            const rowEls: HTMLElement[] = [];
            for (let x = 0; x < 8; x++) {
                const sq = document.createElement('div');
                sq.classList.add('square', (x + y) % 2 === 0 ? 'light' : 'dark');
                sq.dataset.x = x.toString();
                sq.dataset.y = y.toString();
                this.container.appendChild(sq);
                rowEls.push(sq);
            }
            this.squareEls.push(rowEls);
        }
    }

    public render(board: Board) {
        for (const row of this.squareEls) for (const sq of row) {
            sq.textContent = '';
            sq.classList.remove('selected', 'move', 'capture');
        }
        for (const p of board.getState()) {
            const sq = this.squareEls[p.position.y][p.position.x];
            sq.textContent = p.symbol;
            sq.classList.add('piece', p.color);
        }
    }

    public highlight(pos: Position, type: 'selected' | 'move' | 'capture') {
        this.squareEls[pos.y][pos.x].classList.add(type);
    }
}