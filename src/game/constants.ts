//Display
export const DISPLAY_WIDTH = 100;
export const DISPLAY_HEIGHT = 40;

//Entities
export const PLAYER = {
    ID: -1,
    CHAR: "@",
    COLOR: "#00FF00",
    PRIORITY: 100,
    VISION_RADIUS: 12
}

//Enemies
export const ENEMY_TYPE_COUNT = 2;
export const BAT = {
    CHAR: "b",
    COLOR: "blue",
    PRIORITY: 41
}
export const ZOMBIE = {
    CHAR: "z",
    COLOR: "#CC00FF",
    PRIORITY: 40
}

//Environment
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
export const TORCH = {
    CHAR: "^",
    UNLIT_COLOR: "#BFBFBF",
    LIT_COLOR: "#FF9900",
    PRIORITY: 4,
    VISION_RADIUS: 4
}
export const STAIRS = {
    ID: -2,
    CHAR: "<",
    COLOR: "orange",
    PRIORITY: 10
}
export const WALL = {
    CHAR: "#",
    COLOR: "#FFFFFF",
    PRIORITY: 0
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
export const MOVEMENT_KEYCODES: { [keyCode: number]: number } = {
    38: 0,
    56: 0,
    33: 1,
    57: 1,
    39: 2,
    54: 2,
    34: 3,
    51: 3,
    40: 4,
    50: 4,
    35: 5,
    49: 5,
    37: 6,
    52: 6,
    36: 7,
    55: 7
}
export const COMMA = 188;