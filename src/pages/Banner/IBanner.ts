export interface IBannerList {
  id: number;
  image_url: string;
  image: File;
  link?: string;
  type: string;
  category_id: number;
  position: string;
  visited_count: number;
}

export type BannerType = Omit<IBannerList, "visited_count">;
