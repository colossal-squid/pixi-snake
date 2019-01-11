import { interval } from 'rxjs';

import Graphics from './components/Graphics';
import Controls from './components/Controls';
import Game from './Game';

import { WIDTH, HEIGHT, CELL_SIZE, RENDER_TICK } from './config'

const graphics = new Graphics(document, WIDTH, HEIGHT);
const game = new Game();
Controls.$events.subscribe(
  game.changeDirection.bind(game)
);

graphics.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
interval(RENDER_TICK).subscribe(val => render(val));

function render(step) {
  graphics.clear();
  graphics.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  game.objects.forEach((o)=>{
    graphics.rect(o.pos.x, o.pos.y, o.w, o.h, o.fillColor|0xcc0000, o.lineColor|0x00bb00);
  });

  if (game.isMoving) {
      game.updatePos();
      game.collisionCheck();
  }

  // render the snake
  game.snakeNodes.forEach(
    node=>graphics.rect(node.pos.x, node.pos.y, CELL_SIZE, CELL_SIZE, node.isTail ? 0x773366 : 0x669911)
  );
  
}