// This route exists because I wasn't able to use cloudinary's Node skd in /app directory, 
// so I made it the old way here. I abstracted the image upload process into a function, but 
// if there's any need to debug or something isn't working as expected, we can always 
// go back to this repo to use it as an uploader: https://image-uploader-cloudinary.vercel.app/api/upload

import { v2 as cloudinary} from 'cloudinary'
import busboy from 'busboy';
import { saveImageUrl } from '../../lib/saveImageUrl';

const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET;

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;
const BASE_URL = process.env.BASE_URL

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export const config = {
    api: {
        bodyParser: false,
    }
}

async function uploadToCloudinary(req){
    return await new Promise(async(resolve, reject) => {
        const bb = busboy({headers: req.headers})
        bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const chunks = [];
            let storageFolder = '';
            let documentName = '';

            bb.on('field', (fieldname, value) => {
                if (fieldname === 'folder'){
                    storageFolder = value;
                }
                if (fieldname === 'documentName'){
                    documentName = value;
                }
            });
            file.on('data', (chunk) => {
                chunks.push(chunk);
            });
            file.on('end', async () => {
                const buffer = Buffer.concat(chunks)
                const image = await new Promise( async(resolve, reject) => {
                    cloudinary.uploader.upload_stream({folder: storageFolder},
                    (error, result) => {
                        if (error){
                            reject(error)
                        } else {
                            resolve(result)
                        }
                    })
                    .end(buffer)
                });
                const metadata =
                {
                    asset_id: image.asset_id,                   
                    public_id: image.public_id,
                    width: image.width,
                    height: image.height,
                    format: image.format,
                    created_at: image.created_at, 
                    tags: image.tags,
                    bytes: image.bytes,
                    secure_url: image.secure_url,
                    documentName: documentName
                }
                resolve(metadata)
            })
        })
        req.pipe(bb)
    })
}

export default async function handler(req, res){
    try{

        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' })
        }

        const metadata = await uploadToCloudinary(req)

        if (!Object.keys(metadata).length) {
           res.status(500).json({message: "failed to upload image"})
        } 

        const imageUrl = metadata.secure_url;
        const documentName = metadata.documentName;

        const saveImageUrlInDB = await saveImageUrl(documentName, imageUrl)

        if (!saveImageUrlInDB.acknowledged){
            res.status(500).json({message: "DB failed to save image URL"})
        }

        console.log('revalidate token:', REVALIDATE_TOKEN)
        console.log('fetch url:', `${BASE_URL}/api/revalidate-home?secret=${REVALIDATE_TOKEN}`)

        // REVALIDATION GOES HERE
        const revalidateHome = await fetch(`${BASE_URL}/api/revalidate-home?secret=${REVALIDATE_TOKEN}`)

        
        console.log(revalidateHome)

        res.status(200)

    } catch(e){
        console.log(e)
        res.status(500).json({error: e.message})
    }
}

