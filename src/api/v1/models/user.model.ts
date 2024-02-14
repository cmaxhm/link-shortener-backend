import { Model, Sequelize } from 'sequelize';

export class User extends Model {
  static readonly tableName = 'users';

  static associate(sequelize: Sequelize) {
    User.hasMany(sequelize.models.Link, { as: 'links', foreignKey: 'userId' });
  }

  static configure(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: 'User',
      tableName: User.tableName,
      timestamps: false
    };
  }
}
