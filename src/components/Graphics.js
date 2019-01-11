import * as PIXI from 'pixi.js';

class Graphics extends PIXI.Graphics {
    constructor() {
        super();
        this.lineStyle(4, 0xffd900, 1);
    }

    rect(x,y,w,h) {
        this.beginFill(0xFFFFFF);
        this.moveTo(x,y);
        this.lineTo(x+w, y);
        this.lineTo(x+w, y+h);
        this.lineTo(x, y+h);
        this.lineTo(x, y);
        this.endFill();
    }

    drawGrid(w, h, cellSize) {
        this.lineStyle(1, 0xffffff, 1);
        // vertical lines
        for (let x=0; x<w; x += cellSize) {
            this.moveTo(x, 0);
            this.lineTo(x, h);
        }
        // horizontal
        for (let y=0; y<h; y += cellSize) {
            this.moveTo(0, y);
            this.lineTo(w, y);
        }
    }

    cell(x, y, cellSize) {
        this.rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
}

export default Graphics;