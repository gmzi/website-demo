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

export default async function Page() {
    const res = await fetch('https://...', { next: { tags: ['collection'] } })
    const data = await res.json()
    // ...
  }

export async function getDataWithTag(document:string){
    try {
        const {db} = await connectToDatabase();

        const query = {"name": document}

        const res = await db
            .collection(MONGODB_COLLECTION)
            .findOne(query)

        const data = {...res, next: { tags: [`${document}`] }}

        return data

    } catch(e) {
        return
    }
}