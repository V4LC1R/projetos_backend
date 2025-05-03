import { HttpException, HttpStatus } from "@nestjs/common";

export class HTTPErrorFactory{
    static UNAUTHORIZED(message:string,err:any){
        return new HttpException(
            {
                status:HttpStatus.UNAUTHORIZED,
                message:message
            },
            HttpStatus.UNAUTHORIZED,
            {cause:err}
        )
    }

    static INTERNAL_SERVER_ERROR(message:string,err:any){
        return new HttpException(
            {
                status:HttpStatus.INTERNAL_SERVER_ERROR,
                message
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause:err }
        )
    }
}