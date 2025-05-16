import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "base64:Zd2lT412686";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "base64:Z62lT9629629";

export default (sequelize) => {
  const Leads = sequelize.define(
    "leads",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      car_type: {
        type: DataTypes.ENUM("new", "used"),
        defaultValue: "new",
      },
      financing_type: {
        type: DataTypes.ENUM("credit", "leasing", "cash"),
        defaultValue: "credit",
      },
      car_brand_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "car_brands",
          key: "id",
        },
      },
      car_model_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "car_models",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM(
          "new",
          "contacted",
          "qualified",
          "converted",
          "lost"
        ),
        defaultValue: "new",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING(2),
        allowNull: true,
        defaultValue: "fr",
      },
      email_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      email_sent_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      hooks: {
        // 1) Ensure an ID and a token exist BEFORE validation
        beforeValidate: (lead, options) => {
          // If no id, generate one (though defaultValue usually does this)
          if (!lead.id) {
            lead.id = uuidv4();
          }

          // If no token yet, generate JWT now
          if (!lead.token) {
            lead.token = jwt.sign(
              {
                id: lead.id,
                email: lead.email, // note: email may be undefined until after validation, so ensure email is set on create
              },
              SECRET,
              { expiresIn: "30d" }
            );
          }
        },
      },
    }
  );

  Leads.associate = (models) => {
    Leads.belongsTo(models.car_brands, {
      foreignKey: "car_brand_id",
      as: "brand",
    });

    Leads.belongsTo(models.car_models, {
      foreignKey: "car_model_id",
      as: "model",
    });
  };

  Leads.prototype.generateTokens = function () {
    const payload = { id: this.id, email: this.email };

    const accessToken = jwt.sign(payload, SECRET, {
      expiresIn: "7h",
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: "14d",
    });

    return { accessToken, refreshToken };
  };
  Leads.verifyToken = async function (token, dbInstance) {
    try {
      const decoded = jwt.verify(token, REFRESH_SECRET);

      const lead = await dbInstance.leads.findOne({
        where: { token },
      });

      if (!lead) {
        throw new Error("Token invalide ou inexistant.");
      }

      return decoded;
    } catch (err) {
      throw new Error("Token invalide ou expiré.");
    }
  };

  return Leads;
};
