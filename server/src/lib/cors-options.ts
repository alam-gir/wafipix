import { CorsOptions } from "cors";
import { origins } from "./utils";

export const corsOptions: CorsOptions = {
  origin: origins,
  allowedHeaders:  ["Authorization", "Content-type","*"],
  methods:["*", "POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200,
};
