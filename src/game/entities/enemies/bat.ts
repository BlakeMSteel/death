import ActiveEntity from '../activeEntity';
import Game from '../../game';
import * as ROT from 'rot-js';
import { BAT, ID_UPPER_BOUND } from '../../constants';

class Bat extends ActiveEntity {
    private movingRandomlyTurn = false;

    constructor(x: number, y: number, game: Game) {
        super({
            x,
            y,
            game,
            id: ROT.RNG.getUniformInt(0, ID_UPPER_BOUND),
            priority: BAT.PRIORITY,
            character: BAT.CHAR,
            color: BAT.COLOR,
            collideable: true
        })
    }

    protected takeTurn() {
        var pathToPlayer = this.getPathToPlayer(8);

        if (pathToPlayer.length <= BAT.SENSE_RADIUS && !this.movingRandomlyTurn) {
            this.moveAlongPath(pathToPlayer);
        } else {
            this.moveARandomDirection();
        }

        this.interactWithCurrentSpace();
        this.movingRandomlyTurn = !this.movingRandomlyTurn;
    }

    public actUponByPlayer() {
        this.game.logger.logMessage('You have slain a bat!');
        super.actUponByPlayer();
    }
}

export default Bat;