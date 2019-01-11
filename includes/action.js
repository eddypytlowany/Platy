
const Base = require('./base');


class Action extends Base {

    constructor(name, parent, animation, say) {

        super(name);

        this.animation  = animation;
        this.say        = say || '';
        this.parent     = parent;

    }

    get prepare() {

        return this;

    }

}

module.exports = Action;