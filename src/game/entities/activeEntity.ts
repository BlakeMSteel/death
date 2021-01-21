import Entity, { IEntityProps } from './entity';
import Game from '../game';
import * as ROT from 'rot-js';

export interface IActiveEntityProps {
    x: number,
    y: number,
    game: Game,
    id: number,
    priority: number,
    character: string,
    color: string,
    collideable: boolean,
    backgroundColor?: string | null
}

abstract class ActiveEntity extends Entity {
    x: number;
    y: number;
    game: Game;

    constructor(props: IActiveEntityProps) {
        super({
            active: true,
            id: props.id,
            priority: props.priority,
            character: props.character,
            color: props.color,
            collideable: props.collideable,
            backgroundColor: props.backgroundColor,
        });
        this.x = props.x;
        this.y = props.y;
        this.game = props.game;
    }

    public act() {
        this.takeTurn();
    }

    protected takeTurn() {
        this.game.engine.lock();
    }

    protected moveAlongPath(path: Array<[number, number]>) {
        path.shift(); // Remove current position
        if (path.length > 0) {
            var x = path[0][0];
            var y = path[0][1];
            this.game.map.moveEntity(this, x, y);
            this.x = x;
            this.y = y;
        }
    }

    protected getPathToPlayer(topology: 4 | 8) {
        var x = this.game.player.getX();
        var y = this.game.player.getY();
        var passableCallback = (x: number, y: number) => {
            return !this.game.map.isSpaceOccupied(x, y);
        }
        var astar = new ROT.Path.AStar(x, y, passableCallback, { topology });

        var path: Array<[number, number]> = [];
        var pathCallback = function(x: number, y: number) {
            path.push([x, y]);
        }
        astar.compute(this.x, this.y, pathCallback);
        return path;
    }

    protected moveARandomDirection() {
        let possibleChoices = new Array<[number, number]>()
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!this.game.map.isSpaceCollideable(this.x + x, this.y + y)) {
                    possibleChoices.push([this.x + x, this.y + y]);
                }
            }
        }

        if (possibleChoices.length > 0) {
            const randomTile = possibleChoices[ROT.RNG.getUniformInt(0, possibleChoices.length - 1)];
            this.game.map.moveEntity(this, randomTile[0], randomTile[1]);
            this.x = randomTile[0];
            this.y = randomTile[1];
        }
    }

    protected interactWithCurrentSpace() {
        this.game.map.actUponSpaceByEnemy(this.x, this.y);
    }

    protected isInPositionOfPlayer() {
        return this.x === this.game.player.getX() && this.y === this.game.player.getY();
    }

    protected removeSelf() {
        this.game.removeEntity(this);
    }

    public actUponByPlayer() {
        this.removeSelf();
    }

    public actUponByEnemy() {}

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public setX(x: number) {
        this.x = x;
    }

    public setY(y: number) {
        this.y = y;
    }
}

export default ActiveEntity;