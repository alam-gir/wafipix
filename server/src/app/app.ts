import express, { Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "../../src/lib/custom-error-handler";

// import router
import portfolioRoutes from "../routers/portfolio.routes";
import serviceRoutes from "../routers/service.routes";
import packageRoutes from "../routers/package.routes";
import logoRoutes from "../routers/logo.routes";
import topCustomerRoutes from "../routers/top-customer.routes"
import socialInfoRoutes from "../routers/social-info.routes"
import heroFeatureRoutes from "../routers/hero-feature.routes";
import contactInfoRoutes from "../routers/contact-info.routes";
import userRoutes from "../routers/user.routes";
import authRoutes from '../routers/auth.routes'
import emailRoutes from '../routers/email.routes'

import { corsOptions } from "../lib/cors-options";

// run express
const app = express();

//use cors
app.use(cors(corsOptions))

// parse application/json
app.use(express.json());
app.use(express.text());


// hello
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello from server of wafipix v2."})
})

// all routes ---------------
app.use(portfolioRoutes);
app.use(serviceRoutes);
app.use(packageRoutes);
app.use(logoRoutes);
app.use(topCustomerRoutes);
app.use(socialInfoRoutes)
app.use(heroFeatureRoutes)
app.use(contactInfoRoutes)
app.use(userRoutes);
app.use(authRoutes)
app.use(emailRoutes)

// use centralized error handling
app.use(errorHandler);

// end line to export app
export { app };
