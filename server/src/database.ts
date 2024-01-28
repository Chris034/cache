import { ServerApiVersion } from 'mongodb' 
import mongoose from 'mongoose'

export async function connectToDatabase() {
        const database = await mongoose.connect(process.env.MONGO_URI, {
          tlsCertificateKeyFile: process.env.MONGO_CRED_PATH,
          serverApi: ServerApiVersion.v1
        });
        console.log(`Successfully connected to database: ${database.connection.name}`);
}