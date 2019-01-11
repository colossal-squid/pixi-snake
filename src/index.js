import * as PIXI from 'pixi.js';
import { interval } from 'rxjs';

import Graphics from './components/Graphics';

const WIDTH = 800, HEIGHT = 600, CELL_SIZE = 40;
const max_X = Math.floor(WIDTH/CELL_SIZE), max_Y =  Math.floor(HEIGHT/CELL_SIZE);
const app = new PIXI.Application(800, 600, {backgroundColor : 0x00});
const g = new Graphics();

function component() {
    // g.rect(300, 300, CELL_SIZE, CELL_SIZE);
    app.stage.addChild(g);
    return app.view;
  }
  
  document.body.appendChild(component());
  
  const source = interval(300);
  const subscribe = source.subscribe(val => render(val));
  g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
  function render(step) {
    g.clear();
    g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
    if (step > max_X * max_Y) {
      step -= max_X * max_Y;
    }
    for (let i=0; i <= step; i++) {
      g.cell(i % max_X, Math.floor((i - i % max_X)/ max_X), CELL_SIZE);
    }

  }