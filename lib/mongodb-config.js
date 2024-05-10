import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

export async function connectToDatabaseWithName(name) {

    try {
        const DB_NAME = name;

        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Connect to cluster
        let client = new MongoClient(MONGODB_URI, opts);
        await client.connect();
        let db = client.db(DB_NAME);

        const collections = await db.listCollections().toArray();

        if (collections.length === 0){
            return `error: wrong db name or empty`
        }

        return {
            client: client,
            db: db,
            collections: collections
        };

    } catch (e) {
        return `error: ${e}`
    }
}