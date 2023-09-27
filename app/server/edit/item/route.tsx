// /server/edit/item

import { NextResponse } from "next/server";
import {updateTextIndex} from '@/lib/updateTextIndex';
import { updateTextField } from "@/lib/updateTextField";
import { pushToArrayDB } from "@/lib/pushToArrayDB";
import { revalidatePath } from "next/cache";
import { updateArrayItem } from "@/lib/updateArrayItem";
import {updateItem} from "@/lib/updateItem"

const DATA_API_KEY = process.env.DATA_API_KEY
const BASE_URL = process.env.BASE_URL;

export async function PATCH(req:Request, res: Response) {
    try {
    const key = req.headers.get('API-Key')
    if (key !== DATA_API_KEY){
        return NextResponse.json({message: 'unauthorized'}, {status: 401})
    }

    const data = await req.json()

    const {document, entry, itemLocator, newContent} = data;

    const update = await updateItem(document, entry, itemLocator, newContent);

    if (!update) {
        console.log(update)
        return NextResponse.json({error: 'item update failed on DB'}, {status: 500})
    }

    return NextResponse.json({message: 'item updated!!!'}, {status: 200});
    } catch(e) {
        console.log(e)
        return NextResponse.json({message: 'error on /server/edit/item'}, {status: 500});
    }
}