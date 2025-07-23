import { Position } from '../Position';
import { Square } from './Square';
import { Color } from '../pieces/Color';
import { Bishop } from '../pieces/Bishop';

export class Board {
    public element: HTMLElement;
    private squares: Square[][] = [];

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('board');
        this.buildGrid();
    }

    private buildGrid(): void {
        for (let y = 0; y < 8; y++) {
            const row: Square[] = [];
            for (let x = 0; x < 8; x++) {
                const squareEl = document.createElement('div');
                squareEl.classList.add('square');
                const isLight = (x + y) % 2 === 0;
                squareEl.classList.add(isLight ? 'light' : 'dark');
                squareEl.dataset.x = x.toString();
                squareEl.dataset.y = y.toString();
                this.element.appendChild(squareEl);
                row.push({ element: squareEl, position: { x, y } });
            }
            this.squares.push(row);
        }
    }

    getSquareFromElement(el: HTMLElement): Square | null {
        let target: HTMLElement | null = el;
        // bubble up until we hit an element with data-x/data-y
        while (target && !(target.dataset.x && target.dataset.y)) {
            target = target.parentElement;
        }
        if (target && target.dataset.x && target.dataset.y) {
            const x = parseInt(target.dataset.x, 10);
            const y = parseInt(target.dataset.y, 10);
            return this.squares[y][x];
        }
        return null;
    }

    clear(): void {
        for (const row of this.squares) {
            for (const { element } of row) {
                element.innerHTML = '';
                element.classList.remove('selected-highlight', 'move-highlight');
            }
        }
    }

    highlight(pos: Position, type: 'selected' | 'move' = 'selected'): void {
        const square = this.squares[pos.y][pos.x];
        square.element.classList.add(
            type === 'selected' ? 'selected-highlight' : 'move-highlight'
        );
    }

    getSquare(pos: Position): Square {
        return this.squares[pos.y][pos.x];
    }

    createBishop(color: Color, pos: Position) {
        const bishop = new Bishop(color, pos);
        const square = this.squares[bishop.position.y][bishop.position.x];
        square.element.textContent = bishop.symbol;
        square.element.classList.add('piece', bishop.color);
        return bishop;
    }
}