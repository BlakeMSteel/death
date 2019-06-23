import Entity, { IEntityProps } from "./entity";
import Game from "../game";
import * as ROT from "rot-js";

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
        this.game.engine.lock();
    }

    protected moveTowardsPlayer(topology: 4 | 8) {
        if (this.isInPositionOfPlayer()) {
            this.removeSelf();
            return;
        }
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

        path.shift(); // Remove current position
        if (path.length == 1) {
            alert("Game over - you were captured!");
            this.game.engine.lock();
        } else {
            x = path[0][0];
            y = path[0][1];
            this.game.map.moveEntity(this, x, y);
            this.x = x;
            this.y = y;
        }
    }

    protected isInPositionOfPlayer() {
        return this.x === this.game.player.getX() && this.y === this.game.player.getY();
    }

    protected removeSelf() {
        this.game.removeEntity(this);
    }

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