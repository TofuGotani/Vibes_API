import { app } from "./app";
const PORT: number = Number(process.env.PORT || 3000);

async function main() {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main().catch(console.error);
