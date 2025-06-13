import { In, Repository } from 'typeorm';
import { IScheduleRepository } from '@domain/Repositories/schedule.repository';
import { Schedule } from '../Schemas/schedule.schema';
import { ScheduleModel } from '@domain/Models/schedule.model';
import { ScheduleMapper } from '../Mappers/ScheduleMapper';

export class ScheduleRepositoryTypeORM implements IScheduleRepository {
    constructor(
        private ormRepo:Repository<Schedule>
    ){}

    async create(data:ScheduleModel):Promise<ScheduleModel>{
        const model = ScheduleMapper.toORM(data); 
        const schedule =  await this.ormRepo.save(model);
        return ScheduleMapper.toDomain(schedule);
    }  

    async bulkInsert(schedulesData: ScheduleModel[]): Promise<ScheduleModel[]> {
        const models = schedulesData.map((data,i)=>{return ScheduleMapper.toORM(data)})
        const {generatedMaps} =  await this.ormRepo.insert(models);
        const ids = (generatedMaps as Schedule[]).map(v => v.id);
        const schedules = await this.ormRepo.findBy({id:In(ids)})
        return schedules.map((s:Schedule)=>ScheduleMapper.toDomain(s))
    }
    
    async update(id:number,data:ScheduleModel):Promise<ScheduleModel>{
        await this.ormRepo.update({id},ScheduleMapper.toORM(data));
        if(!data.id)
            throw new Error("User not found");

        const schedule = await this.findById(id);
        if(!schedule) 
            throw new Error("User not found");

        return schedule;
    }

    async delete(id: number): Promise<boolean> {
        return false
    }

    async findById(id: number): Promise<ScheduleModel | null> {
        const schedule = await this.ormRepo.findOne({where:{id}});
        if(!schedule)
            return null;

        return ScheduleMapper.toDomain(schedule);
    }

    async findAll(): Promise<ScheduleModel[]> {
        const schedules = await this.ormRepo.find();
        return schedules.map(s => ScheduleMapper.toDomain(s));
    }

}