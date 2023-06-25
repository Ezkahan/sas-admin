export type SelectOption = {
  label?: string;
  value: string | number;
};

export interface ISelectOptionsList {
  options: SelectOption[];
}
