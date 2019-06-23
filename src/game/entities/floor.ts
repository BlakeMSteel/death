import Entity from './entity';
import { RNG } from 'rot-js';
import { ID_UPPER_BOUND, FLOOR } from '../constants';

class Floor extends Entity {
    constructor() {
        const id = RNG.getUniformInt(0, ID_UPPER_BOUND);
        super({
            id, 
            priority: FLOOR.PRIORITY,
            character: FLOOR.CHAR,
            color: FLOOR.COLOR,
            collideable: false,
            active: false
        });
    }
}

export default Floor;