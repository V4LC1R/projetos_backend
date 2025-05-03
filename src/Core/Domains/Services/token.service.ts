export interface ITokenService {
    generate<T extends Object|String>(dataToken:T): Promise<string>;
    decode<T>(token:string):Promise<T>
}