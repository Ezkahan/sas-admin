type TLangs = {
  tm: string;
  ru: string;
};

export const jsonParseToLangs = (text: string) => {
  var data: TLangs = JSON.parse(text);
  return data;
};
