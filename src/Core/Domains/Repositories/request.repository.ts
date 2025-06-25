import { RequestModel } from "@domain/Models/request.model";
import { IBaseRepository } from "./base.repository";

export interface IRequestRepository extends IBaseRepository<RequestModel> {
    requestByAreaId(areaId,ownerId:number):Promise<RequestModel[]>
    myRequests(ownerId:number):Promise<RequestModel[]>
    requestMyAreas(ownerAreaId:number):Promise<RequestModel[]>
    aceptRequest(requestId:number):Promise<boolean>
    rejectRequest(requestId:number):Promise<boolean>
    toOwner(ownerId:number):Promise<RequestModel[]>
}