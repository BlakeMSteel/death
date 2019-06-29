export interface IEntityProps {
    id: number,
    priority: number,
    character: string,
    color: string,
    collideable: boolean,
    backgroundColor?: string | null,
    active: boolean
};

abstract class Entity {
    protected id: number;
    protected character: string;
    protected color: string;
    protected backgroundColor: string | null;
    protected priority: number;
    protected collideable: boolean;
    protected active: boolean;

    constructor(props: IEntityProps) {
        this.id = props.id;
        this.priority = props.priority;
        this.character = props.character;
        this.color = props.color;
        this.collideable = props.collideable;
        this.backgroundColor = props.backgroundColor ? props.backgroundColor : null;
        this.active = props.active;
    }

    public actUponByEnemy() {}

    public actUponByPlayer() {}

    public getBackgroundColor() {
        return this.backgroundColor;
    }
    
    public getCharacter() {
        return this.character;
    }

    public getCollideable() {
        return this.collideable;
    }

    public getColor() {
        return this.color;
    }

    public getPriority() {
        return this.priority;
    }

    public equals(secondEntity: Entity) {
        return this.id === secondEntity.id
    }
}

export default Entity;