import { Repository } from 'typeorm';
import { ActiveStatusEnum } from '@shared/Visibility';
import { IRequestRepository } from '@domain/Repositories/request.repository';
import { RequestModel, StatusRequestEnum } from '@domain/Models/request.model';
import { Request } from '../Schemas/request.schema';
import { RequestMapper } from '../Mappers/RequestMapper';

export class RequestRepositoryTypeORM implements IRequestRepository {
    constructor(
        private ormRepo:Repository<Request>
    ){}

    async create(data:RequestModel):Promise<RequestModel>{
        const model = RequestMapper.toORM(data)

        const request =  await this.ormRepo.save(model);
        return RequestMapper.toDomain(request);
    }  
    
    async update(id:number,data:RequestModel):Promise<RequestModel>{
        await this.ormRepo.update({id},RequestMapper.toORM(data));

        const request = await this.findById(id);
        if(!request) 
            throw new Error("User not found");

         return request
    }

    async delete(id: number): Promise<boolean> {
        const {affected} = await this.ormRepo.update(id,{active:ActiveStatusEnum.INACTIVE});
        return affected ? affected > 0 : false;
    }

    async findById(id: number): Promise<RequestModel | null> {
        const request = await this.ormRepo.findOne(
            {
                relations:{schedules:true,owner:true,area:true},
                where:{id,active:ActiveStatusEnum.ACTIVE}
            }
        );
        if(!request)
            return null;

        return RequestMapper.toDomain(request);
    }

    async findAll(): Promise<RequestModel[]> {
        const requests = await this.ormRepo.find();
        return requests.map(request => RequestMapper.toDomain(request));
    }

    async requestMyAreas(ownerAreaId: number): Promise<RequestModel[]> {
        const requests = await this.ormRepo.find({
            relations:{
                schedules:true,
                owner:true,
                area:{categories:true}
            },
            where:{
                area:{
                    owner:{id:ownerAreaId}
                }
            }
        })

        return requests.map(request => RequestMapper.toDomain(request));
    }

    async requestByAreaId(areaId: any, ownerId: number): Promise<RequestModel[]> {
        const requests = await this.ormRepo.find({
            relations:{
                schedules:true,
                owner:true,
                area:true
            },
            where:{
                area:{
                    id:areaId,
                    owner:{id:ownerId}
                }
            }
        })

        return requests.map(request => RequestMapper.toDomain(request));
    }

    async myRequests(ownerId: number): Promise<RequestModel[]> {
         const requests = await this.ormRepo.find({
            relations:{
                owner:true,
                schedules:true,
                area:{schedule:false,categories:true},
            },
            where:{
               owner:{id:ownerId}
            }
        })

        return requests.map(request => RequestMapper.toDomain(request));
    }

    async toOwner(ownerId: number): Promise<RequestModel[]> {
        const requests = await this.ormRepo.find({
            relations:{
                schedules:true,
                owner:true,
                area:true
            },
            where:{
                area:{
                    owner:{id:ownerId}
                }
            }
        })

        return requests.map(request => RequestMapper.toDomain(request));
    }

    async aceptRequest(requestId: number): Promise<boolean> {
        const {affected} = await this.ormRepo.update(requestId,{status:StatusRequestEnum.ACEPT})

        return affected ? affected > 0 :false
    }

    async rejectRequest(requestId: number): Promise<boolean> {
        const {affected} = await this.ormRepo.update(requestId,{status:StatusRequestEnum.REJECT})
        console.log(requestId,affected)
        return affected ? affected > 0 :false
    }

}