export type EasyJsxNode =
  | [string, { [key: string]: any }, ...EasyJsxNode[]]
  | string;

declare function jsxToObj(input: string): EasyJsxNode[];

export default jsxToObj;
