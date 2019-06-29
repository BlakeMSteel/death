import ActiveEntity from '../activeEntity';
import Game from '../../game';
import * as ROT from 'rot-js';
import { ZOMBIE, ID_UPPER_BOUND } from '../../constants';

class Zombie extends ActiveEntity {
    private skippingTurn = false;

    constructor(x: number, y: number, game: Game) {
        super({
            x,
            y,
            game,
            id: ROT.RNG.getUniformInt(0, ID_UPPER_BOUND),
            priority: ZOMBIE.PRIORITY,
            character: ZOMBIE.CHAR,
            color: ZOMBIE.COLOR,
            collideable: true
        })
    }

    public act() {
        if (!this.skippingTurn) {
            super.moveTowardsPlayer(4);
        } else if (super.isInPositionOfPlayer()) {
            super.removeSelf();
        }
        this.interactWithCurrentSpace();
        this.skippingTurn = !this.skippingTurn;
    }
}

export default Zombie;