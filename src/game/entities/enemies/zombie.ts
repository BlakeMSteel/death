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

    protected takeTurn() {
        var pathToPlayer = this.getPathToPlayer(4);

        if (pathToPlayer.length <= ZOMBIE.SENSE_RADIUS && !this.skippingTurn) {
            this.moveAlongPath(pathToPlayer);
        }

        this.interactWithCurrentSpace();
        this.skippingTurn = !this.skippingTurn;
    }

    public actUponByPlayer() {
        this.game.logger.logMessage('You have slain a zombie!');
        super.actUponByPlayer();
    }
}

export default Zombie;