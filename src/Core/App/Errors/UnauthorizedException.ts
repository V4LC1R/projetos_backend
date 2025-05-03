import { Exception } from "src/Core/Shared/Exceptions";

export class UnauthorizedException extends Exception {
    constructor(message?:string){
        super(message ?? "Unauthorized",401)
    }
}