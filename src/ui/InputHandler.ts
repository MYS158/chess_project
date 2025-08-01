import { Renderer } from './Renderer';
import { Game } from '../core/Game';
import { Position } from '../core/move';
import type { Move } from '../core/move';
import { isEnPassantCapture } from '../core/utils/enPassant';
import { getOpponentColor } from '../core/utils/attackDetection';

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
                const legalMoves = piece.getLegalMoves(board, lastMove);
                for (const m of legalMoves) {
                    const dest = board.getPiece(m);
                    const isEP = piece.category === 'pawn' && lastMove && isEnPassantCapture(m, getOpponentColor(piece.color));
                    this.renderer.highlight(m, (dest || isEP) ? 'capture' : 'move');
                }
                return;
            }

            // moving selected piece
            if (this.selected) {
                const from = this.selected;
                const moving = board.getPiece(from);
                if (!moving) return;
                const legalMoves = moving.getLegalMoves(board, lastMove);
                if (!legalMoves.some(m => m.equals(pos))) return;

                const move: Move = { piece: moving, from, to: pos };
                try { this.game.play(move); } catch { }
                this.selected = null;
                this.renderer.render(this.game.getBoard());
            }
        });
    }

    public static selectPromotion(): number {
        let choice: number | null = null;
        do {
            const input = window.prompt(
                'Promotion! Select piece:\n' +
                '1 = Queen\n' +
                '2 = Rook\n' +
                '3 = Bishop\n' +
                '4 = Knight',
                '1'
            );
            if (input === null) {
                choice = 1;
                break;
            }
            choice = parseInt(input, 10);
        } while (![1, 2, 3, 4].includes(choice));
        return choice;
    }
}