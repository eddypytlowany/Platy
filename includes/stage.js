
// System
const rl    = require('readline');

// Local
const Base  = require('platy/includes/base');


function resolve(state) {

    if(this.resolve) {

        this.resolve(state);

    }

    this.resolve = null;

}

class Stage extends Base {

    constructor(name, readline) {

        super(name);

        this.fps        = 1;
        this.spacer     = ' ~ ';
        this.width      = 0;
        this.height     = 0;

        this.readline  = readline || rl.createInterface({
            input   : process.stdin,
            output  : process.stdout
        });

    }

    clear() {

        rl.moveCursor(this.readline, -1 * this.width, -1 * this.height);

        rl.clearScreenDown(this.readline);

        this.width  = 0;
        this.height = 0;

    }

    render(action) {

        let frame   = action.animation.current();
        let say     = action.say.split("\n");
        let text    = [];
        let spacer  = this.spacer;

        for( var i in say) {

            text[ Number(i) +  Math.max(Math.round( frame.height/Math.max(say.length, 2) ) - 1, 0) ] = say[i];

        }

        this.clear();

        this.width  = frame.width + this.spacer.length + action.say.length;
        this.height = Math.max(frame.height, say.length);

        for(var i = 0; i < this.height; i++) {

            if( text[i] ) {

                this.readline.write( (frame.lines[i] || '').padEnd(frame.width) );
                this.readline.write( spacer );
                this.readline.write( text[i] );

                spacer = ''.padEnd( this.spacer.length );

            } else {

                this.readline.write( frame.lines[i].padEnd(this.width) );

            }

            this.readline.write('\n');

        }

    }

    play(action, duration) {

        return new Promise( resolve => {

            this.duration   = duration * 1000;
            this.action     = action;

            clearTimeout(this.timeoutID);

            this.stop();

            this.render(action);

            this.intervalID = setInterval(action => {

                action.animation.next();

                this.render(action);

            }, 1000 / this.fps, this.action);

            if(this.duration) {

                this.timeoutID = setTimeout(this.stop.bind(this), this.duration);

            }

            this.resolve   = resolve;

        } );

    }

    pause () {

        clearInterval(this.intervalID);

        resolve.call(this, 'pause');

    }

    stop () {

        clearInterval(this.intervalID);
        
        this.action && this.action.animation.reset();

        this.clear();

        resolve.call(this, 'stop');
        
    }

}


module.exports = Stage;