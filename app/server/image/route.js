import { NextRequest, NextResponse } from 'next/server'
import {updateImageUrl} from '../../../lib/updateImageUrl'
import { revalidatePath } from 'next/cache'
import {revalidatePersonalPage} from '@/lib/revalidatePersonalPage'
import {revalidateEditorPage} from '@/lib/revalidateEditorPage'

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

        const {documentName, entryName, imageUrl} = data;

        const saveImageInDB = await updateImageUrl(documentName, entryName, imageUrl)

        if (!saveImageInDB){
          console.log('image failed to save')
          return NextResponse.json({message: "DB failed to save image URL"}, {status: 500})
        }

        return NextResponse.json({status: 200})
    } catch (e){
        console.log(e)
        return NextResponse.json({message: 'failed'})
    }
    
}