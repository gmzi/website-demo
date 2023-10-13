// http://localhost:3000/api/image/delete

import { v2 as cloudinary} from 'cloudinary'



const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET;

const IMAGE_MAIN_FOLDER=process.env.IMAGE_MAIN_FOLDER;

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

        const {imageUrl} = data;

        const imageID = imageUrl.match(`${IMAGE_MAIN_FOLDER}.+`)[0]


        const imagePublicID = imageID.replace(/\..+$/, '');

        const trashDestination = `${IMAGE_MAIN_FOLDER}/trash/${imagePublicID.replace(`${IMAGE_MAIN_FOLDER}/`, "")}`;
        // example from : 'website-fer/about/i4ey8istvgaphyohjupc';
        // example to : 'website-fer/trash/about/i4ey8istvgaphyohjupc'

        const moveToTrash = await cloudinary.uploader.rename(imagePublicID, trashDestination)

        console.log('/server/image/delete moveToTrash:')
        console.log(moveToTrash)

        if (!moveToTrash.asset_id){
            res.status(404).json({message: "failed to trash image"})
        }
        res.status(200).json({message: 'image moved to trash'})
    } catch(e){
        console.log(e)
        res.status(500).json({error: e.message})
    }    
}

