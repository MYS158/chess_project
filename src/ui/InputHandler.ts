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
    }

    private addListeners() {
        onclick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains('square')) return;
            const x = parseInt(target.dataset.x || '0');
            const y = parseInt(target.dataset.y || '0');
            const pos: Position = new Position(x, y);
            if (this.game.getBoard().getPiece(pos)) {
                this.renderer.highlight(pos, 'selected');
                this.handleClick(pos);
            } else if (this.selected) {
                this.renderer.highlight(pos, 'move');
                this.handleClick(pos);
            }
        }
    }

    private handleClick(pos: Position) {
        if (!this.selected) {
            this.selected = pos;
        } else {
            const from = this.selected;
            const piece = this.game.getBoard().getPiece(from);
            if (!piece) {
                this.selected = null;
                return;
            }
            const move: Move = { piece, from, to: pos };
            try { this.game.play(move); } catch { }
            this.selected = null;
            this.renderer.render(this.game.getBoard());
        }
    }
}