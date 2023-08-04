import { IPage, IPageSave } from "./IPage";

const PageSaveDTO = (page?: IPage) => {
  return {
    id: page?.id,
    title: {
      tm: page?.title && (JSON.parse(page?.title)?.tm ?? ""),
      ru: page?.title && (JSON.parse(page?.title)?.ru ?? ""),
    },
    text: {
      tm: page?.text && (JSON.parse(page?.text)?.tm ?? ""),
      ru: page?.text && (JSON.parse(page?.text)?.ru ?? ""),
    },
    image_url: page?.image_url,
    position: page?.position,
  } as IPageSave;
};

export default PageSaveDTO;
