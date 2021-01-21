import Message from './message';
import * as ROT from 'rot-js';
import { GENERIC_COLOR, DISPLAY_WIDTH, CONSOLE_HEIGHT } from '../constants';

class Logger {
    private messages = new Array<Message>();
    private display: ROT.Display;
    constructor() {
        this.display = new ROT.Display({
            width: DISPLAY_WIDTH,
            height: CONSOLE_HEIGHT,
            fontSize: 15
        })
        this.addDisplayToDOM();
        this.logMessage('The doors slam behind you. As the darkness overwhelms you, you light your lantern.');
    }

    private addDisplayToDOM() {
        let element = document.body.appendChild(this.display.getContainer()!);
        element.className = 'logger';
    }

    private drawMessages() {
        this.display.clear();
        for (let i = 0; i < this.messages.length; i++) {
            this.display.drawText(1, i + 1, this.messages[i].getFormattedText());
        }
    }

    public logMessage(text: string, color: string = GENERIC_COLOR) {
        if (this.messages.length >= CONSOLE_HEIGHT - 2) {
            this.messages.shift();
        }
        this.messages.push(new Message(text, color));
        this.drawMessages();
    }
}

export default Logger;