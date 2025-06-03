import { ISubcategory } from "./subcategory";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  subCategories: ISubcategory[];
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}
