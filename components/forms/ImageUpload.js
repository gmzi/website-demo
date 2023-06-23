'use client'

import { useState } from "react";
import { data, text } from '../../lib/data';
import Image from "next/image";
import { revalidateEditorPage } from "@/lib/revalidateEditorPage";
import { revalidatePersonalPage } from "@/lib/revalidatePersonalPage";
import { EmptyImageIcon } from "../shared/icons";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_MAIN_FOLDER = process.env.NEXT_PUBLIC_IMAGE_MAIN_FOLDER;

// ADD TWO STRING PROPS: DOCUMENT AND FOLDER
export default function ImageUpload({imageUrl, document, folder, entry, section}) {

    const [file, setFile] = useState()
    const [data, setData] = useState(imageUrl)
    const [status, setStatus] = useState();

    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        setFile(file)

        if (!file){
            // setStatus({ alert: "default", message: `${text.uploadForm.fileMissing}`})
            console.log('file missing')
            return;
        }

        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB > 3.99){
            // setStatus({alert: "default", message: `${text.uploadForm.fileOversize}`})
            console.log('file oversized, max file size 4mb')
            return;
        }

        setStatus("loading...")

        const formData = new FormData();

        const folderName = `${IMAGE_MAIN_FOLDER}/${folder}`

        formData.append("file", file);
        formData.append("folder", folderName)

        // UPLOAD IMAGE:
        const upload = await fetch(`${BASE_URL}/api/image/upload`, {
            method: 'POST',
            body: formData
        })

        if (!upload.ok){
            console.log('theres an error in upload')
            console.log(upload)
            console.log(upload.json())
            return;
        }
        const image = await upload.json();

        const imageUrl = image.metadata.secure_url;
        setData(imageUrl)
        setStatus(null)
        setFile(null)
    }

    const handleSaveImageUrl = async (e) => {
        e. preventDefault();

        if (!data){
            console.log('no image file attached')
            return
        }

        const dataToSave = {
            imageUrl: data,
            documentName: document,
            entryName: entry
        }

        // SAVE IMAGE URL TO DATABASE:
        const saveData = await fetch(`${BASE_URL}/server/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })

        if (!saveData.ok){
            console.log('image is uploaded, but failed to save on DB')
            console.log(saveData)
            return;
        }

        // REVALIDATE PAGE:
        const editorRevalidation = await revalidateEditorPage(BASE_URL);
        const personalRevalidation = await revalidatePersonalPage(section, BASE_URL);

        console.log('Image uploader revalidated editor:', editorRevalidation)
        console.log('Image uploader revalidated personal:', personalRevalidation)
        console.log('image is saved to DB')

        setStatus(null)
        setFile(null)

    }

    const handleDeleteImage = async(e) => {
        e.preventDefault();

        const dataToDelete = {
            imageUrl: data
        }

        // DELETE IMAGE FROM CLOUDINARY:
        const deleteImage = await fetch(`${BASE_URL}/api/image/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToDelete)
        })

        if (!deleteImage.ok){
            console.log('deletion failed')
            return;
        }

        // UPDATE IMAGE_URL to empty value on DB:
        const dataToUpdate = {
            imageUrl: '',
            documentName: document,
            entryName: entry
        }

        const updateDB = await fetch(`${BASE_URL}/server/image`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(dataToUpdate)
        })

        if(!updateDB){
            console.log('failed tu update DB')
            console.log(updateDB)
            return;
        }

        console.log('image url updated on DB')

        // revalidation goes here:
        const editorRevalidation = await revalidateEditorPage(BASE_URL);
        const personalRevalidation = await revalidatePersonalPage(section, BASE_URL);

        console.log('Image uploader revalidated editor:', editorRevalidation)
        console.log('Image uploader revalidated personal:', personalRevalidation)

        console.log('editor revalidated')
        console.log('personal revalidated')

        setData(null)
        setFile(null)
    }

    const handleOK = () => {
        setStatus(null)
    }

    if (status){
        return (
            // <Alert 
            // data={status} 
            // cancelAction={handleOK} 
            // downloadFile={undefined} 
            // deletePost={undefined} 
            // resetCounter={undefined} 
            // url={undefined} 
            // discardChanges={undefined} />
            <p>{status}</p>
        )
    }

    return (
        <>
            {status ? <p>{status}</p> : null}

            <div className={"uploadContainer"}>
                {data ? (
                    <Image
                        src={data}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{width: '20%', height: 'auto'}}
                        alt="uploaded image"
                    />
                ): <span><EmptyImageIcon/></span>}
                <div>
                    <form className="uploadForm" id="myForm" method="POST" encType="multipart/form-data">
                        <label htmlFor="image1" style={{display: 'none'}}>choose image file:</label>
                        <input type="file" id="image1" name="file" onChange={handleFileChange} accept="image/png, image/jpeg"/>
                        <button onClick={handleSaveImageUrl}>save to server</button>
                        <button onClick={handleDeleteImage}>delete</button>
                    </form>
                </div>
            </div>  
        </>
    )
}