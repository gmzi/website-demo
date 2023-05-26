import {connectToDatabase} from './mongodb-config'

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function getData(document:string){
    try {
        const {db} = await connectToDatabase();

        const query = {"name": document}

        const res = await db
            .collection(MONGODB_COLLECTION)
            .findOne(query)

        const data = {...res}

        return data

    } catch(e) {
        return
    }
}