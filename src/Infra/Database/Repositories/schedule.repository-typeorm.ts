import { In, IsNull, Repository } from 'typeorm';
import { IScheduleRepository } from '@domain/Repositories/schedule.repository';
import { Schedule } from '../Schemas/schedule.schema';
import { AvailabilityStatus, ScheduleModel } from '@domain/Models/schedule.model';
import { ScheduleMapper } from '../Mappers/ScheduleMapper';
import { ActiveStatusEnum } from '@shared/Visibility';

export class ScheduleRepositoryTypeORM implements IScheduleRepository {
    constructor(
        private ormRepo:Repository<Schedule>
    ){}

    async create(data:ScheduleModel):Promise<ScheduleModel>{
        const model = ScheduleMapper.toORM(data); 
        const schedule =  await this.ormRepo.save(model);
        return ScheduleMapper.toDomain(schedule);
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
        const {affected} = await this.ormRepo.update(id,{active:ActiveStatusEnum.INACTIVE});
        return affected ? affected > 0 : false;
    }

    async findById(id: number): Promise<ScheduleModel | null> {
        const schedule = await this.ormRepo.findOne({where:{id,active:ActiveStatusEnum.ACTIVE}});
        if(!schedule)
            return null;

        return ScheduleMapper.toDomain(schedule);
    }

    async findAll(): Promise<ScheduleModel[]> {
        const schedules = await this.ormRepo.find();
        return schedules.map(s => ScheduleMapper.toDomain(s));
    }

    async bulkInsert(schedulesData: ScheduleModel[]): Promise<ScheduleModel[]> {
        const models = schedulesData.map((data,i)=>{return ScheduleMapper.toORM(data)})
        const {generatedMaps} =  await this.ormRepo.insert(models);
        const ids = (generatedMaps as Schedule[]).map(v => v.id);
        const schedules = await this.ormRepo.findBy({id:In(ids)})
        return schedules.map((s:Schedule)=>ScheduleMapper.toDomain(s))
    }

    async addSchedulesInEvent(eventId:number,schedules: number[]): Promise<ScheduleModel[]> {
        await this.ormRepo.update(
            {id:In(schedules)},
            {
                event:{id:eventId},
                status:AvailabilityStatus.RESERVED,
                active:ActiveStatusEnum.ACTIVE
            }
        );
        const schedulesUpdated = await this.ormRepo.findBy({id:In(schedules),active:ActiveStatusEnum.ACTIVE})
        return schedulesUpdated.map((s:Schedule)=>ScheduleMapper.toDomain(s))
    }

    async isValidSchedule( schedules: number[]): Promise<boolean> {
        const validate = await this.ormRepo.count(
            {
                where:{
                    id:In(schedules),
                    active:ActiveStatusEnum.ACTIVE,
                    event:{id:IsNull()}
                }
            }
        )
            

        return validate <= 0
    }

    async releaseSchedulesByEvent(eventId: number): Promise<boolean> {
        const { affected } = await this.ormRepo.update(
          { event: { id: eventId } }, // WHERE
          { event: null as any}             // SET
        );
        return affected ? affected > 0 : false;
      }
        
}