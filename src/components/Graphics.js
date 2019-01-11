import * as PIXI from 'pixi.js';

class Graphics extends PIXI.Graphics {
    constructor(document, width, height) {
        super();
        this.inDomInit(document, width, height);
    }

    inDomInit(document, width, height) {
        const app = new PIXI.Application(width, height, {backgroundColor : 0x00});
        app.stage.addChild(this);
        document.body.appendChild(app.view);
    }

    rect(x,y,w,h, fillColor, lineColor, lineWidth) {
        this.beginFill(fillColor||0xFFFFFF);
        this.lineStyle(lineWidth||2, lineColor||0xffd900, 1);
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

}

export default Graphics;