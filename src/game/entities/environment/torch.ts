import ActiveEntity from '../activeEntity';
import Game from '../../game';
import * as ROT from 'rot-js';
import { TORCH, ID_UPPER_BOUND } from '../../constants';

class Torch extends ActiveEntity {
    private lit = false;

    constructor(x: number, y: number, game: Game) {
        super({
            x,
            y,
            game,
            id: ROT.RNG.getUniformInt(0, ID_UPPER_BOUND),
            priority: TORCH.PRIORITY,
            character: TORCH.CHAR,
            color: TORCH.UNLIT_COLOR,
            collideable: true
        })
    }

    public act() {
        if (this.lit) {
            this.game.map.drawFOVFromLocation(this.x, this.y, TORCH.VISION_RADIUS);
        }
    }

    public actUponByPlayer() {
        this.lit = true;
        this.color = TORCH.LIT_COLOR;
    }

    public actUponByEnemy() {
        this.lit = false;
        this.color = TORCH.UNLIT_COLOR;
    }
}

export default Torch;