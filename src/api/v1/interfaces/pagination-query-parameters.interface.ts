export interface PaginationQueryParameters {
  where: { [key: string]: any };
  limit: number;
  offset: number;
}
