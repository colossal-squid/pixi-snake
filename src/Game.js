import SnakeList from './SnakeList';
import { WIDTH, HEIGHT, CELL_SIZE, RENDER_TICK } from './config'
import { randomColor } from './Util';

function rectsCollide(ab, bb) {
    return ab.pos.x + ab.w > bb.pos.x && ab.pos.x < bb.pos.x + bb.w && ab.pos.y + ab.h > bb.pos.y && ab.pos.y < bb.pos.y + bb.h;
}

export default class Game {

    constructor () {
        const startPoint = {x: 10 * CELL_SIZE, y: 10 * CELL_SIZE},
              pos = {...startPoint};
        this.snake = new SnakeList(pos, CELL_SIZE);
        this._objects = new Map();
        this.currentDirection = '';
        // make it a 3-section
        this.snake.insert({ x: pos.x - CELL_SIZE, y: pos.y });  
        this.snake.insert({ x: pos.x - CELL_SIZE * 2, y: pos.y });
        this.addPickup();
    }

    get objects() {
        return Array.from(this._objects.values());
    }

    get snakeNodes() {
        const nodes = [];
        let node = this.snake.tail;
        while (!!node) {
          node.isTail = (node === this.snake.tail);
          nodes.push(node);
          node = node.next;
        }
        return nodes;
    }

    get isMoving() {
        return !!this.currentDirection;
    }

    tick() {
        this.updatePos();
        this.collisionCheck();
    }

    changeDirection(direction) {
        this.currentDirection = direction;
    }

    collisionCheck() {
        // touching walls or yourself
        
        // picking up items
        this.snakeNodes.forEach((node)=>{
            this.objects.forEach((o)=>{
                if (rectsCollide(node, o)){
                  this.snake.insert(o.pos, o.fillColor);
                  this._objects.delete(o.id);
                  this.addPickup();
                }
            });
        });
    }

    addPickup() {
        this._pickupCount = this._pickupCount || 1;
        const randomPickup = function() {
            return {
                w: CELL_SIZE,
                h: CELL_SIZE,
                pos: {
                    x: Math.floor(Math.random() * (WIDTH / CELL_SIZE - 1)) * CELL_SIZE,
                    y: Math.floor(Math.random() * (HEIGHT / CELL_SIZE - 1)) * CELL_SIZE
                }
            }
        }
        let pickup = randomPickup();
        while ( this.snakeNodes
            .filter(n => rectsCollide(n, pickup) ).length !== 0 ) {
            pickup = randomPickup();
        }
        this._objects.set(`pickup-${this._pickupCount}`, {
            id: `pickup-${this._pickupCount}`,
            type: 'pickup',
            fillColor: randomColor(),
            lineColor: randomColor(),
            ...pickup
        }); 
    }

    updatePos() {
        let tailPosition = { ...this.snake.tail.pos};
        switch (this.currentDirection) {
          case 'up' : tailPosition.y-=CELL_SIZE; break;
          case 'down' : tailPosition.y +=CELL_SIZE; break;
          case 'left': tailPosition.x -=CELL_SIZE; break;
          case 'right': tailPosition.x +=CELL_SIZE; break;
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
        this.snake.tick({...tailPosition});
      }

}