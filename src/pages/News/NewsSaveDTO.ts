import { INews, INewsSave } from "./INews";

const NewsSaveDTO = (news?: INews) => {
  return {
    id: news?.id,
    title: {
      tm: news?.title && (JSON.parse(news?.title)?.tm ?? ""),
      ru: news?.title && (JSON.parse(news?.title)?.ru ?? ""),
    },
    description: {
      tm: news?.description && (JSON.parse(news?.description)?.tm ?? ""),
      ru: news?.description && (JSON.parse(news?.description)?.ru ?? ""),
    },
    image: news?.image,
    image_url: news?.image_url,
  } as INewsSave;
};

export default NewsSaveDTO;
