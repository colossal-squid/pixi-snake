class Node {
    constructor(cellSize) {
        this.next = 0;
        this.type = 'snake_node';
        this.w = cellSize;
        this.h = cellSize;
        this.pos = {
            x: 0,
            y: 0
        }
    }
}

export default class SnakeList {

    constructor (tailPos, cellSize) {
        this.tail = new Node(cellSize);
        this.cellSize = cellSize;
        this.tail.pos = {...tailPos};
    }

    insert(newPos, fillColor) {
        let node = new Node(this.cellSize);
        node.pos = { ...newPos };
        node.next = this.tail;
        node.fillColor = fillColor;
        this.tail = node;
    }

    tick(tailPosition) {
        let newPosition = {...tailPosition};
        let node = this.tail;

        while (!!node) {
            let oldPosition = {...node.pos};
            node.pos = {...newPosition};

            newPosition = oldPosition;
            node = node.next;
        }
    }
}