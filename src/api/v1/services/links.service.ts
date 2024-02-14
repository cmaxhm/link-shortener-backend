import { Model } from 'sequelize';
import { generateUrlSlug } from '../../../utilities/generate-url-slug.utility';
import { sequelize } from '../database/index.';
import { DeletedEntity } from '../interfaces/deleted-entity.interface';
import { UserLinksPaginationQueryParameters } from '../interfaces/user-links-pagination-query-parameters.interface';
import { Link } from '../models/link.model';
import { LinkSchema } from '../schemas/link.schema';

export class LinksService {
  async findAll(queryParams: Partial<UserLinksPaginationQueryParameters>): Promise<Link[]> {
    const options: Partial<UserLinksPaginationQueryParameters> = { where: {} };

    if (queryParams.user_id) { options.where!.user_id = queryParams.user_id; }

    if (queryParams.limit && queryParams.offset) {
      options.limit = queryParams.limit;
      options.offset = queryParams.offset;
    }

    return await sequelize.models.Link.findAll(options);
  }

  async findById(id: number): Promise<Link | null> {
    return await sequelize.models.Link.findByPk(id);
  }

  async create(link: typeof LinkSchema): Promise<Model<Link>> {
    const linkToCreate = {
      ...link,
      slug: generateUrlSlug()
    };

    return await sequelize.models.Link.create(linkToCreate);
  }

  async update(id: number, link: typeof LinkSchema): Promise<Link | undefined> {
    const linkResult = await this.findById(id);

    return await linkResult?.update(link);
  }

  async delete(id: number): Promise<DeletedEntity> {
    const linkResult = await this.findById(id);

    await linkResult?.destroy();

    return { id };
  }
}
