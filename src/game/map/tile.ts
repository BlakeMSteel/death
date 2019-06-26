import Entity from '../entities/entity';

class Tile {
    private _entities: Array<Entity>;

    constructor(
        entity: Entity
    ) {
        this._entities = new Array<Entity>(entity);
    }

    public addEntity(entity: Entity) {
        this._entities.push(entity);
    }

    public doesTileContainEntity(entity: Entity) {
        for (let i = 0; i < this._entities.length; i++) {
            if (entity.equals(this._entities[i])) {
                return true;
            }
        }
        return false;
    }

    public getDisplayedTile() {
        if (this._entities.length <= 0) {
            return null;
        }

        let highestPriorityEntity = this._entities[0];

        for (let i = 1; i < this._entities.length; i++) {
            if (this._entities[i].priority > highestPriorityEntity.priority) {
                highestPriorityEntity = this._entities[i];
            }
        }
        
        return highestPriorityEntity;
    }

    public isCollideable() {
        let collideable = false;
        this._entities.forEach(entity => {
            if (entity.collideable) {
                collideable = true;
            }
        });
        return collideable;
    }

    public isImmoveable() {
        let immoveable = false;
        this._entities.forEach(entity => {
            if (entity.collideable && !entity.active) {
                immoveable = true;
            }
        })
        return immoveable;
    }

    public removeEntity(entity: Entity) {
        const foundEntity = this._entities.find((existingEntity) => {
            return existingEntity.equals(entity);
        })

        if (foundEntity) {
            this._entities.splice(this._entities.indexOf(foundEntity), 1);
        }
    }
}

export default Tile;