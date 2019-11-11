//Display
export const FONT_SIZE = 15;
export const DISPLAY_WIDTH = 100;
export const MAP_HEIGHT = 40;
export const CONSOLE_HEIGHT = 7;

//Console
export const GENERIC_COLOR = '#FFFFFF';
export const DANGER_COLOR = '#FF0000';
export const ENTRANCE_TEXT = [
    'The doors slam behind you. As the darkness surrounds you, you light your lantern.',
    'The stench of rotting bodies overwhelms you, but you push on, entering the mansion.',
    'Summoning courage from within the depths of your heart, you walk into the mansion.',
    'You hear low growls from within. Steeling yourself, you open the doors.',
    'Sweat moistens your skin. You wipe it from your brow, stepping through the doors.',
    'The coppery air rests on your tongue. You hoist your sword and move forward.'
]

//Entities
export const PLAYER = {
    ID: -1,
    CHAR: '@',
    COLOR: '#00FF00',
    PRIORITY: 100,
    VISION_RADIUS: 12
}

//Enemies
export const ENEMY_TYPE_COUNT = 3;
export const BAT = {
    CHAR: 'b',
    COLOR: '#0066ff',
    PRIORITY: 41,
    DEATH_TEXT: [
        'You skewer the bat on your sword, taking only a moment to push it off before continuing.',
        'You swat the bat out of the air with your shield, your boot coming down on it before it can fly again.',
        'You snatch the bat out of the air and throw it at the ground. It lands with a sickening crunch.'
    ],
    PLAYER_DEATH_TEXT: [
        'The bat gouges out your eyes. You stumble blindly and eventully into your death.',
        'The last of your blood is drained by the bat.'
    ],
    SENSE_RADIUS: 10
}
export const ZOMBIE = {
    CHAR: 'z',
    COLOR: '#CC00FF',
    PRIORITY: 40,
    DEATH_TEXT: [
        'You sink your sword through the chest of the zombie and finish it off with a shield to the head.',
        'You sever the zombie\'s limbs one at a time before leaving it to struggle helplessly.',
        'You slash through the zombie\'s neck, its head slowly falling off, body closely following.'
    ],
    PLAYER_DEATH_TEXT: [
        'The zombie pushes past your shield and abruptly removes your jugular.',
        'You are pushed down. The zombie raises its fists and slams them down on your chest.'
    ],
    SENSE_RADIUS: 15
}
export const GHOST = {
    CHAR: 'g',
    COLOR: '#ADD8E6',
    PRIORITY: 42,
    DEATH_TEXT: [
        'Your sword slashes through the ghost, and it dissapates, realizing its state of being.',
        'You raise your shield and press forward. The ghost dissolves on your magical shield.',
        'You have a friendly conversation with the ghost and it decides to leave you be.'
    ],
    PLAYER_DEATH_TEXT: [
        'The ghost pushes its hand through your chest and grips your heart. Everything goes black.',
        'You gasp as the incorporeal form of the ghost possesses you. It flexes your fingers.'
    ],
    SENSE_RADIUS: 15
}

//Environment
export const BOX = {
    CHAR: '*',
    COLOR: '#FFFF00',
    PRIORITY: 1
}
export const FLOOR = {
    CHAR: '.',
    COLOR: '#808080',
    PRIORITY: -1
}
export const TORCH = {
    CHAR: '^',
    UNLIT_COLOR: '#BFBFBF',
    LIT_COLOR: '#FF9900',
    PRIORITY: 4,
    VISION_RADIUS: 4
}
export const STAIRS = {
    ID: -2,
    CHAR: '<',
    COLOR: 'orange',
    PRIORITY: 10
}
export const WALL = {
    CHAR: '#',
    COLOR: '#FFFFFF',
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