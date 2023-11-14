import { v2 as cloudinary } from 'cloudinary'

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

const IMAGE_MAIN_FOLDER = process.env.IMAGE_MAIN_FOLDER;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});


export async function uploadToCloudinary(imageFile, folderName) {

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", `${CLOUDINARY_UPLOAD_PRESET}`)
  formData.append("folder", `${IMAGE_MAIN_FOLDER}/${folderName}`);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const imageMetadata = await response.json();
    return imageMetadata;

  } catch (error) {
    console.error('Error uploading image:', error);
    return { message: "error uploading image to cloudinary" };
  }
}

// export async function moveToTrash(imageUrl){
//   return {message: "todo"}
// }

export async function moveToTrash(imageUrl) {
  try {
    function extractPublicID(url) {
      const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }

    // const imageID = imageUrl.match(`${IMAGE_MAIN_FOLDER}.+`)[0]
    // const imagePublicID = imageID.replace(/\..+$/, '');

    const imagePublicID = extractPublicID(imageUrl);

    const trashDestination = `${IMAGE_MAIN_FOLDER}/trash/${imagePublicID.replace(`${IMAGE_MAIN_FOLDER}/`, "")}`;
    // example from : 'website-demo/about/i4ey8istvgaphyohjupc'
    // example to : 'website-demo/trash/about/i4ey8istvgaphyohjupc'

    const moved = cloudinary.uploader.rename(imagePublicID, trashDestination)

    return { message: 'image moved to trash', recoveryUrl: moved?.secure_url };
  } catch (e) {
    console.error(e)
    return {message: 'failed deleting image', error: JSON.stringify(e) }
  }
}