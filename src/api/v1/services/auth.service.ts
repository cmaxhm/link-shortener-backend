import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import { JwtResponse } from '../interfaces/jwt-response.interface';
import { UserCredentials } from '../interfaces/user-credentials.interface';
import { User } from '../models/user.model';
import { comparePasswords } from '../utilities/compare-passwords.utility';
import { generateJwt } from '../utilities/generate-jwt.utility';

export class AuthService {
  /**
   * The user repository.
   *
   * @private
   */
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  /**
   * Login a user.
   *
   * @param userCredentials The user's credentials.
   */
  public async login(userCredentials: UserCredentials): Promise<JwtResponse | false> {
    const user: User | null = await this.repository.findOne({
      where: { username: userCredentials.username.trim() },
      select: ['id', 'username', 'email', 'password']
    });
    const isPasswordValid: boolean = user
      ? await comparePasswords(userCredentials.password.trim(), user.password!.trim())
      : false;

    if (!isPasswordValid) { return false; }

    return generateJwt({
      id: user?.id,
      username: user?.username,
      email: user?.email
    });
  }
}
