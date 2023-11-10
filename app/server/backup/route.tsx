//http://localhost:3000/server/backup

import { NextResponse } from 'next/server';
import { getDataFromProd } from '@/lib/mongo';

const DATA_API_KEY = process.env.DATA_API_KEY
const BASE_URL = process.env.BASE_URL;

const isProd = process.env.NODE_ENV === 'production';


export async function GET() {
    try {
        if (isProd){
            return NextResponse.json({ message: `backup not allowed in prod` });
        }
        const currentDate = new Date();
        const about = await getDataFromProd("about");
        const bio = await getDataFromProd("bio");
        const shows = await getDataFromProd("shows");
        const courses = await getDataFromProd("courses");
        const tours = await getDataFromProd("tours");
        const press = await getDataFromProd("press");

        const data = {
            document: "backup",
            date: currentDate,
            about: about,
            bio: bio,
            shows: shows,
            courses: courses,
            tours: tours,
            press: press
        }

        const jsonData = JSON.stringify(data, null, 2); // 'null' and '2' for pretty printing

        // Using Node.js's fs module to write the file
        const fs = require('fs');

        fs.writeFile('backup.json', jsonData, 'utf8', (err: any) => {
            if (err) {
                console.error("An error occurred while writing JSON Object to File.", err);
            } else {
                console.log("a JSON file with data from prod database has been saved.");
            }
        });
        return NextResponse.json({ message: `backup successfull at ${currentDate}. Find backup file in local root folder`});
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: `${e}` })
    }
}