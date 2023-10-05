import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateBio(document, content){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const updateDocument = {
            $set: {
                content_html: content.content_html,
                image_1_url: content.image_1_url,
                image_2_url: content.image_2_url,
                image_3_url: content.image_3_url
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
        console.log(`${e}`)
        return
    }
}