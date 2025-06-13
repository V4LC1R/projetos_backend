import { CategoryModel } from "@domain/Models/category.model";
import { Category } from "../Schemas/category.schema";

export class CategoryMapper {
  static toDomain(entity: Category): CategoryModel {
    return new CategoryModel(entity.id,entity.name)
  }

  static toORM(domain: CategoryModel): Category {
    const category = new Category();
    category.name = domain.name;
    category.id = domain.id
    return category;
  }

}