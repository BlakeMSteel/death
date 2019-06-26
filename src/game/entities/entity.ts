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
    public id: number;
    public character: string;
    public color: string;
    public backgroundColor: string | null;
    public priority: number;
    public collideable: boolean;
    public active: boolean;

    constructor(props: IEntityProps) {
        this.id = props.id;
        this.priority = props.priority;
        this.character = props.character;
        this.color = props.color;
        this.collideable = props.collideable;
        this.backgroundColor = props.backgroundColor ? props.backgroundColor : null;
        this.active = props.active;
    }

    public equals(secondEntity: Entity) {
        return this.id === secondEntity.id
    }
}

export default Entity;