import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Sequelize from "sequelize";
import config from "../config/index.js";

// __filename et __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Fonction récursive pour charger les modèles
const loadModels = async (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await loadModels(fullPath); // Appel récursif
    } else if (
      file.endsWith(".js") &&
      file !== basename &&
      !file.startsWith(".")
    ) {
      const modelModule = await import(fullPath);
      const model = modelModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  }
};

// Lancer la lecture depuis le dossier courant
await loadModels(__dirname);

// Appliquer les associations
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
