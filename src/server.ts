import { app } from "./app.js";

const PORT = process.env.port || 5000;

import { connectDatabase } from './config/database.js'

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})


