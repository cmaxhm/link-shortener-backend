import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import { UserData } from '../interfaces/user-data.interface';
import { User } from '../models/user.model';
import { hashPassword } from '../utilities/hash-password.utility';

export class UsersService {
  /**
   * The repository for the User model.
   *
   * @private
   */
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  /**
   * Finds all users in the database.
   */
  public async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  /**
   * Finds a user by their ID.
   *
   * @param id The ID of the user to find.
   */
  public async findById(id: number): Promise<User | null> {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.links', 'links')
      .select([
        'user.id',
        'user.username',
        'user.email',
        'user.created_at',
        'user.updated_at',
        'links.id',
        'links.slug',
        'links.url',
        'links.created_at',
        'links.updated_at'
      ])
      .where('user.id = :id', { id })
      .getOne();
  }

  /**
   * Saves a new user to the database.
   *
   * @param user The user to save.
   */
  public async create(user: User): Promise<User> {
    user.password = await hashPassword(user.password!);

    return await this.repository.save(user);
  }

  /**
   * Updates a user in the database.
   *
   * @param id The ID of the user to update.
   * @param user The user data to update.
   */
  public async update(id: number, user: User): Promise<Partial<UserData>> {
    let userResult = await this.findById(id);
    let editedUser: Partial<UserData> = {};

    userResult = {
      ...userResult,
      ...user,
      password: await hashPassword(user.password!)
    };

    await this.repository
      .save(userResult)
      .then((user: User) => {
        editedUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at
        };
      });

    return editedUser;
  }

  /**
   * Deletes a user from the database.
   *
   * @param id The ID of the user to delete.
   */
  public async delete(id: number): Promise<User[]> {
    const userResult = await this.findById(id);

    return await this.repository.remove([userResult!]);
  }
}
