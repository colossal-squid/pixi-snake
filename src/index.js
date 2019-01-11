import * as PIXI from 'pixi.js';
import Graphics from './components/Graphics';

const WIDTH = 800, HEIGHT = 600, CELL_SIZE = 40;
function component() {
    const app = new PIXI.Application(800, 600, {backgroundColor : 0x00});
    var g = new Graphics();
    g.drawGrid(WIDTH, HEIGHT, CELL_SIZE);
    g.cell(3,3,CELL_SIZE);
    // g.rect(300, 300, CELL_SIZE, CELL_SIZE);
    app.stage.addChild(g);
    return app.view;
  }
  
  document.body.appendChild(component());