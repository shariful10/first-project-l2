export type IErrorSources = {
  path: string | number;
  message: string;
}[];

export type IGenericErrorRespnse = {
  statusCode: number;
  message: string;
  errorSources: IErrorSources;
};
