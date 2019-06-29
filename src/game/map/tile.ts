import Entity from '../entities/entity';
import ActiveEntity from '../entities/activeEntity';

class Tile {
    private _entities: Array<Entity>;

    constructor(
        entity: Entity
    ) {
        this._entities = new Array<Entity>(entity);
    }

    public actUponByEnemy() {
        this._entities.forEach(entity => {
            entity.actUponByEnemy();
        })
    }

    public actUponByPlayer() {
        this._entities.forEach(entity => {
            entity.actUponByPlayer();
        });
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
            if (this._entities[i].getPriority() > highestPriorityEntity.getPriority()) {
                highestPriorityEntity = this._entities[i];
            }
        }
        
        return highestPriorityEntity;
    }

    public isCollideable() {
        let collideable = false;
        this._entities.forEach(entity => {
            if (entity.getCollideable()) {
                collideable = true;
            }
        });
        return collideable;
    }

    public isImmoveable() {
        let immoveable = false;
        this._entities.forEach(entity => {
            if (entity.getCollideable() && !(entity instanceof ActiveEntity)) {
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