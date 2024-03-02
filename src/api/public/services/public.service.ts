import { Repository } from 'typeorm';
import { AppDataSource } from '../../v1/database';
import { Link } from '../../v1/models/link.model';

export class PublicService {
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
   * Find a link by its slug.
   *
   * @param slug The slug of the link.
   */
  public async findLinkBySlug(slug: string): Promise<Link | null> {
    return await this.repository.findOneBy({ slug });
  }
}
