'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { set } from 'zod';
import { moveToTrash } from '@/app/cloudinary';

const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY

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

export function ImageInputWithIndex({ idx }: { idx: number }) {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];

        if (!selectedFile) {
            setImageUrl(null)
            setImageFile(null)
            return;
        }

        setImageFile(selectedFile);
        // create preview of image:
        const makeImageUrl = URL.createObjectURL(selectedFile);
        // @ts-ignore
        setImageUrl(makeImageUrl);
        return;
    }

    return (
        <>
            <label htmlFor={`image_${idx}_file`}>Adjuntar imagen:</label>
            <input
                type="file"
                id={`image_${idx}_file`}
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

export function ImageInputWithIndexAndDefaultValue({ idx, defaultValue }: { idx: number, defaultValue: string }) {
    const [imageFile, setImageFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(defaultValue);

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];

        if (!selectedFile) {
            setImageFile(null)
            return;
        }

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
            <input type="hidden" name={`image_${idx}_url`} value={defaultValue} />

            <label htmlFor={`new_image_${idx}_file`}>Cambiar/agregar imagen:</label>
            <input
                type="file"
                id={`new_image_${idx}_file`}
                name={`new_image_${idx}_file`}
                accept="image/*"
                onChange={handleImageChange}
            />
            {previewImageUrl &&
                <div>
                    <Image
                        src={previewImageUrl}
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
                </div>
            }
        </>
    )
}

export function ImageInputWithIndexAndDefaultValueAndDeleteButton({ idx, defaultValue, handleDeleteImage }: { idx: number, defaultValue: string, handleDeleteImage: (url: string, index: number) => void  }) {
    const [imageFile, setImageFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(defaultValue);
    const [imageUrl, setImageUrl] = useState(defaultValue)

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];

        if (!selectedFile) {
            setImageFile(null)
            setPreviewImageUrl(null);
            setImageUrl('');
            return;
        }

        setImageFile(selectedFile);

        // create preview of image:
        const makeImageUrl = URL.createObjectURL(selectedFile);
        // @ts-ignore
        setPreviewImageUrl(makeImageUrl);
        // @ts-ignore
        setImageFile(makeImageUrl);
        setImageUrl(makeImageUrl);
        return;
    }

    function handleDelete(){
        setImageFile(null);
        setPreviewImageUrl(null);
        setImageUrl('');
        handleDeleteImage(imageUrl, idx);
    }

    return (
        <>
            <input type="hidden" name={`image_${idx}_url`} id={`image_${idx}_url`} value={imageUrl} />

            <label htmlFor={`new_image_${idx}_file`}>Cambiar/agregar imagen:</label>
            <input
                type="file"
                id={`new_image_${idx}_file`}
                name={`new_image_${idx}_file`}
                accept="image/*"
                onChange={handleImageChange}
            />
            {previewImageUrl &&
                <div>
                    <Image
                        src={previewImageUrl}
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
                    <button onClick={handleDelete}>Eliminar Imagen</button>
                </div>
            }
        </>
    )
}

