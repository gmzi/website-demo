import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

// export async function updateItem(document, entry, itemID, content){
export async function updateItem(document, entry, itemLocator, item){
    try {

        const {db} = await connectToDatabase()

        const filter = {
            "name": document,
            [itemLocator]: item.id
        }

        const updateDocument = {
            $set: {
                // "written_press.$": item
                [entry]: item
            },
        }
    
        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount){
            console.log(await update.json())
            return false
        }

        console.log(update)
        return true;

    } catch(e) {
        console.log(e)
        return
    }
}