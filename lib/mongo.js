import {
    connectToDatabase,
    connectToBackupDatabase
} from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const MONGODB_URI = process.env.MONGODB_URI

export async function updateTest(document, content_html, image_1_url) {
    try {
        const { db } = await connectToDatabase()

        const filter = { "name": document }

        const updateDocument = {
            $set: {
                content_html: content_html,
                image_1_url: image_1_url
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)


        if (!update.modifiedCount) {
            console.log(`No documents modified at lib/updateTest`);
        }

        return { update: update };

    } catch (e) {
        console.log(`${e}`)
        return
    }
}

export async function updateItem(document, entry, itemLocator, item) {
    try {

        const { db } = await connectToDatabase()

        const filter = {
            "name": document,
            [itemLocator]: item.id
        }

        const updateDocument = {
            $set: {
                [`${entry}.$`]: item
            },
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount) {
            console.log('/lib/updateItem: ', update)
            return false
        }

        return true;

    } catch (e) {
        console.log(e)
        return
    }
}

export async function getDataFromProd(document) {
    const MONGODB_PROD_COLLECTION = process.env.MONGODB_PROD_COLLECTION;
    try {
        const { db } = await connectToDatabase();

        const query = { "name": document }

        const res = await db
            .collection(MONGODB_PROD_COLLECTION)
            .findOne(query)

        const data = { ...res }

        return data

    } catch (e) {
        console.log(e)
        return { message: `${e}` }
    }
}