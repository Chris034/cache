import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb' 

export const collections: { chatMessages?: Collection } = {}

export async function connectToDatabase() {
        const client = new MongoClient(process.env.MONGO_URI, {
          tlsCertificateKeyFile: process.env.MONGO_CRED_PATH,
          serverApi: ServerApiVersion.v1
        }); 
        
        await client.connect();
        const database: Db = client.db(process.env.MONGO_DB_NAME);
        const chatMessage:  Collection = database.collection(process.env.MONGO_DB_COLLECTION_CHAT_MESSAGE);
        collections.chatMessages = chatMessage;
        console.log(`Successfully connected to database: ${database.databaseName} and collection: ${chatMessage.collectionName}`);
}