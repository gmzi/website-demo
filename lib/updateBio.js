import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateBio(
    document, 
    content_html_1, 
    content_html_2,
    image_1_url, 
    image_2_url, 
    image_3_url, 
    image_4_url,
    image_5_url,
    image_6_url, 
    image_7_url
    ){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const updateDocument = {
            $set: {
                content_html_1: content_html_1,
                content_html_2: content_html_2,
                image_1_url: image_1_url,
                image_2_url: image_2_url,
                image_3_url: image_3_url,
                image_4_url: image_4_url,
                image_5_url: image_5_url,
                image_6_url: image_6_url,
                image_7_url: image_7_url
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