import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface IDocumentation {
  id: number;
  title: string;
  text: string;
  preview?: number;
}

export interface IDocumentationSave {
  id?: number;
  title?: ITranslatable;
  text?: ITranslatable;
  preview?: number;
}
