const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER || '';

export default function uploadToCloudinary(file, folder) {
    return new Promise(async (resolve, reject) => {
        const formData = new FormData();
        const folderName = `${IMAGE_MAIN_FOLDER}/${folder}`;

        formData.append("file", file);
        formData.append("folder", folderName);

        try {
            // Upload image:
            const upload = await fetch(`${BASE_URL}/api/image/upload`, {
                method: 'POST',
                body: formData
            })

            if (!upload.ok) {
                console.log('There is an error in cloudinary upload');
                console.log(upload);
                console.log(await upload.json());
                reject(new Error('Image upload failed'));
            } else {
                const image = await upload.json();
                const imageUrl = image.metadata.secure_url;
                resolve(imageUrl);
            }
        } catch (e) {
            console.error('An error occurred during the upload:', e);
            reject(e);

        }
    })
}