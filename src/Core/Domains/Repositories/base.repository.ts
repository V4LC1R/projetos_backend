export interface IBaseRepository<T> {
    create(data: any): Promise<T>;
    update(id:number,data: any): Promise<T>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
}