import { Model } from 'sequelize';
import { sequelize } from '../database/index.';
import { DeletedEntity } from '../interfaces/deleted-entity.interface';
import { User } from '../models/user.model';
import { UserSchema } from '../schemas/user.schema';

export class UsersService {
  async findAll(): Promise<User[]> {
    return await sequelize.models.User.findAll({
      attributes: { exclude: ['password'] }
    });
  }

  async findById(id: number): Promise<User | null> {
    return await sequelize.models.User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  }

  async create(user: typeof UserSchema): Promise<Model<User>> {
    return await sequelize.models.User.create(user);
  }

  async update(id: number, user: typeof UserSchema): Promise<User | undefined> {
    const userResult = await this.findById(id);

    return await userResult?.update(user);
  }

  async delete(id: number): Promise<DeletedEntity> {
    const userResult = await this.findById(id);

    await userResult?.destroy();

    return { id };
  }
}
