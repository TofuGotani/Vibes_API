import { app } from "./app";
import { sequelize } from "./sequelize";
const PORT: number = Number(process.env.PORT || 3000);

async function main() {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  await sequelize.sync({
    force: true,
    logging: false,
  });
}

main().catch(console.error);
