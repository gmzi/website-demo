import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateInput(document, entry, content){
    try {

        const {db} = await connectToDatabase()

        const filter = {
            "name": document,
        }

        const updateDocument = {
            $set: {
                [entry]: content
            },
        }
    
        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount){
            return false
        }

        return true;

    } catch(e) {
        console.log(e)
        return
    }
}