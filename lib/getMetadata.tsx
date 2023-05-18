import {MongoClient, ServerApiVersion} from 'mongodb'
import {connectToDatabase} from './mongodb-config'
import { RemoteMetadata } from '@/types';

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function getMetadata(){
    try {
        const {db} = await connectToDatabase();

        const query = {"metadata": true}

        const res = await db
            .collection(MONGODB_COLLECTION)
            .findOne(query)

        const data: RemoteMetadata = {...res}

        return data

    } catch(e) {
        return
    }
}