import ActiveEntity from './entities/activeEntity';
import Entity from './entities/entity';
import Map from './map/map';
import Player from './entities/player';
import * as ROT from 'rot-js';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, ENEMY_TYPE_COUNT } from './constants';
import * as Enemies from './entities/enemies';
import { Stairs } from './entities/environment';
import Torch from './entities/environment/torch';

class Game {
    floor: number;
    engine: ROT.Engine;
    entities: Array<ActiveEntity>;
    player: Player;
    map: Map;
    scheduler = new ROT.Scheduler.Simple();
    stairs?: Stairs;

    constructor() {
        this.floor = 0;
        this.engine = new ROT.Engine(this.scheduler);
        this.entities = new Array<ActiveEntity>();
        this.player = new Player(-1, -1, this);
        this.map = new Map(DISPLAY_WIDTH, DISPLAY_HEIGHT);
        this.advanceFloors();
        this.engine.start();
    }

    public advanceFloors() {
        this.floor++;
        if (this.player) {
            this.scheduler.remove(this.player);
        }
        while (this.entities.length > 0) {
            this.removeEntity(this.entities[0]);
        }
        if (this.map) {
            this.map.removeDisplayFromDOM();
        }
        this.map = new Map(DISPLAY_WIDTH, DISPLAY_HEIGHT);

        this.entities = new Array<ActiveEntity>();

        this.generatePlayer(this.player);
        this.generateEnemiesForCurrentFloor();
        for (let i = 0; i < 10; i++) {
            this.generateActiveEntity(Torch);
        }
        this.stairs = this.generateEntity(Stairs);
    }

    public removeEntity(entity: ActiveEntity) {
        this.map.removeEntity(entity);
        this.scheduler.remove(entity);
        var index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
    }

    private generateActiveEntity(type: new (x: number, y: number, game: Game) => ActiveEntity) {
        const newEntity = new type(-1, -1, this);
        const placeable = this.map.putActiveEntityInRandomFreeSpace(newEntity);
        if (placeable) {
            this.entities.push(newEntity);
            this.scheduler.add(newEntity, true);
        }
    }

    private generateEnemiesForCurrentFloor() {
        for (let i = 0; i < this.floor * 4; i++) {
            this.createNewEnemyRandomly();
        }
    }

    private generateEntity(type: new () => Entity) {
        const newEntity = new type();
        const placeable = this.map.putEntityInRandomFreeSpace(newEntity);
        if (placeable) {
            return newEntity;
        }
    }

    private generatePlayer(player: Player) {
        const placeable = this.map.putActiveEntityInRandomFreeSpace(player);
        if (placeable) {
            this.scheduler.add(player, true);
        }
    }

    private createNewEnemyRandomly() {
        switch (ROT.RNG.getUniformInt(1, ENEMY_TYPE_COUNT)) {
            case(1):
                return this.generateActiveEntity(Enemies.Bat);
            case(2):
                return this.generateActiveEntity(Enemies.Zombie);
            default:
                return this.generateActiveEntity(Enemies.Bat);
        };
    }
}

export default Game;