import { Query } from "./graphql";

export type GraphQLResponse<T> = {
  data: T
};

export type ExecuteQueryFunction =  (query: string, vars: { [key: string]: any }, callback: (res: GraphQLResponse<Query>) => void) => void;

export type GraphQLExports = {
  executeQuery: ExecuteQueryFunction
};

export type Exports = {
  ["mm-graphql"]: GraphQLExports
  (name: string, fn: ExecuteQueryFunction): void;
};