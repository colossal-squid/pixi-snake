import * as PIXI from 'pixi.js';
import { interval } from 'rxjs';

import Graphics from './components/Graphics';
import Controls from './components/Controls';
import SnakeList from './SnakeList';

const WIDTH = 800, HEIGHT = 600, CELL_SIZE = 20, VELOCITY = CELL_SIZE;

const max_X = Math.floor(WIDTH/CELL_SIZE), 
      max_Y =  Math.floor(HEIGHT/CELL_SIZE), 
      startPoint = {x: 10 * CELL_SIZE, y: 10 * CELL_SIZE},
      pos = {...startPoint},
      RENDER_TICK = 200;

const app = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0x00});
const g = new Graphics();
const snake = new SnakeList(pos, CELL_SIZE);

snake.insert({
  x: pos.x - CELL_SIZE,
  y: pos.y
});

snake.insert({
  x: pos.x - CELL_SIZE * 2,
  y: pos.y
});

const objects = new Map();
app.stage.addChild(g);
document.body.appendChild(app.view);
let currentDirection = '';

Controls.$events.subscribe((direction)=>{
  currentDirection = direction;
});

interval(RENDER_TICK).subscribe(val => render(val));
g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);

objects.set('pickup-1', {
  id: 'pickup-1',
  pos: {x: 10 * CELL_SIZE, y: 2 * CELL_SIZE},
  w: CELL_SIZE,
  type: 'pickup',
  h: CELL_SIZE,
  fillColor: 0x11cc22,
  lineClor: 0x121212
});

function render(step) {
  g.clear();
  g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  renderPickups();
  const isMoving = !!currentDirection;
  if (isMoving) {
    updatePos();
    collisionCheck();
  }
  // render the snake
  let node = snake.tail;
  while (!!node) {
    g.rect(node.pos.x, node.pos.y, CELL_SIZE, CELL_SIZE, node === snake.tail ? 0x773366 : 0x669911);
    node = node.next;
  }
}

function renderPickups() {
  Array.from(objects.values()).forEach((o)=>{
    g.rect(o.pos.x, o.pos.y, o.w, o.h, o.fillColor|0xcc0000, o.lineColor|0x00bb00);
  });
}

function collisionCheck() {
  let node = snake.tail;
  while (!!node) {
    Array.from(objects.values()).forEach((o)=>{
      if (rectsCollide(node, o)){
        snake.insert(o.pos);
        objects.delete(o.id);
      }
    });
    node = node.next;
  }
}

function updatePos() {
  let tailPosition = { ...snake.tail.pos};
  switch (currentDirection) {
    case 'up' : tailPosition.y-=VELOCITY; break;
    case 'down' : tailPosition.y +=VELOCITY; break;
    case 'left': tailPosition.x -=VELOCITY; break;
    case 'right': tailPosition.x +=VELOCITY; break;
  }
  // pacman-like going out of bounds
  if (tailPosition.x > WIDTH - 1) {
    tailPosition.x = 0;
  }
  if (tailPosition.x < 0 ) {
    tailPosition.x = WIDTH - 1;
  }
  if (tailPosition.y > HEIGHT - 1){
    tailPosition.y = 0;
  }
  if (tailPosition.y < 0) {
    tailPosition.y = HEIGHT - 1;
  }
  snake.tick({...tailPosition});
}

function rectsCollide(ab, bb) {
  return ab.pos.x + ab.w > bb.pos.x && ab.pos.x < bb.pos.x + bb.w && ab.pos.y + ab.h > bb.pos.y && ab.pos.y < bb.pos.y + bb.h;
}