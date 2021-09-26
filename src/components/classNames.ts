type classNamesConfig = {
  [key in string]: boolean | undefined;
};

export const cx = (obj: classNamesConfig): string | undefined =>
  Object.entries(obj)
    .reduce((a, [key, val]) => (val ? `${a} ${key}` : a), '')
    .trim() || undefined;

// const cx = (arr: Array<string | boolean | undefined>): string =>
//   arr.filter(v => !!v).join(' ');
