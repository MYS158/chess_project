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
        (this.renderer as any).container.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            const x = parseInt(target.dataset.x || '', 10);
            const y = parseInt(target.dataset.y || '', 10);
            if (isNaN(x) || isNaN(y)) return;
            this.handleClick(new Position(x, y));
        });
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