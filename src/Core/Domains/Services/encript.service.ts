export interface IEncriptService {
    encript(password: string): Promise<string>;
    compare(plain: string, encrypted: string): Promise<boolean>;
}