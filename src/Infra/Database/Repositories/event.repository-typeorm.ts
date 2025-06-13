import { EventModel } from 'src/Core/Domains/Models/event.model';
import { Repository } from 'typeorm';
import { Event } from '../Schemas/event.schema';
import { IEventRepository } from 'src/Core/Domains/Repositories/event.repository';
import { EventMapper } from '../Mappers/EventMapper';
import { ActiveStatusEnum } from '@shared/Visibility';

export class EventRepositoryTypeORM implements IEventRepository {
    constructor(
        private ormRepo:Repository<Event>
    ){}

    async create(data:EventModel):Promise<any>{
        const model = EventMapper.toORM(data)

        const event =  await this.ormRepo.save(model);
        return EventMapper.toDomain(event);
    }  
    
    async update(id:number,data:EventModel):Promise<EventModel>{
        await this.ormRepo.update({id},EventMapper.toORM(data));

        const event = await this.findById(id);
        if(!event) 
            throw new Error("User not found");

         return event
    }

    async delete(id: number): Promise<boolean> {
        return !await this.ormRepo.update(id,{active:ActiveStatusEnum.INACTIVE});
    }

    async findById(id: number): Promise<EventModel | null> {
        const event = await this.ormRepo.findOne({where:{id,active:ActiveStatusEnum.ACTIVE}});
        if(!event)
            return null;

        return EventMapper.toDomain(event);
    }

    async findAll(): Promise<EventModel[]> {
        const events = await this.ormRepo.find();
        return events.map(event => EventMapper.toDomain(event));
    }

    

    async isGuestofEvent(guestId:number):Promise<boolean>{
        return await this.ormRepo.exists({where:{owner:{id:guestId}}})
    }

    async isOwnerOfAreaEvent(ownerId:number):Promise<boolean>{
        return await this.ormRepo.exists(
            {
                where:{
                    area:{
                        owner:{id:ownerId}
                    }
                }
            }
        )
    }

    async eventsByAreaId(areaId: any, ownerId: any): Promise<EventModel[]> {
        console.log(areaId,ownerId)
        const events = await this
            .ormRepo
            .find({
                relations:{schedules:true},
                where:{
                    
                    area:{
                        id:areaId,
                        active:ActiveStatusEnum.ACTIVE,
                        owner:{
                            id:ownerId,
                            active:ActiveStatusEnum.ACTIVE
                        }
                    },
                    active:ActiveStatusEnum.ACTIVE
                }
            })

        console.log(events)
            
        return events
            .map((event)=>EventMapper.toDomain(event)
        )
    }

    async eventsByOrganizerId(organizerId: number): Promise<EventModel[]> {
        const events = await this
            .ormRepo
            .find({
                relations:{schedules:true},
                where:{
                    owner:{id:organizerId,active:ActiveStatusEnum.ACTIVE},
                    active:ActiveStatusEnum.ACTIVE
                }
            })

        return events
            .map((event)=> EventMapper.toDomain(event)
        )
    }

}