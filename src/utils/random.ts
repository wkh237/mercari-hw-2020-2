export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export const shouldRenderWithChance = (chance: number) => {
  return Math.random() <= chance; //The maximum is exclusive and the minimum is inclusive
};