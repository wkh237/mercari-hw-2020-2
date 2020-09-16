// declare global {
  interface String {
    score(compareTo: string, fuzzy: number): number;
  }
// }

declare module '*.svg' {
  const content: any;
  export default content;
}
