import Entity from '../entity';
import { RNG } from 'rot-js';
import { ID_UPPER_BOUND, WALL } from '../../constants';

class Wall extends Entity {
    constructor() {
        const id = RNG.getUniformInt(0, ID_UPPER_BOUND);
        super({
            id, 
            priority: WALL.PRIORITY,
            character: WALL.CHAR,
            color: WALL.COLOR,
            collideable: true,
            active: false
        });
    }
}

export default Wall;