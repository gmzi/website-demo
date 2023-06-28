import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function pullFromArrayDB(document, entry, keyName, valueName){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        // console.log('keyname:', keyName)
        // console.log('valuename:', valueName)


        const updateDocument = {$pull: { [entry]: {[keyName]: valueName}}}

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount){
            console.log(update)
            return false
        }

        return true;

    } catch(e) {
        console.log(e)
        return
    }
}