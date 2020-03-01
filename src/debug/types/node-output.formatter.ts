export type NodeOutputFormatter = (
  name: string | number | symbol,
  type: string,
  value: string,
  recursionPath?: string,
) => string;
