import { EventModel, EventTypeEnum } from 'src/Core/Domains/Models/event.model';
import { UserModel } from 'src/Core/Domains/Models/user.model';
import { Repository } from 'typeorm';
import { Event } from '../Schemas/event.schema';
import { IEventRepository } from 'src/Core/Domains/Repositories/event.repository';
import { AreaModel } from 'src/Core/Domains/Models/area.model';

export class EventRepositoryTypeORM implements IEventRepository {
    constructor(
        private ormRepo:Repository<Event>
    ){}

    async create(data:{event:EventModel,owner:UserModel,area:AreaModel}):Promise<any>{
        const model = this.ormRepo.create({
            ...data.event,
            area:data.area,
            owner:data.owner,
        }); 

        const event =  await this.ormRepo.save(model);
        return new EventModel(event.name, event.type, event.id);
    }  
    
    async update(id:number,data:EventModel):Promise<EventModel>{
        await this.ormRepo.update({id},data);

        const event = await this.findById(id);
        if(!event) 
            throw new Error("User not found");

         return new EventModel(event.name, event.type, event.id);
    }

    async delete(id: number): Promise<boolean> {
        return false
    }

    async findById(id: number): Promise<EventModel | null> {
        const event = await this.ormRepo.findOne({where:{id}});
        if(!event)
            return null;

        const {name,type,id : event_id} = event;
        return new EventModel(name,type,event_id);
    }

    async findAll(): Promise<EventModel[]> {
        const events = await this.ormRepo.find();
        return events.map(event => new EventModel(event.name, event.type, event.id));
    }

    async eventsByAreaId(areaId: any, ownerId: any): Promise<EventModel[]> {
        const events = await this
            .ormRepo
            .find({
                where:{
                    area:{
                        id:areaId,
                        owner:{
                            id:ownerId
                        }
                    }
                }
            })

        return events
            .map((val)=> new EventModel(
                val.name,
                val.type,
                val.id
           )
        )
    }

    async eventsByOrganizerId(organizerId: number): Promise<EventModel[]> {
        const events = await this
            .ormRepo
            .find({
                where:{
                    area:{
                        owner:{id:organizerId}
                    }
                }
            })

        return events
            .map((val)=> new EventModel(
                val.name,
                val.type,
                val.id
           )
        )
    }

}