import './styles/style.css';
import { Game } from './chess/Game';

const canva = document.getElementById('game')!;
const game = new Game(canva);

game.start();