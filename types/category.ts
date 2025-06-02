export interface ICategory {
  id: number;
  name: string;
  slug: string;
  // subCategories: SubCategory[];
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
