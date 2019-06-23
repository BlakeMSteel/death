import ActiveEntity from './entities/activeEntity';
import Entity from './entities/entity';
import Map from './map/map';
import Player from './entities/player';
import * as ROT from 'rot-js';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from './constants';
import Zombie from './entities/zombie';
import Bat from './entities/bat';
import Stairs from './entities/stairs';

class Game {
    engine: ROT.Engine;
    entities: Array<ActiveEntity>;
    player: Player;
    map: Map;
    scheduler = new ROT.Scheduler.Simple();
    stairs?: Stairs;

    constructor() {
        this.map = new Map(DISPLAY_WIDTH, DISPLAY_HEIGHT);
        
        this.entities = new Array<ActiveEntity>();
        this.player = new Player(-1, -1, this);
        this.generatePlayer(this.player);
        this.generateActiveEntity(Zombie);
        this.generateActiveEntity(Bat);
        this.stairs = this.generateEntity(Stairs);

        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();
    }

    private generateActiveEntity(type: new (x: number, y: number, game: Game) => ActiveEntity) {
        const newEntity = new type(-1, -1, this);
        const placeable = this.map.putActiveEntityInRandomFreeSpace(newEntity);
        if (placeable) {
            this.entities.push(newEntity);
            this.scheduler.add(newEntity, true);
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
            this.player = player;
            this.scheduler.add(player, true);
        }
    }

    public removeEntity(entity: ActiveEntity) {
        this.map.removeEntity(entity);
        this.scheduler.remove(entity);
        var index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
    }
}

export default Game;

// var Game = {
//     display: null,

//     init: function() {
//         this.display = new ROT.Display({
//             width: displayWidth,
//             height: displayHeight,
//             fontSize: 15
//         });
//         document.body.appendChild(this.display.getContainer());
//         this._generateMap(mapType.DUNGEON_UNIFORM);
//         this.scheduler = new ROT.Scheduler.Simple();
//         if (this.player) {
//             this.scheduler.add(this.player, true);
//         }
//         for (var index in this.entities) {
//             this.scheduler.add(this.entities[index], true);
//         }
//         this.engine = new ROT.Engine(this.scheduler);
//         this.engine.start();
//     },
// }

// Game.map = {};
// Game.player = null;
// Game.entities = new Array();
// Game.scheduler = null;
// Game.engine = null;
// Game.ananas = null;

// Game._generateMap = function(type = mapType.ARENA) {
//     var mapper = null;
//     switch(type) {
//         case mapType.ARENA:
//             mapper = new ROT.Map.Arena(displayWidth, displayHeight);
//             break;
//         case mapType.CELLULAR:
//             mapper = new ROT.Map.Cellular(
//                 displayWidth,
//                 displayHeight, 
//                 { 
//                     connected: true, 
//                     born: [4, 5, 6, 7, 8],
//                     survive: [2, 3, 4, 5, 6],
//                 }
//             );
//             mapper.randomize(0.25);
//             break;
//         case mapType.DUNGEON_DIGGER:
//             mapper = new ROT.Map.Digger(
//                 displayWidth,
//                 displayHeight,
//                 {
//                     corridorLength: [2,5],
//                     dugPercentage: 0.8,
//                     roomHeight: [4, 8],
//                     roomWidth: [4, 8],
//                 }
//             );
//             break;
//         case mapType.DUNGEON_ROGUE:
//             mapper = new ROT.Map.Rogue(displayWidth, displayHeight);
//             break;
//         case mapType.DUNGEON_UNIFORM:
//             mapper = new ROT.Map.Uniform(
//                 displayWidth,
//                 displayHeight,
//                 {
//                     roomDugPercentage: 0.5,
//                     roomHeight: [4, 12],
//                     roomWidth: [4, 12],
//                 }
//             );
//             break;
//         case mapType.MAZE_DIVIDED:
//             mapper = new ROT.Map.DividedMaze(displayWidth, displayHeight);
//             break;
//         case mapType.MAZE_ELLER:
//             mapper = new ROT.Map.EllerMaze(displayWidth, displayHeight);
//             break;
//         case mapType.MAZE_ICEY:
//             mapper = new ROT.Map.IceyMaze(displayWidth, displayHeight);
//             break;
//         default:
//             mapper = new ROT.Map.Arena(displayWidth, displayHeight);
//             break;
//     }
//     var wallTiles = []
//     var freeCells = [];

//     var mapperCallback = function(x, y, value) {
//         //value = 1 -> wall
//         //value = 0 -> empty space
//         var key = x + "," + y;
//         if (value) {
//             wallTiles.push(key);
//             this.map[key] = new Tile(x, y, wallTile, wallColor, null, null, true, Game);
//         } else {
//             freeCells.push(key);
//             this.map[key] = new Tile(x, y, null, null, null, null, false, Game);
//         }
//     }

//     mapper.create(mapperCallback.bind(this));
//     if (type === mapType.CELLULAR) {
//         for (var i = 0; i < 40; i++) {
//             mapper.create();
//         }
//         mapper.create(mapperCallback.bind(this));
//         mapper.connect(this.display.DEBUG, 1);
//     }
//     this._generateBoxes(freeCells);

//     this._drawWholeMap();
//     this.player = this._createBeing(Player, freeCells);
//     this.entities.push(this._createBeing(Pirate, freeCells));
//     this.entities.push(this._createBeing(Pirate, freeCells));
//     this.entities.push(this._createBeing(Pirate, freeCells));
//     this.entities.push(this._createBeing(Pirate, freeCells));
// }

// Game._drawWholeMap = function() {
//     for (var key in this.map) {
//         this.map[key].draw();
//     }
// }

// Game._generateBoxes = function(freeCells) {
//     for (var i = 0; i < 10; i++) {
//         var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
//         var key = freeCells.splice(index, 1)[0];
//         this.map[key].setFloor(boxTile, boxColor);
//         if (i === 0) {
//             this.ananas = key;
//         }
//     }
// }

// Game._createBeing = function(what, freeCells) {
//     var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
//     var key = freeCells.splice(index, 1)[0];
//     var parts = key.split(",");
//     var x = parseInt(parts[0]);
//     var y = parseInt(parts[1]);
//     return new what(x, y, this);
// }

// Game.removeBeing = function(entity) {
//     this.scheduler.remove(entity);
//     var index = this.entities.indexOf(entity);
//     this.entities.splice(index, 1);
// }

// Game.init();