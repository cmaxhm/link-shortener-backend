import { PaginationQueryParameters } from './pagination-query-parameters.interface';

export interface UserLinksPaginationQueryParameters extends Partial<PaginationQueryParameters> {
  user_id?: number;
}
