import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";
import { createCorsair } from "corsair";
import "dotenv/config";
import { Pool } from "pg";

const database = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
});

export const corsair = createCorsair({
  database,
  multiTenancy: true,
  kek: process.env.CORSAIR_KEK ?? "",
  plugins: [gmail(), googlecalendar()],
});
