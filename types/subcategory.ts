import { ICategory } from "./category";

export interface ISubcategory {
  id: number;
  name: string;
  slug: string;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
}
