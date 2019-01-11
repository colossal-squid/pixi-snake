import * as PIXI from 'pixi.js';

class Graphics extends PIXI.Graphics {
    constructor() {
        super();
    }

    rect(x,y,w,h, fillColor, lineColor) {
        this.beginFill(fillColor||0xFFFFFF);
        this.lineStyle(2, lineColor||0xffd900, 1);
        this.moveTo(x,y);
        this.lineTo(x+w, y);
        this.lineTo(x+w, y+h);
        this.lineTo(x, y+h);
        this.lineTo(x, y);
        this.endFill();
    }

    drawGrid(w, h, cellSize) {
        this.lineStyle(1, 0xf333333, 1);
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
        this.lineStyle(2, 0xff33ff, 1);
        this.rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
}

export default Graphics;