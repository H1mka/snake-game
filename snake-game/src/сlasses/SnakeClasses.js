class SnakeHead {
    constructor(pos) {
        this.pos = pos;
    }
}

class SnakeBody {
    constructor(pos, next) {
        this.pos = pos;
        this.next = next;
    }
}

export { SnakeHead, SnakeBody };
