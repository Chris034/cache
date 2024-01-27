import express from 'express';
import dotenv from 'dotenv'; 
import { connectToDatabase } from './database';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config({ path: `${__dirname}/../config.env` })

connectToDatabase()
.then(() => {
    app.get('/', (req, res) => {
       res.send('Hello World!');
    });
    
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
})
.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
