import * as PIXI from 'pixi.js';
import { interval } from 'rxjs';

import Graphics from './components/Graphics';
import Controls from './components/Controls';

const WIDTH = 800, HEIGHT = 600, CELL_SIZE = 40, VELOCITY = 20;
const max_X = Math.floor(WIDTH/CELL_SIZE), 
      max_Y =  Math.floor(HEIGHT/CELL_SIZE), 
      startPoint = {x: 7* CELL_SIZE, y: 7*CELL_SIZE},
      pos = {...startPoint},
      RENDER_TICK = 40;
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
  
const source = interval(RENDER_TICK);

const subscribe = source.subscribe(val => render(val));

g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  
function render(step) {
  g.clear();
  g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  renderPickups();
  collisionCheck();
  const isMoving = !!currentDirection;
  if (isMoving) {
    updatePos();
    g.rect(pos.x, pos.y, CELL_SIZE, CELL_SIZE);
  } else {
    // stay in place
    g.rect(startPoint.y, startPoint.y , CELL_SIZE, CELL_SIZE);
  }
}

function renderPickups() {

}

function collisionCheck() {

}

function updatePos() {
  switch (currentDirection) {
    case 'up' : pos.y-=VELOCITY; break;
    case 'down' : pos.y +=VELOCITY; break;
    case 'left': pos.x -=VELOCITY; break;
    case 'right': pos.x +=VELOCITY; break;
  }
  // pacman-like going out of bounds
  if (pos.x > WIDTH - 1) {
    pos.x = 0;
  }
  if (pos.x < 0 ) {
    pos.x = WIDTH - 1;
  }
  if (pos.y > HEIGHT - 1){
    pos.y = 0;
  }
  if (pos.y < 0) {
    pos.y = HEIGHT - 1;
  }
}