import { Sequelize } from 'sequelize';
import { LinkSchema } from '../schemas/link.schema';
import { UserSchema } from '../schemas/user.schema';
import { Link } from './link.model';
import { User } from './user.model';

export function setupModels(sequelize: Sequelize): void {
  User.init(UserSchema, User.configure(sequelize));
  Link.init(LinkSchema, Link.configure(sequelize));

  User.associate(sequelize);
}
