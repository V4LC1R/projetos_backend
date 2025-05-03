import { Exception } from "src/Core/Shared/Exceptions";

export class UserAlredyExistsExeception extends Exception {
    constructor(){
        super("User Alredy Exists!",400)
    }
}