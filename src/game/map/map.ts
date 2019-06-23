import * as ROT from 'rot-js';
import ActiveEntity from '../entities/activeEntity';
import Tile from './tile';
import Wall from '../entities/wall';
import Floor from '../entities/floor'
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, MAP_TYPE, PLAYER } from '../constants';
import Entity from '../entities/entity';

class Map {
    private _map: Array<Array<Tile>>;
    private display: ROT.Display;

    constructor(
        width: number,
        height: number,
    ) {
        this._map = this.create2DArrayOfTiles(width, height);
        this.display = new ROT.Display({
            width,
            height,
            fontSize: 15
        });
        this.generateMap(MAP_TYPE.DUNGEON_UNIFORM);
    }

    private create2DArrayOfTiles(width: number, height: number) {
        let array = new Array<Array<Tile>>(width);
        
        for (let i = 0; i < width; i++) {
            array[i] = new Array<Tile>(height);
        }

        return array;
    }

    private drawMap() {
        for (let x = 0; x < this._map.length; x++) {
            for (let y = 0; y < this._map[x].length; y++) {
                this.drawTile(x, y);
            }
        }
    }

    private drawTile(x: number, y: number) {
        let entity = this._map[x][y].getDisplayedTile();
        if (!entity) {
            entity = new Floor();
        }
        this.display.draw(x, y, entity.character, entity.color, entity.backgroundColor);
    }

    private generateMap( type: string = MAP_TYPE.ARENA ) {
        document.body.appendChild(this.display.getContainer()!);

        var mapper = null;
        switch(type) {
            case MAP_TYPE.ARENA:
                mapper = new ROT.Map.Arena(DISPLAY_WIDTH, DISPLAY_HEIGHT);
                break;
            case MAP_TYPE.CELLULAR:
                mapper = new ROT.Map.Cellular(
                    DISPLAY_WIDTH,
                    DISPLAY_HEIGHT, 
                    {
                        born: [4, 5, 6, 7, 8],
                        survive: [2, 3, 4, 5, 6],
                    }
                );
                mapper.randomize(0.25);
                break;
            case MAP_TYPE.DUNGEON_DIGGER:
                mapper = new ROT.Map.Digger(
                    DISPLAY_WIDTH,
                    DISPLAY_HEIGHT,
                    {
                        corridorLength: [2,5],
                        dugPercentage: 0.8,
                        roomHeight: [4, 8],
                        roomWidth: [4, 8],
                    }
                );
                break;
            case MAP_TYPE.DUNGEON_ROGUE:
                mapper = new ROT.Map.Rogue(DISPLAY_WIDTH, DISPLAY_HEIGHT, {});
                break;
            case MAP_TYPE.DUNGEON_UNIFORM:
                mapper = new ROT.Map.Uniform(
                    DISPLAY_WIDTH,
                    DISPLAY_HEIGHT,
                    {
                        roomDugPercentage: 0.5,
                        roomHeight: [4, 12],
                        roomWidth: [4, 12],
                    }
                );
                break;
            case MAP_TYPE.MAZE_DIVIDED:
                mapper = new ROT.Map.DividedMaze(DISPLAY_WIDTH, DISPLAY_HEIGHT);
                break;
            case MAP_TYPE.MAZE_ELLER:
                mapper = new ROT.Map.EllerMaze(DISPLAY_WIDTH, DISPLAY_HEIGHT);
                break;
            case MAP_TYPE.MAZE_ICEY:
                mapper = new ROT.Map.IceyMaze(DISPLAY_WIDTH, DISPLAY_HEIGHT);
                break;
            default:
                mapper = new ROT.Map.Arena(DISPLAY_WIDTH, DISPLAY_HEIGHT);
                break;
        }

        var mapperCallback = (x: number, y: number, value: number) => {
            //value = 1 -> wall
            //value = 0 -> empty space
            if (value) {
                this._map[x][y] = new Tile(new Wall());
            } else {
                this._map[x][y] = new Tile(new Floor());
            }
        }

        mapper.create(mapperCallback);
        if (type === MAP_TYPE.CELLULAR) {
            for (var i = 0; i < 40; i++) {
                mapper.create(() => {});
            }
            mapper.create(mapperCallback.bind(this));
        }
    }

    private getFreeTiles() {
        let freeTiles = new Array<string>();
        
        for (let x = 0; x < this._map.length; x++) {
            for (let y = 0; y < this._map[x].length; y++) {
                if (!this._map[x][y].isCollideable()) {
                    freeTiles.push(x + "," + y);
                }
            }
        }

        return freeTiles;
    }

    public getFOVFromLocation(locationX: number, locationY: number) {
        this.display.clear();
        const lightPasses = (x: number, y: number) => {
            if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT) {
                if (!this._map[x][y].isImmoveable()) {
                    return true;
                }
            }
            return false;
        }

        const fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

        fov.compute(
            locationX,
            locationY,
            PLAYER.VISION_RADIUS,
            (x: number, y: number, radius: number, visibility: number) => {
                this.drawTile(x, y);
            }
        );
    }

    public isSpaceCollideable(x: number, y: number) {
        return this._map[x][y].isCollideable();
    }

    public isSpaceOccupied(x: number, y: number) {
        return this._map[x][y].isImmoveable();
    }

    public moveEntity(entity: Entity, x: number, y: number) {
        for (let i = 0; i < this._map.length; i++) {
            for (let j = 0; j < this._map[i].length; j++) {
                if (this._map[i][j].checkEntity(entity)) {
                    this._map[i][j].removeEntity(entity);
                    this.drawTile(i, j);
                    this._map[x][y].addEntity(entity);
                }
            }
        }
    }

    public putActiveEntityInRandomFreeSpace(entity: ActiveEntity) {
        let freeTiles = this.getFreeTiles();
        if (freeTiles.length === 0) {
            return false;
        }
        const freeCellIndex = ROT.RNG.getUniformInt(0, freeTiles.length - 1);
        const xyParts = freeTiles[freeCellIndex].split(",");
        freeTiles.splice(freeCellIndex, 1);
        const x = parseInt(xyParts[0]);
        const y = parseInt(xyParts[1]);

        entity.setX(x);
        entity.setY(y);

        this._map[x][y].addEntity(entity);
        return true;
    }

    public putEntityInRandomFreeSpace(entity: Entity) {
        let freeTiles = this.getFreeTiles();
        if (freeTiles.length === 0) {
            return false;
        }

        const freeCellIndex = ROT.RNG.getUniformInt(0, freeTiles.length - 1);
        const xyParts = freeTiles[freeCellIndex].split(",");
        freeTiles.splice(freeCellIndex, 1);
        const x = parseInt(xyParts[0]);
        const y = parseInt(xyParts[1]);

        this._map[x][y].addEntity(entity);
        return true;
    }

    public removeEntity(entity: ActiveEntity) {
        for (let x = 0; x < this._map.length; x++) {
            for (let y = 0; y < this._map[x].length; y++) {
                this._map[x][y].removeEntity(entity);
            }
        }
    }
}

export default Map;