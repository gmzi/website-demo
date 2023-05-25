import { MongoClient } from "mongodb";
import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function saveToDB(){
    try {
        const document = {
            content_html: "<p>this should be</p>",
            image_url: "this should be a url"
        }

        const {db} = await connectToDatabase()
        const insertDocument = await db
            .collection(MONGODB_COLLECTION)
            .insertOne(document)

        if (insertDocument){
            console.log('success, revalidation gets called here')
            // ADD REVALIDATION FUNCTION
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