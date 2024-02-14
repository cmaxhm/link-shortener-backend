import { Model, Sequelize } from 'sequelize';

export class Link extends Model {
  static readonly tableName = 'links';

  static configure(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: 'Link',
      tableName: Link.tableName,
      timestamps: false
    };
  }
}
