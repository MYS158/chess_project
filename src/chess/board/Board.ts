import { Square } from './Square';
import { Position } from '../Position';
import { Piece, Color, Bishop, Rook, Knight } from '../pieces';

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
                element.classList.remove(
                    'selected-highlight',
                    'move-highlight',
                    'piece',
                    'white',
                    'black'
                );
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

    createPiece(type: string, color: Color, pos: Position): Piece {
        switch (type) {
            case 'bishop':
                return new Bishop(color, pos);
            case 'rook':
                return new Rook(color, pos);
            case 'knight':
                return new Knight(color, pos);
            case 'queen':
                return new Queen(color, pos);
            case 'king':
                return new King(color, pos);
            default:
                throw new Error(`Unknown piece type: ${type}`);
        }
    }

    renderPieces(pieces: Array<Piece>): void {
        for (const piece of pieces) {
            const square = this.getSquare(piece.position);
            square.element.textContent = piece.symbol;
            square.element.classList.add('piece', piece.color);
        }
    }
}