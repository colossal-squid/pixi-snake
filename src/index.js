import * as PIXI from 'pixi.js';
import { interval } from 'rxjs';

import Graphics from './components/Graphics';
import Controls from './components/Controls';

const WIDTH = 800, HEIGHT = 600, CELL_SIZE = 40;
const max_X = Math.floor(WIDTH/CELL_SIZE), 
      max_Y =  Math.floor(HEIGHT/CELL_SIZE), 
      startPoint = {x: 7, y: 7},
      pos = {...startPoint},
      TICK = 80;
const app = new PIXI.Application(800, 600, {backgroundColor : 0x00});
const g = new Graphics();

let currentDirection = '';

function component() {
    // g.rect(300, 300, CELL_SIZE, CELL_SIZE);
    app.stage.addChild(g);
    return app.view;
  }
  
  document.body.appendChild(component());

Controls.$events.subscribe((direction)=>{
  currentDirection = direction;
});
  
const source = interval(TICK);
const subscribe = source.subscribe(val => render(val));
g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  
function render(step) {
  g.clear();
  g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  const isMoving = !!currentDirection;
  if (isMoving) {
    updatePos();
    g.cell(pos.x, pos.y, CELL_SIZE);
  } else {
    // stay in place
    g.cell(startPoint.x, startPoint.y, CELL_SIZE);
  }
}

function updatePos() {
  switch (currentDirection) {
    case 'up' : pos.y-=1; break;
    case 'down' : pos.y +=1; break;
    case 'left': pos.x -=1; break;
    case 'right': pos.x +=1; break;
  }
  // pacman-like going out of bounds
  if (pos.x > max_X - 1) {
    pos.x = 0;
  }
  if (pos.x < 0 ) {
    pos.x = max_X - 1;
  }
  if (pos.y > max_Y - 1){
    pos.y = 0;
  }
  if (pos.y < 0) {
    pos.y = max_Y - 1;
  }
}