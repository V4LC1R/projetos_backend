export interface IBaseRepository<T> {
    create(data: any): Promise<any>;
    update(data: any): Promise<any>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<any | null>;
    findAll(): Promise<any[]>;
}