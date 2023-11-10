import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function pushToArray(document, entry, content){
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}


        const updateDocument = {
            $push: {
                [entry]: content,
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

export async function pushToArrayCapped(document, entry, content){
    // if shows are more than maxShows, one will be popped and the new 
    // one will be pushed.
    try {
        const {db} = await connectToDatabase()

        const filter = {"name": document}

        const allShows = await db
            .collection(MONGODB_COLLECTION)
            .findOne(filter)
        
        console.log('length:', allShows.content.length)
        
        const maxShows = 2;
        if (allShows && allShows.content && allShows.content.length >= maxShows){
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

        if (!update.modifiedCount){
            return false
        }

        return true;

    } catch(e) {
        console.log(e)
        return
    }
}