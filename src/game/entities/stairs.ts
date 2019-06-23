import Entity from './entity';
import { STAIRS } from '../constants';

class Stairs extends Entity {
    constructor() {
        super({
            id: STAIRS.ID,
            priority: STAIRS.PRIORITY,
            character: STAIRS.CHAR,
            color: STAIRS.COLOR,
            collideable: false,
            active: false
        });
    }
}

export default Stairs;