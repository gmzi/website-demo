import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateArrayItem(document, entry, keyName, valueName){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        // const updateDocument = {
        //     $set: {
        //         content_html: content.content_html
        //     }
        // }
        const updateDocument = {$set: { [entry]: {[keyName]: valueName}}}
    

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