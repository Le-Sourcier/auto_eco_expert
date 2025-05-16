import { DataTypes } from "sequelize";

export default (sequelize) => {
  const CarModel = sequelize.define("car_models", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_brand_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "car_brands",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM(
        "sedan",
        "suv",
        "coupe",
        "hatchback",
        "wagon",
        "convertible",
        "truck",
        "van",
        "pickup",
        "minivan",
        "roadster",
        "suv_coupe",
        "suv_wagon",
        "suv_minivan",
        "suv_pickup",
        "suv_roadster",
        "suv_coupe_wagon",
        "suv_coupe_minivan",
        "other"
      ),
      allowNull: true,
    },
    average_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    depreciation_rate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
  CarModel.associate = (models) => {
    CarModel.belongsTo(models.car_brands, {
      foreignKey: "car_brand_id",
      as: "brand",
      onDelete: "CASCADE",
    });
  };

  return CarModel;
};
