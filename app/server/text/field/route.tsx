// ./server/text/field

import { NextResponse } from "next/server";
import {updateTextField} from '@/lib/updateTextField';
import { revalidatePath } from "next/cache";

const DATA_API_KEY = process.env.DATA_API_KEY
const BASE_URL = process.env.BASE_URL;

export async function PATCH(req:Request, res: Response) {
    return NextResponse.json({ message: "hello, how you doing?" });
    try {
    const key = req.headers.get('API-Key')
    if (key !== DATA_API_KEY){
        return NextResponse.json({message: 'unauthorized'}, {status: 401})
    }

    const data = await req.json()

    const {document, entry, content_html} = data;

    const update = await updateTextField(document, entry, content_html)

    if (!update) {
        console.log(update)
        return NextResponse.json({error: 'text update failed on DB'}, {status: 500})
    }

    return NextResponse.json({message: 'success'}, {status: 200});
    } catch(e) {
        console.log(e)
        return NextResponse.json({message: 'error on api/text'}, {status: 500});
    }
}