// /server/about 

import { NextResponse } from 'next/server';
import { updateInput } from '@/lib/updateInput';
import { navItems } from '@/lib/navItems';
import { moveToTrash } from '@/app/cloudinary';

const DATA_API_KEY = process.env.DATA_API_KEY
const BASE_URL = process.env.BASE_URL;

export async function GET(){
    try{ 
        return NextResponse.json({ message: "hello, how you doing?" });

    } catch (e){
        console.log(e)
        return NextResponse.json({message: "error"})
    }
}

export async function POST(req:Request, res: Response) {
    try {
    // AUTHENTICATION:
    // TODO implement getServerSession() as auth method, and get rid of api keys,
    // follow this example: /Users/x4/projects/website-taxonomy/app/api/posts/route.ts
    const key = req.headers.get('API-Key')
    if (key !== DATA_API_KEY){
        return NextResponse.json({message: 'unauthorized'}, {status: 401})
    }

    const data = await req.json()

    const {imageUrl} = data;

    const deleteImage = await moveToTrash(imageUrl)

    if (deleteImage.status === 200){
        return NextResponse.json(deleteImage, {status: 200});
    } else {
        const error = deleteImage.error
        return NextResponse.json({error: error}, {status: 500});
    }
    } catch(e) {
        console.log(e)
        return NextResponse.json({error: JSON.stringify(e)}, {status: 500});
    }
}

export async function PATCH(req:Request, res: Response) {
    try {
    // AUTHENTICATION:
    // TODO implement getServerSession() as auth method, and get rid of api keys,
    // follow this example: /Users/x4/projects/website-taxonomy/app/api/posts/route.ts
    const key = req.headers.get('API-Key')
    if (key !== DATA_API_KEY){
        return NextResponse.json({message: 'unauthorized'}, {status: 401})
    }

    const data = await req.json()

    const {document, entry, content} = data;

    const indexes = Object.entries(navItems).map(([path, {name}]) => name)
    const matchesIndex = indexes.find((index) => index === document);

    if (!matchesIndex){
        return NextResponse.json({error: 'document does not match section'}, {status: 500})
    }

    const update = await updateInput(document, entry, content)

    if (!update) {
        console.log('/server/input: update failed on DB  ')
        console.log(update)
        return NextResponse.json({error: 'update failed on DB'}, {status: 500})
    }

    return NextResponse.json({message: 'success'}, {status: 200});
    } catch(e) {
        console.log(e)
        return NextResponse.json({message: 'error on /server/input'}, {status: 500});
    }
}