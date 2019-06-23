import ActiveEntity from './activeEntity';
import * as ROT from 'rot-js';
import { PLAYER } from '../constants';
import Game from '../game';

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
        this.game.map.getFOVFromLocation(this.x, this.y);
        window.document.addEventListener("keydown", this.handleEvent);
    }

    private handleEvent = (e: any) => {
        let keyMap: { [keyCode: number]: number } = {
            38: 0,
            33: 1,
            39: 2,
            34: 3,
            40: 4,
            35: 5,
            37: 6,
            36: 7
        };

        var code = e.keyCode;

        if (!(code in keyMap)) {
            return;
        }

        var diff = ROT.DIRS[8][keyMap[code]];
        let newX = this.x + diff[0];
        let newY = this.y + diff[1];

        if (this.game.map.isSpaceOccupied(newX, newY)) {
            return;
        }

        this.game.map.moveEntity(this, newX, newY);
        this.x = newX;
        this.y = newY;
        window.removeEventListener("keydown", this.handleEvent);
        this.game.engine.unlock();
    }
}

export default Player;