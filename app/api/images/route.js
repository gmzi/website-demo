import { v2 as cloudinary} from 'cloudinary'
import { NextResponse } from 'next/server';
import busboy from 'busboy';


const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

// export const config = {
//     api: {
//         bodyParser: false
//     }
// }

export async function POST(req, res){
    try {
        const bb = busboy({headers: req.headers})
        bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const chunks = [];
            file.on('data', (chunk) => {
                chunks.push(chunk);
            });
            file.on('end', async () => {
                const buffer = Buffer.concat(chunks)
                const image = await new Promise( async(resolve, reject) => {
                    cloudinary.uploader.upload_stream({folder: 'website-fer/about'},
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
                }
                // res.status(200).json({metadata})
                return NextResponse.json({metadata}, {status: 200})
            })
        })
        req.pipe(bb)
    } catch (e) {
        console.log('-----------------ERROR BELOW-----------------')
        console.log(e)
        return NextResponse.json({message: "image upload failed"}, {status: 500})
    }
}


// export default async function handler(req, res){
//     try{
//         const bb = busboy({headers: req.headers})
//         bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
//             const chunks = [];
//             file.on('data', (chunk) => {
//                 chunks.push(chunk);
//             });
//             file.on('end', async () => {
//                 const buffer = Buffer.concat(chunks)
//                 const image = await new Promise( async(resolve, reject) => {
//                     cloudinary.uploader.upload_stream({folder: 'website-fer/about'},
//                     (error, result) => {
//                         if (error){
//                             reject(error)
//                         } else {
//                             resolve(result)
//                         }
//                     })
//                     .end(buffer)
//                 });
//                 const metadata =
//                 {
//                     asset_id: image.asset_id,                   
//                     public_id: image.public_id,
//                     width: image.width,
//                     height: image.height,
//                     format: image.format,
//                     created_at: image.created_at, 
//                     tags: image.tags,
//                     bytes: image.bytes,
//                     secure_url: image.secure_url,
//                 }
//                 res.status(200).json({metadata})
//             })
//         })
//         req.pipe(bb)

//     } catch(e){
//         res.status(500).json({error: e.message})
//     }
// }