import ActiveEntity from '../activeEntity';
import Game from '../../game';
import * as ROT from 'rot-js';
import { GHOST, ID_UPPER_BOUND } from '../../constants';

class Ghost extends ActiveEntity {
    constructor(x: number, y: number, game: Game) {
        super({
            x,
            y,
            game,
            id: ROT.RNG.getUniformInt(0, ID_UPPER_BOUND),
            priority: GHOST.PRIORITY,
            character: GHOST.CHAR,
            color: GHOST.COLOR,
            collideable: true
        })
    }

    protected takeTurn() {
        var pathToPlayer = this.getPathToPlayerNoCollision();
        if (pathToPlayer.length <= GHOST.SENSE_RADIUS) {
            this.moveAlongPath(pathToPlayer);
        } else {
            this.moveARandomDirection();
        }
        if (pathToPlayer.length <= 3) {
            this.game.map.drawTile(this.x, this.y);
        }
        this.interactWithCurrentSpace();
    }

    private getPathToPlayerNoCollision() {
        var x = this.game.player.getX();
        var y = this.game.player.getY();
        var passableCallback = () => true;
        var astar = new ROT.Path.AStar(x, y, passableCallback, { topology: 8 });

        var path: Array<[number, number]> = [];
        var pathCallback = function(x: number, y: number) {
            path.push([x, y]);
        }
        astar.compute(this.x, this.y, pathCallback);

        return path;
    }

    public actUponByPlayer() {
        this.game.logger.logMessage('You have slain a ghost!');
        super.actUponByPlayer();
    }
}

export default Ghost;