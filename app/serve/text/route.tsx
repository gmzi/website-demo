import { NextResponse } from 'next/server';
import { updateText } from '../../../lib/updateText'
import { revalidatePath } from 'next/cache'

const DATA_API_KEY = process.env.DATA_API_KEY

export async function GET(){
    try{ 
        return NextResponse.json({ message: "hello, how you doing?" });

    } catch (e){
        console.log(e)
        return NextResponse.json({message: "error"})
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

    const update = await updateText("about", data)

    if (!update) {
        return NextResponse.json({message: 'text update failed on DB'}, {status: 500})
    }

    const path = '/';
    revalidatePath(path)
    return NextResponse.json({message: 'success'}, {status: 200});
    } catch(e) {
        console.log(e)
        return NextResponse.json({message: 'error on api/text'}, {status: 500});
    }
}