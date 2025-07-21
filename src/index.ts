import './styles/style.css';
import { Game } from './chess/Game';

const app = document.getElementById('app')!;
const game = new Game(app);

game.start();