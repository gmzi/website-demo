import { NextRequest, NextResponse } from 'next/server'
import {saveImageUrl} from '../../../lib/saveImageUrl'
import { revalidatePath } from 'next/cache'

let IMAGE_UPLOAD_URL = process.env.IMAGE_UPLOAD_URL;
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
        const data = await req.formData();
        const storageFolder = data.get("folder");
        const documentName = data.get("documentName");
        // Append folder field, might seem redundant but it's needed for uploader:
        data.append("folder", storageFolder)

        const upload = await fetch(`${BASE_URL}/api/upload-image`, {
          method: 'POST',
          body: data
        })

        if (upload.status !== 200){
          return NextResponse.json({ error: 'upload failed' }, {status: upload.status})
        }

        const uploadedImage = await upload.json()

        const image_url = uploadedImage.metadata.secure_url

        const saveImageInDB = await saveImageUrl(documentName, image_url)

        if (!saveImageInDB.acknowledged){
          return NextResponse.json({message: "DB failed to save image URL"}, {status: 500})
        }

        // revalidation goes here
        const path = '/';
        revalidatePath(path)

        return NextResponse.json({ image_url: image_url }, {status: 200})
    } catch (e){
        console.log(e)
        return NextResponse.json({message: 'failed'})
    }
    
}