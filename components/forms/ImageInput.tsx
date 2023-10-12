'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { FormEvent, useState } from 'react';
import Image from 'next/image';


export function ImageInput() {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];
        setImageFile(selectedFile);

        // create preview of image:
        const makeImageUrl = URL.createObjectURL(selectedFile);
        // @ts-ignore
        setImageUrl(makeImageUrl);
        return;
    }

    return (
        <>
            <label htmlFor="image">Adjuntar imagen:</label>
            <input
                type="file"
                id="image_file"
                name="image_file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {imageUrl && 
            <Image
                    src={imageUrl}
                    alt="preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '5px',
                        marginBottom: '.5em'
                    }}

                />
            }
        </>
    )
}

export function ImageInputWithIndex({idx}: {idx: number}) {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];
        setImageFile(selectedFile);

        // create preview of image:
        const makeImageUrl = URL.createObjectURL(selectedFile);
        // @ts-ignore
        setImageUrl(makeImageUrl);
        return;
    }

    return (
        // <>
        //     <label htmlFor={`image_${idx}_file`}>Adjuntar imagen:</label>
        //     <input
        //         type="file"
        //         id={`image_${idx}_file`}
        //         name={`image_${idx}_file`}
        //         accept="image/*"
        //         onChange={handleImageChange}
        //     />
        //     {imageUrl && 
        //     <Image
        //             src={imageUrl}
        //             alt="preview"
        //             width={0}
        //             height={0}
        //             sizes="100vw"
        //             style={{
        //                 width: '100%',
        //                 height: 'auto',
        //                 borderRadius: '5px',
        //                 marginBottom: '.5em'
        //             }}

        //         />
        //     }
        // </>
        <>
            <label htmlFor={`image_${idx}_file`}>Adjuntar imagen:</label>
            <input
                type="file"
                id={`IDEEEEEE_image_${idx}_file`}
                name={`image_${idx}_file`}
                accept="image/*"
                onChange={handleImageChange}
            />
            {imageUrl && 
            <Image
                    src={imageUrl}
                    alt="preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '5px',
                        marginBottom: '.5em'
                    }}

                />
            }
        </>
    )
}


