export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    update(data: T): Promise<T>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
}