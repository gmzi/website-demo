'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { FormEvent, useState } from 'react';
import Image from 'next/image';


export function ImageEdit({ imageUrl }: { imageUrl: string }) {
    const [imageFile, setImageFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(imageUrl)

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];
        setImageFile(selectedFile);

        // create preview of image:
        const makeImageUrl = URL.createObjectURL(selectedFile);
        // @ts-ignore
        setPreviewImageUrl(makeImageUrl);
        // @ts-ignore
        setImageFile(makeImageUrl);
        return;
    }

    return (
        <>
            <input type="hidden" name="image_url" value={imageUrl} />

            <label htmlFor="new_image_file">Cambiar imagen:</label>
            <input
                type="file"
                id="new_image_file"
                name="new_image_file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {previewImageUrl &&
                <Image
                    src={previewImageUrl}
                    alt="preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority={false}
                    placeholder='empty'
                    style={{
                        width: '30%',
                        height: 'auto',
                        borderRadius: '5px',
                        marginBottom: '.5em'
                    }}

                />
            }
        </>
    )
}


export function ImagesEdit({ imageUrls, className }: { imageUrls: string[], className: string }) {
    const [previewImageUrls, setPreviewImageUrls] = useState(imageUrls);

    function handleImageChange(e: React.FormEvent<HTMLInputElement>, index: number): void {
        const selectedFile = e.currentTarget.files?.[0];
        const newPreviewImageUrls = [...previewImageUrls];

        if (selectedFile) {
            const makeImageUrl = URL.createObjectURL(selectedFile);
            newPreviewImageUrls[index] = makeImageUrl;
        } else {
            newPreviewImageUrls[index] = '';
        }

        setPreviewImageUrls(newPreviewImageUrls);
    }

    return (
        <div>
            {imageUrls.map((imageUrl, index) => (
                <div key={index}>
                    <input type="hidden" name={`image_url_${index}`} value={imageUrl} />

                    <label htmlFor={`new_image_file_${index}`}>Cambiar imagen {index + 1}:</label>
                    <input
                        type="file"
                        id={`new_image_file_${index}`}
                        name={`new_image_file_${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                    />
                    {previewImageUrls[index] && (
                        <div className="preview">
                            <Image
                                className={className}
                                src={previewImageUrls[index]}
                                alt={`preview_${index}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                // style={{
                                //     width: '20%',
                                //     height: 'auto',
                                //     borderRadius: '5px',
                                //     marginBottom: '.5em'
                                // }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )

}



