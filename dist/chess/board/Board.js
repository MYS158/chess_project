import { Pawn, Knight, Bishop, Rook, Queen, King } from '../pieces';
export class Board {
    element;
    squares = [];
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('board');
        this.buildGrid();
    }
    buildGrid() {
        for (let y = 0; y < 8; y++) {
            const row = [];
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
    getSquareFromElement(el) {
        let target = el;
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
    clear() {
        for (const row of this.squares) {
            for (const { element } of row) {
                element.innerHTML = '';
                element.classList.remove('selected-highlight', 'move-highlight', 'capture-highlight', 'piece', 'white', 'black');
            }
        }
    }
    highlight(pos, type) {
        const square = this.squares[pos.y][pos.x];
        if (type === 'selected') {
            square.element.classList.add('selected-highlight');
        }
        else if (type === 'move') {
            square.element.classList.add('move-highlight');
        }
        else if (type === 'capture') {
            square.element.classList.add('capture-highlight');
        }
    }
    getSquare(pos) {
        return this.squares[pos.y][pos.x];
    }
    createPiece(type, color, pos) {
        switch (type) {
            case 'pawn':
                return new Pawn(color, pos);
            case 'knight':
                return new Knight(color, pos);
            case 'bishop':
                return new Bishop(color, pos);
            case 'rook':
                return new Rook(color, pos);
            case 'queen':
                return new Queen(color, pos);
            case 'king':
                return new King(color, pos);
            default:
                throw new Error(`Unknown piece type: ${type}`);
        }
    }
    renderPieces(pieces) {
        for (const piece of pieces) {
            const square = this.getSquare(piece.position);
            square.element.textContent = piece.symbol;
            square.element.classList.add('piece', piece.color);
        }
    }
}
