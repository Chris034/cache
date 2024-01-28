import express from 'express';
import dotenv from 'dotenv'; 
import { connectToDatabase } from './database';
import chatMessageRouter from './routes/chatMessageRouter';
import swaggerDocs from './swagger/config';

dotenv.config({ path: `${__dirname}/../config.env` })

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/api/chat-message', chatMessageRouter)

if(process.env.NODE_ENV.trim() == 'swagger') {
    swaggerDocs(app, port)
}

connectToDatabase()
.then(() => {    
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
})
.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
