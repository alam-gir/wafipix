import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "https://www.wafipix.com",
  allowedHeaders:  "*",
  methods:"*",
  credentials: true,
  optionsSuccessStatus: 200,
};
