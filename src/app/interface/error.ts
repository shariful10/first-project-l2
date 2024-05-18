export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorRespnse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
