import {connectToDatabase} from './mongodb-config'

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function getAndSortData(document:string, entry:string, value:number){
    try {
        const {db} = await connectToDatabase();

        const query = {"name": document}

        const sort = {opening_date: -1}

        const res = await db
            .collection(MONGODB_COLLECTION)
            .findOne(query)
            .sort(sort)

        const data = {...res}

        return data

    } catch(e) {
        return
    }
}