import { Renderer } from './Renderer';
import { Game } from '../core/Game';
import { Position } from '../core/move';
import type { Move } from '../core/move';

export class InputHandler {
    private renderer: Renderer;
    private game: Game;
    private selected: Position | null = null;

    constructor(renderer: Renderer, game: Game) {
        this.renderer = renderer;
        this.game = game;
        this.addListeners();
        this.renderer.render(this.game.getBoard());
    }

    private addListeners() {
        this.renderer.getContainer().addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('square')) return;

            const x = parseInt(target.dataset.x ?? '', 10);
            const y = parseInt(target.dataset.y ?? '', 10);
            if (isNaN(x) || isNaN(y)) return;

            const pos = new Position(x, y);
            const board = this.game.getBoard();
            const lastMove = this.game.getLastMove();

            // selecting own piece
            const piece = board.getPiece(pos);
            if (piece && piece.color === this.game.currentPlayer) {
                this.selected = pos;
                this.renderer.render(board);
                this.renderer.highlight(pos, 'selected');

                // highlight legal moves using Board instance
                const legalMoves = piece.getLegalMoves(board, lastMove).filter(
                    to => board.isValidMove({from: pos, to, piece})
                );
                for (const m of legalMoves) {
                    const dest = board.getPiece(m);
                    this.renderer.highlight(m, dest ? 'capture' : 'move');
                }
                return;
            }

            // moving selected piece
            if (this.selected) {
                const from = this.selected;
                const moving = board.getPiece(from);
                if (!moving) return;
                const legalMoves = moving.getLegalMoves(board, lastMove).filter(
                    to => board.isValidMove({from, to, piece: moving})
                );
                if (!legalMoves.some(m => m.equals(pos))) return;

                const move: Move = { piece: moving, from, to: pos };
                try { this.game.play(move); } catch { }
                this.selected = null;
                this.renderer.render(this.game.getBoard());
            }
        });
    }
}