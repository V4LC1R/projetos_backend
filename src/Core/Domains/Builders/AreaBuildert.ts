import { AreaCreateInput } from "@app/Inputs/AreaCreateInput";
import { AddressModel } from "@domain/Models/address.model";
import { AreaModel } from "@domain/Models/area.model";
import { CategoryModel } from "@domain/Models/category.model";
import { OwnerModel } from "@domain/Models/owner.model";
import { ScheduleModel } from "@domain/Models/schedule.model";

export class AreaBuilder {
  name: string ;
  rent: number ;
  address: AddressModel;
  schedule: ScheduleModel[] = [];
  owner:OwnerModel
  categories:CategoryModel[]

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public setRent(rent: number): this {
    this.rent = rent;
    return this;
  }

  public setAddress(address: Partial<AddressModel>): this {
    this.address = new AddressModel(
        address.number_place ?? "",
        address.district ?? "",
        address.country ?? "",
        address.street ?? "",
        address.city ?? "",
        address.state ?? "",
        address.complement ?? "",
        address.latitude ?? "",
        address.longitude ?? "",
        address.areaId ?? 0,
    );

    if(address.id)
      this.address.setId(address.id)

    return this;
  }

  public getAddress(){
    return this.address
  }

  public setSchedule(schedule:Partial<ScheduleModel>[]): this {
    this.schedule = schedule.map(sch=> new ScheduleModel(
        sch.start_time ??new Date(),
        sch.end_time ??new Date(),
        sch.date??new Date()
    ));
    return this;
  }

  public setOwner(owner: Partial<OwnerModel>): this {
    this.owner = new OwnerModel(
        owner.name ?? '',
        owner.email ?? '',
        '',
        owner.id ?? 0
    );
    return this;
  }

  public setCategories(categories:number[]){
    if(categories.length > 0)
      this.categories = categories.map(e=> new CategoryModel(e,""))
    return this
  }

  public build(): AreaModel {
    
    return new AreaModel(this.name, this.rent,new Date(),new Date())
        .setAddress(this.address)
        .setOwner(this.owner.ownerId)
        .setSchedule(this.schedule)
        .setCategories(this.categories);
  }

  static fill(input:AreaCreateInput){
    return new AreaBuilder()
      .setName(input.name)
      .setRent(input.rent)
      .setAddress(input.address)
      .setSchedule(input.schedule)
  }
}