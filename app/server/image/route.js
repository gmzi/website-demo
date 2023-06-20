import { NextRequest, NextResponse } from 'next/server'
import {saveImageUrl} from '../../../lib/saveImageUrl'
import { revalidatePath } from 'next/cache'

const IMAGE_UPLOADER_URL = process.env.IMAGE_UPLOADER_URL;
const BASE_URL = process.env.BASE_URL;
// const isProduction = process.env.NODE_ENV === 'production'
// if (isProduction){
//     IMAGE_UPLOAD_URL = process.env.IMAGE_UPLOAD_URL
// } else {
//     IMAGE_UPLOAD_URL = 'http://localhost:3001/api/upload'
// }


export async function POST(
  req,
  res
) {
    try {
        if (req.method !== 'POST') {
            return NextResponse.json({ error: 'Method Not Allowed' }, {status: 405})
        }

        // Receive formData from client
        // const data = await req.formData();
        // const storageFolder = data.get("folder");
        // const documentName = data.get("documentName");
        // data.append("folder", storageFolder)

        const data = await req.json();

        if (!data){
          return NextResponse.json({error: 'req body is incomplete'}, {status: 500});
        }

        const {imageUrl, documentName} = data;

        const saveImageInDB = await saveImageUrl(documentName, imageUrl)

        if (!saveImageInDB.acknowledged){
          return NextResponse.json({message: "DB failed to save image URL"}, {status: 500})
        }
        // revalidation goes here
        const path = '/';
        revalidatePath(path)

        return NextResponse.json({status: 200})
    } catch (e){
        console.log(e)
        return NextResponse.json({message: 'failed'})
    }
    
}