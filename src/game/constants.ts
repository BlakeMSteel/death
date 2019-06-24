//Display
export const DISPLAY_WIDTH = 100;
export const DISPLAY_HEIGHT = 40;

//Entities
export const BAT = {
    CHAR: "b",
    COLOR: "blue",
    PRIORITY: 41
}
export const BOX = {
    CHAR: "*",
    COLOR: "#FFFF00",
    PRIORITY: 1
}
export const FLOOR = {
    CHAR: ".",
    COLOR: "#808080",
    PRIORITY: -1
}
export const PLAYER = {
    ID: -1,
    CHAR: "@",
    COLOR: "#00FF00",
    PRIORITY: 100,
    VISION_RADIUS: 12
}
export const STAIRS = {
    ID: -2,
    CHAR: "<",
    COLOR: "orange",
    PRIORITY: 2
}
export const WALL = {
    CHAR: "#",
    COLOR: "#FFFFFF",
    PRIORITY: 0
}
export const ZOMBIE = {
    CHAR: "z",
    COLOR: "#CC00FF",
    PRIORITY: 40
}

//Map Types
export const MAP_TYPE = {
    ARENA: 'arena',
    CELLULAR: 'cellular',
    DUNGEON_DIGGER: 'digger',
    DUNGEON_ROGUE: 'rogue',
    DUNGEON_UNIFORM: 'uniform',
    MAZE_DIVIDED: 'divided_maze',
    MAZE_ELLER: 'eller_maze',
    MAZE_ICEY: 'icey_maze',
}

//RNG
export const ID_UPPER_BOUND = 999999;

//KeyCodes
export const COMMA = 188;