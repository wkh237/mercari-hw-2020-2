export const numericTextCompress = (str: string) => {
  str = str.replace(/００００/g, '万');
  str = str.replace(/０００/g, '千');
  str = str.replace(/００/g, '百');
  str = str.replace(/１０/g, '十');
  str = str.replace(/0000/g, '万');
  str = str.replace(/000/g, '千');
  str = str.replace(/00/g, '百');
  str = str.replace(/10/g, '十');
  str = str.replace(/[１1]/g, 'ㄧ');
  str = str.replace(/[2２]/g, '二');
  str = str.replace(/[3３]/g, '三');
  str = str.replace(/[4４]/g, '四');
  str = str.replace(/[5５]/g, '五');
  str = str.replace(/[6６]/g, '六');
  str = str.replace(/[7７]/g, '七');
  str = str.replace(/[8８]/g, '八');
  str = str.replace(/[9９]/g, '九');
  return str;
};

export const getNumberPart = (str: string) => {
  return str.match(/[一二三四五六七八九十百千萬万億零0123456789１２３４５６７８９０]+/)?.[0] || '';
};

export const isNumber = (str: string): boolean => {
  return /[一二三四五六七八九十百千萬万億零0123456789１２３４５６７８９０]+/.test(str);
};
