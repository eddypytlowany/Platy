
const Base      = require('./base');
const Action    = require('./action');

class Character extends Base {

    constructor (name) {
        
        super(name);

        this.actions    = {};

    }

    on(name, animation, say) {

        const action = new Action(name, this, animation, say);

        this.actions[action.name] = action;

        return action;

    }

    action(name) {

        return this.actions[name].prepare;

    }

}


module.exports = Character;