'use client'

import { useState } from "react";
import { data, text } from '../../lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ImageUpload() {
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")
    const [data, setData] = useState()
    const [status, setStatus] = useState();

    // useEffect(() => {
    // }, [file])

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file)
    }

    const handleCaptionChange = (e) => {
        e.preventDefault()
        const caption = e.target.value;
        setCaption(caption)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!file){
            // setStatus({ alert: "default", message: `${text.uploadForm.fileMissing}`})
            return;
        }

        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB > 3.99){
            // setStatus({alert: "default", message: `${text.uploadForm.fileOversize}`})
            return;
        }

        // setStatus({alert: "messageAlert", message: "uploading..."})

        const formData = new FormData();

        formData.append("file", file);

        const upload = await fetch(`${BASE_URL}/images`, {
            method: 'POST',
            body: formData
        })

        if (!upload.ok){
            console.log('upload failed')
            return;
        }
        const data = await upload.json();
        const imageLink = data.metadata.secure_url
        setStatus(null)
        setData(imageLink)
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
            {data ? <div className={"uploadContainer"}>{data}</div> : (   
            <div className={"uploadContainer"}>
                <h4>{text.uploadForm.addImages}</h4>
                <form className={"uploadForm"} id="myForm" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="image1">Image:</label>
                        <input type="file" id="image1" name="file" onChange={handleFileChange} accept="image/png, image/jpeg"/>
                    </div>
                    <div>
                        <label htmlFor="caption">Caption:</label>
                        <input type="text" name="caption" id="caption" placeholder='(optional)' value={caption} onChange={handleCaptionChange}/>
                    </div>
                    <span className={"submitContainer"}>
                        {file ? (

                            <input className={"submitInput"} type="submit" value="GENERATE LINK"/>
                        ): (
                            <input disabled className={"submitInput-disabled"} type="submit" value="GENERATE LINK"/>
                        )}
                    </span>
                </form> 
            </div>
            )}
        </>
    )
}