import db from "./models";

export default (async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();
