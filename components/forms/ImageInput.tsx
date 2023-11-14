'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import { FormEvent, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Upload } from '../shared/icons';
import { set } from 'zod';
import { moveToTrash } from '@/app/cloudinary';
import e from '@/app/(editor)/editor/editor.module.css'

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

export function ImageInputWithID({ id }: { id: number }) {
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
        <div className="image-upload">
            <label htmlFor={`image_${id}_file`}>Adjuntar imagen:</label>
            <input
                type="file"
                id={`image_${id}_file`}
                name={`image_${id}_file`}
                accept="image/*"
                onChange={handleImageChange}
            />
            {imageUrl ? (
                <Image
                    className='show-image'
                    src={imageUrl}
                    alt="preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            ) : (
                <div className="placeholder-wrapper">
                    <Upload />
                </div>
            )}
        </div>
    )
}

export function ImageInputWithIDAndDefaultValue({ id, defaultValue, className }: { id: number, defaultValue: string, className: string }) {
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
        <div>
            <input type="hidden" name={`image_${id}_url`} value={defaultValue} />

            <label htmlFor={`new_image_${id}_file`}>add / change:</label>
            <input
                type="file"
                id={`new_image_${id}_file`}
                name={`new_image_${id}_file`}
                accept="image/*"
                onChange={handleImageChange}
            />
            {previewImageUrl &&
                <div className="preview">
                    <Image
                        className={className}
                        src={previewImageUrl}
                        alt="preview"
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                </div>
            }
        </div>
    )
}

export function ImageInputWithIndexAndDefaultValueAndDeleteButton({ idx, defaultValue, handleDeleteImage }: { idx: number, defaultValue: string, handleDeleteImage: (url: string, index: number) => void }) {
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

    function handleDelete() {
        setImageFile(null);
        setPreviewImageUrl(null);
        setImageUrl('');
        handleDeleteImage(imageUrl, idx);
    }

    return (
        <>
            <input type="hidden" name={`image_${idx}_url`} id={`image_${idx}_url`} value={imageUrl} />

            <label htmlFor={`new_image_${idx}_file`}>add / change</label>
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

export function ImageGridInput({ id, defaultValue, className }: { id: number, defaultValue: string, className: string }) {
    const [imageFile, setImageFile] = useState<string | number | readonly string[] | undefined>(undefined);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(defaultValue);
    const [toRemove, setToRemove] = useState<string>('');

    function handleImageChange(e: React.FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        const selectedFile = e.target?.files[0];

        if (!selectedFile) {
            setImageFile(undefined)
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

    function removeImage(): void {
        setToRemove(previewImageUrl ?? '');
        setImageFile(undefined);
        setPreviewImageUrl(null);
        URL.revokeObjectURL(previewImageUrl ?? ''); // Revoke the created URL to free up memory
    }

    return (
        <div className={e.gridItem}>
            <input type="hidden" name={`image_${id}_url`} value={defaultValue} />
            <input type="hidden" name={`new_image_${id}_file`} value={imageFile} />
            <input type="hidden" name={`remove_image_${id}_url`} value={toRemove} />

            <h3>{id}</h3>
            <label htmlFor={`new_image_${id}_file`} className={e.changeLabel}>Change</label>
            <input
                type="file"
                id={`new_image_${id}_file`}
                name={`new_image_${id}_file`}
                accept="image/*"
                onChange={handleImageChange}
            />

            {previewImageUrl &&
                <div>
                    <Image
                        className={className}
                        src={previewImageUrl}
                        alt="preview"
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                    <div className="btnContainer">
                        <button type="button" onClick={removeImage} className="btnDelete">Remove</button>
                    </div>
                </div>
            }
        </div>
    )
}
