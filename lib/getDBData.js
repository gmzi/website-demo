import {MongoClient, ServerApiVersion} from 'mongodb'
import {connectToDatabase} from './mongodb-config'

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})


export async function getDBData(){
    try {
        const {db} = await connectToDatabase();

        const query = {"metadata": true}

        const res = await db
            .collection(MONGODB_COLLECTION)
            .findOne(query)

        return res

    } catch(e) {
        return
    }
}