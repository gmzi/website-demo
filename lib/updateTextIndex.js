import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function updateTextIndex(document, entry, index, content){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}


        const updateDocument = {
            $set: {
                [entry[index]]: content,
            }
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