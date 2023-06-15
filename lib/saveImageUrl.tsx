import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function saveImageUrl(document:string, image_url: string){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const updateDocument = {
            $set: {
                image_url: image_url,
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (update){
            return update;
        } else {
            const error = new Error('failed saving document')
            throw error
        }

    } catch(e) {
        console.log(e)
        return
    }
}