import { Game } from './chess/Game';

const gameContainer = document.getElementById('game');
if (!gameContainer) throw new Error('#game not found');
const game = new Game(gameContainer);
game.start();