import log from "node:console";
import { app, bootstrapApp } from "./app.js";

const PORT = process.env.port || 5000;

import { connectDatabase } from './config/database.js'

connectDatabase().then(() => {
    app.listen(PORT, () => {
        log.info(`Server running on http://localhost:${PORT}`)
    });

    bootstrapApp();
})


