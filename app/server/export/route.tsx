// Export a mongoDB collection to a json file. 

//http://localhost:3000/server/export?collection_name=dev-collection

import { NextRequest, NextResponse } from 'next/server';
import { exportCollection } from '@/lib/mongo';
import { useSearchParams } from 'next/navigation';

const DATA_API_KEY = process.env.DATA_API_KEY
const BASE_URL = process.env.BASE_URL;

const isProd = process.env.NODE_ENV === 'production';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const COLLECTION_NAME = searchParams.get('collection_name')
    try {
        if (isProd){
            return NextResponse.json({ message: `backup not allowed in prod` });
        }

        if (!COLLECTION_NAME){
            return NextResponse.json({message: "missing collection name"})
        }

        const currentDate = new Date();
        // const about = await getDataFromProd("about");
        // const shows = await getDataFromProd("shows");
        const collection = await exportCollection(COLLECTION_NAME)

        const isEmpty = Object.keys(collection).length === 0;

        if (isEmpty){
            return NextResponse.json({message: "collection not existing or empty"})
        }

        const data = {
            document: "export",
            date: currentDate,
            collection: collection,
        }

        const jsonData = JSON.stringify(data, null, 2);

        const fs = require('fs');

        fs.writeFile(`exported-${COLLECTION_NAME}-local.json`, jsonData, 'utf8', (err: any) => {
            if (err) {
                console.error("An error occurred while writing JSON Object to File.", err);
            } else {
                console.log("local.json file with data from prod database has been saved.");
            }
        });
        return NextResponse.json({ message: `export successfull at ${currentDate}. Find exported-${COLLECTION_NAME}-local.json in root folder`});
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: `${e}` })
    }
}