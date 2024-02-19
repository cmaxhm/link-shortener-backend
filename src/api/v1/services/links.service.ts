import { FindManyOptions, Repository } from 'typeorm';
import { UserLinksPaginationQueryParameters } from '../interfaces/user-links-pagination-query-parameters.interface';
import { generateUrlSlug } from '../utilities/generate-url-slug.utility';
import { AppDataSource } from '../database';
import { Link } from '../models/link.model';
import { User } from '../models/user.model';

export class LinksService {
  /**
   * The repository for the Link model.
   *
   * @private
   */
  private repository: Repository<Link>;

  constructor() {
    this.repository = AppDataSource.getRepository(Link);
  }

  /**
   * Find all links.
   *
   * @param queryParams The query parameters for the request.
   */
  public async findAll(queryParams: UserLinksPaginationQueryParameters): Promise<Link[]> {
    const { user_id, offset, limit } = queryParams;
    const options: FindManyOptions<Link> = {
      relations: ['user'],
      select: [
        'id',
        'slug',
        'url',
        'created_at',
        'updated_at',
        'user.id',
        'user.username',
        'user.email',
        'user.created_at',
        'user.updated_at'
      ] as (keyof Link)[]
    };

    if (user_id) { options.where = { user_id }; }
    if (offset && limit) { options.skip = offset; options.take = limit; }

    return await this.repository.find(options);
  }

  /**
   * Find a link by its id.
   *
   * @param id The ID of the link.
   */
  public async findById(id: number): Promise<Link | null> {
    return await this.repository.findOne({
      where: { id },
      select: [
        'id',
        'slug',
        'url',
        'created_at',
        'updated_at',
        'user.id',
        'user.username',
        'user.email',
        'user.created_at',
        'user.updated_at'
      ] as (keyof Link)[]
    });
  }

  /**
   * Find a link by its slug.
   *
   * @param link The userId and url of the link.
   */
  public async create(link: { userId: number, url: string }): Promise<Link> {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: link.userId });
    const linkResult = new Link();

    linkResult.user_id = user?.id;
    linkResult.url = link.url;
    linkResult.slug = generateUrlSlug();

    return await this.repository.save(linkResult);
  }

  /**
   * Update a link by its ID.
   *
   * @param id The ID of the link.
   * @param link The link object to replace for.
   */
  public async update(id: number, link: Link): Promise<Link> {
    let linkResult = await this.findById(id);

    linkResult = { ...linkResult, ...link };

    return await this.repository.save(linkResult);
  }

  /**
   * Delete a link by its ID.
   *
   * @param id The ID of the link.
   */
  public async delete(id: number): Promise<Link[]> {
    const linkResult = await this.findById(id);

    return await this.repository.remove([linkResult!]);
  }
}
