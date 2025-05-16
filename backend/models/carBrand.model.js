import { DataTypes } from "sequelize";

export default (sequelize) => {
  const CarBrand = sequelize.define("car_brands", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  CarBrand.associate = (models) => {
    CarBrand.hasMany(models.car_models, {
      foreignKey: "car_brand_id",
      as: "models",
      onDelete: "CASCADE",
    });
  };

  return CarBrand;
};
