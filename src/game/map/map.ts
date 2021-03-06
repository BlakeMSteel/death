import * as ROT from 'rot-js';
import ActiveEntity from '../entities/activeEntity';
import Tile from './tile';
import Wall from '../entities/environment/wall';
import Floor from '../entities/environment/floor'
import { MAP_HEIGHT, DISPLAY_WIDTH, MAP_TYPE, FONT_SIZE } from '../constants';
import Entity from '../entities/entity';
import Stairs from '../entities/environment/stairs';

class Map {
    private map: Array<Array<Tile>>;
    private display: ROT.Display;

    constructor() {
        this.map = this.create2DArrayOfTiles(DISPLAY_WIDTH, MAP_HEIGHT);
        this.display = new ROT.Display({
            width: DISPLAY_WIDTH,
            height: MAP_HEIGHT,
            fontSize: FONT_SIZE
        });
        this.generateMap(MAP_TYPE.DUNGEON_ROGUE);
    }

    private create2DArrayOfTiles(width: number, height: number) {
        let array = new Array<Array<Tile>>(width);
        
        for (let i = 0; i < width; i++) {
            array[i] = new Array<Tile>(height);
        }

        return array;
    }

    private generateMap( type: string = MAP_TYPE.ARENA ) {
        this.addDisplayToDOM();

        var mapper = null;
        switch(type) {
            case MAP_TYPE.ARENA:
                mapper = new ROT.Map.Arena(DISPLAY_WIDTH, MAP_HEIGHT);
                break;
            case MAP_TYPE.CELLULAR:
                mapper = new ROT.Map.Cellular(
                    DISPLAY_WIDTH,
                    MAP_HEIGHT, 
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
                    MAP_HEIGHT,
                    {
                        corridorLength: [2,5],
                        dugPercentage: 0.8,
                        roomHeight: [4, 8],
                        roomWidth: [4, 8],
                    }
                );
                break;
            case MAP_TYPE.DUNGEON_ROGUE:
                mapper = new ROT.Map.Rogue(DISPLAY_WIDTH, MAP_HEIGHT, {});
                break;
            case MAP_TYPE.DUNGEON_UNIFORM:
                mapper = new ROT.Map.Uniform(
                    DISPLAY_WIDTH,
                    MAP_HEIGHT,
                    {
                        roomDugPercentage: 0.9,
                        roomHeight: [4, 12],
                        roomWidth: [4, 12],
                    }
                );
                break;
            case MAP_TYPE.MAZE_DIVIDED:
                mapper = new ROT.Map.DividedMaze(DISPLAY_WIDTH, MAP_HEIGHT);
                break;
            case MAP_TYPE.MAZE_ELLER:
                mapper = new ROT.Map.EllerMaze(DISPLAY_WIDTH, MAP_HEIGHT);
                break;
            case MAP_TYPE.MAZE_ICEY:
                mapper = new ROT.Map.IceyMaze(DISPLAY_WIDTH, MAP_HEIGHT);
                break;
            default:
                mapper = new ROT.Map.Arena(DISPLAY_WIDTH, MAP_HEIGHT);
                break;
        }

        var mapperCallback = (x: number, y: number, value: number) => {
            //value = 1 -> wall
            //value = 0 -> empty space
            if (value) {
                this.map[x][y] = new Tile(new Wall());
            } else {
                this.map[x][y] = new Tile(new Floor());
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
        
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
                if (!this.map[x][y].isCollideable()) {
                    freeTiles.push(x + ',' + y);
                }
            }
        }

        return freeTiles;
    }

    public clearDisplay() {
        this.display.clear();
    }

    public doesSpaceContainStairs(x: number, y: number) {
        return this.map[x][y].doesTileContainEntity(new Stairs());
    }

    public drawFOVFromLocation(locationX: number, locationY: number, radius: number) {
        const lightPasses = (x: number, y: number) => {
            if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < MAP_HEIGHT) {
                if (!this.map[x][y].isImmoveable()) {
                    return true;
                }
            }
            return false;
        }

        const fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

        fov.compute(
            locationX,
            locationY,
            radius,
            (x: number, y: number, radius: number, visibility: number) => {
                this.drawTile(x, y);
            }
        );
    }

    public drawTile(x: number, y: number) {
        let entity = this.map[x][y].getDisplayedTile();
        if (!entity) {
            entity = new Floor();
        }
        this.display.draw(x, y, entity.getCharacter(), entity.getColor(), entity.getBackgroundColor());
    }

    public actUponSpaceByEnemy(x: number, y: number) {
        this.map[x][y].actUponByEnemy();
    }

    public actUponSpaceByPlayer(x: number, y: number) {
        this.map[x][y].actUponByPlayer();
    }

    public addDisplayToDOM() {
        let element = document.body.appendChild(this.display.getContainer()!);
        element.className = 'game-map';
    }

    public isSpaceCollideable(x: number, y: number) {
        return this.map[x][y].isCollideable();
    }

    public isSpaceOccupied(x: number, y: number) {
        return this.map[x][y].isImmoveable();
    }

    public moveEntity(entity: Entity, x: number, y: number) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j].doesTileContainEntity(entity)) {
                    this.map[i][j].removeEntity(entity);
                    this.map[x][y].addEntity(entity);
                    return;
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
        const xyParts = freeTiles[freeCellIndex].split(',');
        freeTiles.splice(freeCellIndex, 1);
        const x = parseInt(xyParts[0]);
        const y = parseInt(xyParts[1]);

        entity.setX(x);
        entity.setY(y);

        this.map[x][y].addEntity(entity);
        return true;
    }

    public putEntityInRandomFreeSpace(entity: Entity) {
        let freeTiles = this.getFreeTiles();
        if (freeTiles.length === 0) {
            return false;
        }

        const freeCellIndex = ROT.RNG.getUniformInt(0, freeTiles.length - 1);
        const xyParts = freeTiles[freeCellIndex].split(',');
        freeTiles.splice(freeCellIndex, 1);
        const x = parseInt(xyParts[0]);
        const y = parseInt(xyParts[1]);

        this.map[x][y].addEntity(entity);
        return true;
    }

    public removeDisplayFromDOM() {
        document.body.removeChild(document.body.getElementsByClassName('game-map')[0]);
    }

    public removeEntity(entity: ActiveEntity) {
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
                this.map[x][y].removeEntity(entity);
            }
        }
    }
}

export default Map;