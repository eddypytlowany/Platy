
class Frame {

    constructor (frame) {

        this.lines  = frame.split("\n");
    }

    get width() {

        return Math.max.apply(Math,  this.lines.map( l => l.length ) );

    }

    get height() {

        return this.lines.length;

    }

}


module.exports = Frame;