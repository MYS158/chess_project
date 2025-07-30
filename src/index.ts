import './ui/styles/app-style.css';
import './ui/styles/game-style.css';
import { Board, BoardState } from './core/board';
import { Game } from './core/Game';
import { Renderer } from './ui/Renderer';
import { InputHandler } from './ui/InputHandler';
import { Position } from './core/move';
import { King } from './core/pieces/King';
import { Queen } from './core/pieces/Queen';
import { Rook } from './core/pieces/Rook';
import { Bishop } from './core/pieces/Bishop';
import { Knight } from './core/pieces/Knight';
import { Pawn } from './core/pieces/Pawn';

const container = document.getElementById('game');
if (!container) throw new Error('#game not found');

const initialBoard: BoardState = [
    new King('white', new Position(0, 0)),
]
const board = new Board(initialBoard);
const game = new Game(board);
const renderer = new Renderer(container);
const input = new InputHandler(renderer, game);

renderer.render(game.getBoard());