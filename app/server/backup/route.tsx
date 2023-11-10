// /server/about 

import { NextResponse } from 'next/server';
import { updateBio } from '../../../lib/updateBio'
import { navItems } from '@/lib/navItems';
import { getData } from '@/lib/getData';

const DATA_API_KEY = process.env.DATA_API_KEY
const BASE_URL = process.env.BASE_URL;

export async function GET() {
    try {
        const currentDate = new Date();
        const about = await getData("about");
        const bio = await getData("bio");
        const shows = await getData("shows");
        const courses = await getData("courses");
        const tours = await getData("tours");
        const press = await getData("press");

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
                console.log("JSON file has been saved.");
            }
        });
        return NextResponse.json({ message: `backup successfull at ${currentDate}` });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: `${e}` })
    }
}