import * as d from 'dotenv'

d.config()

export class ENV{
    //Carregar variáveis de ambiente não listadas (//ENV.load<string>('JWT_SECRET',''secret''))
    static load<T>(params:string, dft:T):T | null{
        return process.env[params] as T ?? dft;
    }
}