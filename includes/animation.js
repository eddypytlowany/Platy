
const Base  = require('./base');
const Frame = require('./frame');


class Animation extends Base {

    constructor (name, frames) {

        super(name);

        this.frames     = [];
        this.pointer    = 0;

        Array.isArray(frames) && frames.forEach( (frame,i) => this.addFrame(frame, i, 1) );

    }

    addFrame(frame, location, length) {

        location    = location || this.frames.length;
        length      = length || 1;
        frame       = new Frame(frame);

        for(var i = 0; i < length; i++) {

            this.frames.splice(location + i, 1, frame);

        }

        return frame;

    }

    current() {

        return this.frames[this.pointer];

    }

    next() {

        this.pointer++;

        if( this.pointer === this.frames.length ) {

            this.reset();

        }

    }

    prev() {

        this.pointer--;

        if( this.pointer < 0 ) {

            this.end();

        }

    }

    reset() {

        this.pointer = 0;

    }

    end() {

        this.pointer = this.frames.length - 1;

    }

}


module.exports = Animation;