import { Exception } from "src/Core/Shared/Exceptions";

export class WrongOwnerActionExeception extends Exception {
    constructor(message?:string){
        super(message ?? "This user hasn't permission!",400)
    }
}