export class AreaCreateInput {
    name: string;
    rent: number;
    owner_id: number;

    constructor(name: string, rent: number, owner_id: number) {
        this.name = name;
        this.rent = rent;
        this.owner_id = owner_id;
    }
}