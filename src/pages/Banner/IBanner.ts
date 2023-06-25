export interface IBannerList {
  id?: number;
  image: string;
  cropped_image: string;
  link?: string;
  category_id: number;
  position: string;
  visited_count: number;
}

export type BannerType = Omit<IBannerList, "visited_count">;
