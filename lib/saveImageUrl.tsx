import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function saveImageUrl(document:string, entry: string, image_url: string){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}


        const updateDocument = {
            $set: {
                [entry]: image_url,
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