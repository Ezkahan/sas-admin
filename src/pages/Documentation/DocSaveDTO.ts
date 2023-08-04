import { IDocumentation, IDocumentationSave } from "./IDocumentation";

const DocSaveDTO = (doc?: IDocumentation) => {
  return {
    id: doc?.id,
    title: {
      tm: doc?.title && (JSON.parse(doc?.title)?.tm ?? ""),
      ru: doc?.title && (JSON.parse(doc?.title)?.ru ?? ""),
    },
    text: {
      tm: doc?.text && (JSON.parse(doc?.text)?.tm ?? ""),
      ru: doc?.text && (JSON.parse(doc?.text)?.ru ?? ""),
    },
    preview: doc?.preview,
  } as IDocumentationSave;
};

export default DocSaveDTO;
