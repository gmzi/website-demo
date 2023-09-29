const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_PRESET=process.env.CLOUDINARY_UPLOAD_PRESET;


export async function uploadToCloudinary(imageFile, folderName) {

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", `${CLOUDINARY_UPLOAD_PRESET}`)
    formData.append("folder", folderName);

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
      return {message: "error uploading image to cloudinary"};
    }
  }
