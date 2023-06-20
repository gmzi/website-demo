// http://localhost:3000/api/image/delete

import { v2 as cloudinary} from 'cloudinary'

const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
    try {

        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' })
        }
        
        const data = await req.body

        if (!data){
            res.status(500).json({error: "failed deleting image"})
        }

        const {imageID} = data;

        // const image = 'blog-reflexion/logos/nloo0aq1hbpl9fhlnpx0';

        const deleted = await cloudinary.uploader.destroy(imageID);

        res.status(200).json({message: deleted})
    } catch(e){
        res.status(500).json({error: e.message})
    }

    // TO DELETE, GRAB public_id FROM IMAGE OBJECT

    
}

