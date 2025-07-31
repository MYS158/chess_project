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
    new King('white', new Position(4, 7)),
    new King('black', new Position(4, 0)),
    new Queen('white', new Position(3, 7)),
    new Queen('black', new Position(3, 0)),
    new Rook('white', new Position(0, 7)),
    new Rook('white', new Position(7, 7)),
    new Rook('black', new Position(0, 0)),
    new Rook('black', new Position(7, 0)),
    new Bishop('white', new Position(2, 7)),
    new Bishop('white', new Position(5, 7)),
    new Bishop('black', new Position(2, 0)),
    new Bishop('black', new Position(5, 0)),
    new Knight('white', new Position(1, 7)),
    new Knight('white', new Position(6, 7)),
    new Knight('black', new Position(1, 0)),
    new Knight('black', new Position(6, 0)),
    new Pawn('white', new Position(0, 6)),
    new Pawn('white', new Position(1, 6)),
    new Pawn('white', new Position(2, 6)),
    new Pawn('white', new Position(3, 6)),
    new Pawn('white', new Position(4, 6)),
    new Pawn('white', new Position(5, 6)),
    new Pawn('white', new Position(6, 6)),
    new Pawn('white', new Position(7, 6)),
    new Pawn('black', new Position(0, 1)),
    new Pawn('black', new Position(1, 1)),
    new Pawn('black', new Position(2, 1)),
    new Pawn('black', new Position(3, 1)),
    new Pawn('black', new Position(4, 1)),
    new Pawn('black', new Position(5, 1)),
    new Pawn('black', new Position(6, 1)),
    new Pawn('black', new Position(7, 1))
]
const board = new Board(initialBoard);
const game = new Game(board);
const renderer = new Renderer(container);
const input = new InputHandler(renderer, game);

renderer.render(game.getBoard());