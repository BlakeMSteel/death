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

    public act() {
        if (!this.movingRandomlyTurn) {
            this.moveTowardsPlayer(8);
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

    private moveARandomDirection() {
        let possibleChoices = new Array<[number, number]>()
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!this.game.map.isSpaceCollideable(this.x + x, this.y + y)) {
                    possibleChoices.push([this.x + x, this.y + y]);
                }
            }
        }

        if (possibleChoices.length > 0) {
            const randomTile = possibleChoices[ROT.RNG.getUniformInt(0, possibleChoices.length - 1)];
            this.game.map.moveEntity(this, randomTile[0], randomTile[1]);
            this.x = randomTile[0];
            this.y = randomTile[1];
        }
    }
}

export default Bat;