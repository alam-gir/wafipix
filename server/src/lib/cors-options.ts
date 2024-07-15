import { CorsOptions } from "cors";
import { origns } from "./utils";

export const corsOptions: CorsOptions = {
  origin: origns,
  allowedHeaders:  "*",
  methods:"*",
  credentials: true,
  optionsSuccessStatus: 200,
};
