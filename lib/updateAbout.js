import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateAbout(document, content_html, image_1_url){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const updateDocument = {
            $set: {
                content_html: content_html,
                image_1_url: image_1_url
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)


        if (!update.modifiedCount){
            console.log(`No documents modified at lib/updateAbout`);
        }

        return {update: update};

    } catch(e) {
        console.log(`${e}`)
        return
    }
}