import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Banner extends Model {
  public id!: number;
  public photo!: string;
  public category!: string;
}

Banner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Banner',
    tableName: 'banners',
    timestamps: false,
  }
);

export default Banner;
