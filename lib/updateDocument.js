import { MongoClient } from "mongodb";
import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateDocument(document, content){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const updateDocument = {
            $set: {
                image_url: content.image_url,
                content_html: content.content_html
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (update){
            return true;
        } else {
            const error = new Error('failed saving document')
            throw error
        }

    } catch(e) {
        console.log(e)
        return
    }
}