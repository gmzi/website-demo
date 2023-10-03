import { connectToDatabase } from "./mongodb-config";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

export async function deleteItem(document, entry, keyName, item) {
    try {
        const { db } = await connectToDatabase();

        const filter = { 
            "name": document, 
            [itemLocator]: item.id
        }

        const deleteItem = {
            $pull: {
                [entry]: {[keyName]: valueName}
            }
        }

    } catch (e) {
        console.log(e);
        return;
    }
}