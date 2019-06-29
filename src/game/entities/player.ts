import ActiveEntity from './activeEntity';
import * as ROT from 'rot-js';
import { PLAYER, COMMA, MOVEMENT_KEYCODES } from '../constants';
import Game from '../game';
import Stairs from './environment/stairs';

class Player extends ActiveEntity{
    constructor(x: number, y: number, game: Game) {
        super({
            x,
            y,
            game,
            id: PLAYER.ID,
            priority: PLAYER.PRIORITY,
            character: PLAYER.CHAR,
            color: PLAYER.COLOR,
            collideable: true,
        })
    }

    public act() {
        this.game.engine.lock();
        this.game.map.drawFOVFromLocation(this.x, this.y, PLAYER.VISION_RADIUS);
        window.document.addEventListener("keydown", this.handleEvent);
    }

    private handleEvent = (e: any) => {
        var code = e.keyCode;

        if (!(code in MOVEMENT_KEYCODES)) {
            return;
        }

        var diff = ROT.DIRS[8][MOVEMENT_KEYCODES[code]];
        let newX = this.x + diff[0];
        let newY = this.y + diff[1];

        if (this.game.map.isSpaceOccupied(newX, newY)) {
            return;
        }

        this.game.map.moveEntity(this, newX, newY);
        this.x = newX;
        this.y = newY;
        this.interactWithCurrentSpace();
        this.endPlayerTurn();
    }

    private endPlayerTurn() {
        window.document.removeEventListener("keydown", this.handleEvent);
        this.game.map.clearDisplay();
        this.game.engine.unlock();
    }

    protected interactWithCurrentSpace() {
        if (this.game.map.doesSpaceContainStairs(this.x, this.y)) {
            this.game.advanceFloors();
        }
        this.game.map.actUponSpaceByPlayer(this.x, this.y);
    }

    public actUponByEnemy() {
        this.removeSelf();
    }

    public actUponByPlayer() {}
}

export default Player;