import { app } from "./app";
import { sequelize } from "./sequelize";
const PORT: number = Number(process.env.PORT || 4000);

async function main() {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

}

main().catch(console.error);
