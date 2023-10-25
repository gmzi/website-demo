import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateBio(document, content){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const updateDocument = {
            $set: {
                content_html_1: content.content_html_1,
                content_html_2: content.content_html_2,
                image_1_url: content.image_1_url,
                image_2_url: content.image_2_url,
                image_3_url: content.image_3_url,
                image_4_url: content.image_4_url,
                image_5_url: content.image_5_url,
                image_6_url: content.image_6_url,
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount){
            console.log("No document modified at mongodb from updateBio")
            return false
        }

        return true;

    } catch(e) {
        console.log(`${e}`)
        return
    }
}