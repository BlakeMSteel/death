import { DISPLAY_WIDTH, GENERIC_COLOR } from '../constants';

class Message {
    color: string;
    text: string;
    constructor(text: string, color: string = GENERIC_COLOR) {
        this.text = text;
        this.color = color;
        this.trimTextToMaxCharacters();
    }

    public getFormattedText() {
        return '%c{' + this.color + '}' + this.text + '%c{}';
    }

    private trimTextToMaxCharacters() {
        if (this.text.length > DISPLAY_WIDTH) {
            this.text = this.text.substring(0, DISPLAY_WIDTH);
        }
    }
}

export default Message;