import {
    connectToDatabase,
    connectToDatabaseWithName
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

export async function exportCollection(database, collection) {

    const DATABASE_NAME = database;
    const COLLECTION_NAME = collection;

    try {
        const { db, collections } = await connectToDatabaseWithName(DATABASE_NAME);

        if (!db || !collections?.length){
            return {}
        }

        const query = {}

        const res = await db
            .collection(COLLECTION_NAME)
            .find(query)
            .toArray()

        const collection = { ...res }

        return {collection, collections}

    } catch (e) {
        console.log(e)
        return { message: `${e}` }
    }
}

export async function pullItem(document, entry, keyName, valueName) {
    try {
        const { db } = await connectToDatabase()

        const filter = { "name": document }

        const updateDocument = {
            $pull: {
                [entry]: { [keyName]: valueName }
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount) {
            console.log('update failed at lib/mongo/pullItem', update)
            return false
        }

        return true;

    } catch (e) {
        console.log(e)
        return
    }
}

export async function pushToArrayCapped(document, entry, content) {
    // if shows are more than maxShows, one will be popped and the new 
    // one will be pushed.
    try {
        const { db } = await connectToDatabase()

        const filter = { "name": document }

        const allShows = await db
            .collection(MONGODB_COLLECTION)
            .findOne(filter)

        console.log('length:', allShows.content.length)

        const maxShows = 2;
        if (allShows && allShows.content && allShows.content.length >= maxShows) {
            const updateDocument = {
                $pop: { content: -1 }
            };
            const update = await db
                .collection(MONGODB_COLLECTION)
                .updateOne(filter, updateDocument);
        }

        const pushToEntry = {
            $push: {
                [entry]: content,
            }
        }
        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, pushToEntry)

        if (!update.modifiedCount) {
            return false
        }

        return true;

    } catch (e) {
        console.log(e)
        return
    }
}

export async function pushToArray(document, entry, content) {
    try {
        const { db } = await connectToDatabase()

        const filter = { "name": document }

        const updateDocument = {
            $push: {
                [entry]: content,
            }
        }

        const update = await db
            .collection(MONGODB_COLLECTION)
            .updateOne(filter, updateDocument)

        if (!update.modifiedCount) {
            return false
        }

        return true;

    } catch (e) {
        console.log(e)
        return
    }
}

export async function updateAbout(document, content_html, image_1_url) {
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
            console.log(`No documents modified at lib/updateAbout`);
        }

        return { update: update };

    } catch (e) {
        console.log(`${e}`)
        return
    }
}