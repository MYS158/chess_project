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
            const piece = this.game.getBoard().getPiece(pos);
            if (piece && piece.color === this.game.currentPlayer) {
                this.selected = pos;
                this.renderer.render(this.game.getBoard());
                this.renderer.highlight(pos, 'selected');
                const legal = piece.getLegalMoves(this.game.getBoard(), this.game.getLastMove())
                    .filter(m => !this.game.isCheck(piece.color));
                for (const m of legal) {
                    const targetPiece = this.game.getBoard().getPiece(m);
                    this.renderer.highlight(m, targetPiece ? 'capture' : 'move');
                }
            } else if (this.selected) {
                const from = this.selected;
                const movingPiece = this.game.getBoard().getPiece(from);
                if (!movingPiece) return;
                const legalMoves = movingPiece.getLegalMoves(this.game.getBoard(), this.game.getLastMove())
                    .filter(m => !this.game.isCheck(movingPiece.color));
                const isLegal = legalMoves.some(m => m.equals(pos));
                if (!isLegal) return;
                const move: Move = { piece: movingPiece, from, to: pos };
                try { this.game.play(move); } catch { }
                this.selected = null;
                this.renderer.render(this.game.getBoard());
            }
        });
    }
}