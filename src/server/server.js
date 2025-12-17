import express from "express";
import cors from "cors";
import "dotenv/config";

import searchRoutes from "./routes/search.routes.js";
import internalRoutes from "./routes/internal.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes);
app.use("/internal", internalRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
