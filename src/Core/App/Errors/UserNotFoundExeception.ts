import { Exception } from "src/Core/Shared/Exceptions";

export class UserNotFoundException extends Exception {
    constructor(){
        super("User Not Found!",401)
    }
}